const VERSIONING_FN_UP = /* SQL */ `
CREATE OR REPLACE FUNCTION versioning()
RETURNS TRIGGER AS $$
DECLARE
  valid_from text;
  valid_to text;
  history_table text;
  mitigate_update_conflicts bool;
  ignore_unchanged_values bool;
  commonColumns text[];
  time_stamp_to_use timestamptz := current_timestamp;
  transaction_info txid_snapshot;
  existing_lower timestamptz;
  existing_upper timestamptz;
BEGIN
    valid_from := TG_ARGV[0];
    valid_to := TG_ARGV[1];
    history_table := TG_ARGV[2];
    mitigate_update_conflicts := TG_ARGV[3];
    ignore_unchanged_values := TG_ARGV[4];

    IF ignore_unchanged_values AND TG_OP = 'UPDATE' AND NEW IS NOT DISTINCT FROM OLD THEN
        RETURN OLD;
    END IF;

    -- Ignore rows already modified in this transaction
    transaction_info := txid_current_snapshot();
    IF OLD.xmin::text >= (txid_snapshot_xmin(transaction_info) % (2^32)::bigint)::text
    AND OLD.xmin::text <= (txid_snapshot_xmax(transaction_info) % (2^32)::bigint)::text THEN
        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        END IF;

        RETURN NEW;
    END IF;

    EXECUTE format('SELECT %1$I, %2$I FROM %3$s WHERE id=$1.id AND %2$I IS NULL', valid_from, valid_to, history_table) USING OLD INTO existing_lower, existing_upper;
    EXECUTE format('UPDATE %2$s SET %1$I=$2 WHERE id=$1.id AND %1$I IS NULL', valid_to, history_table) USING OLD, current_timestamp;

    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    END IF;

    IF mitigate_update_conflicts = 'true' THEN
        -- mitigate update conflicts
        IF existing_lower >= time_stamp_to_use THEN
            time_stamp_to_use := existing_lower + interval '1 microseconds';
        END IF;
    END IF;

    WITH 
    history AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = history_table::regclass
        AND    attnum > 0
        AND    NOT attisdropped),
    main AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = TG_RELID
        AND    attnum > 0
        AND    NOT attisdropped)
    SELECT array_agg(quote_ident(history.attname)) INTO commonColumns
        FROM history
        INNER JOIN main
        ON history.attname = main.attname
        AND history.attname != valid_from
        AND history.attname != valid_to;

    EXECUTE ('INSERT INTO ' ||
        history_table ||
        '(' ||
        array_to_string(commonColumns , ',') ||
        ',' ||
        quote_ident(valid_from) ||
        ',' ||
        quote_ident(valid_to) ||
        ') VALUES ($1.' ||
        array_to_string(commonColumns, ',$1.') ||
        ',$2,null)')
    USING NEW, time_stamp_to_use;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`

const VERSIONING_INSERT_UP = /* SQL */ `
CREATE OR REPLACE FUNCTION versioning_insert()
RETURNS TRIGGER AS $$
DECLARE
  valid_from text;
  valid_to text;
  history_table text;
  commonColumns text[];
BEGIN
    valid_from := TG_ARGV[0];
    valid_to := TG_ARGV[1];
    history_table := TG_ARGV[2];

    WITH 
    history AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = history_table::regclass
        AND    attnum > 0
        AND    NOT attisdropped),
    main AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = TG_RELID
        AND    attnum > 0
        AND    NOT attisdropped)
    SELECT array_agg(quote_ident(history.attname)) INTO commonColumns
        FROM history
        INNER JOIN main
        ON history.attname = main.attname
        AND history.attname != valid_from
        AND history.attname != valid_to;

    EXECUTE ('INSERT INTO ' ||
        history_table ||
        '(' ||
        array_to_string(commonColumns , ',') ||
        ',' ||
        quote_ident(valid_from) ||
        ',' ||
        quote_ident(valid_to) ||
        ') VALUES ($1.' ||
        array_to_string(commonColumns, ',$1.') ||
        ',$2,null)')
    USING NEW, current_timestamp;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
`

const VERSIONING_FN_DOWN = /* SQL */ `DROP FUNCTION versioning;`

const VERSIONING_INSERT_DOWN = /* SQL */ `DROP FUNCTION versioning_insert;`

exports.up = async (knex) => {
    await knex.raw(VERSIONING_FN_UP)
    await knex.raw(VERSIONING_INSERT_UP)
}

exports.down = async (knex) => {
    await knex.raw(VERSIONING_FN_DOWN)
    await knex.raw(VERSIONING_INSERT_DOWN)
}
