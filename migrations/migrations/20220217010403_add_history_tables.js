const { versionTrigger, dropVersionTrigger, versionInsertTrigger, dropVersionInsertTrigger } = require("../knexfile")

const CREATE_TABLE_LIKE_UP = /* SQL */ `
create or replace function create_table_like(source_schema text, source_table text, new_schema text, new_table text)
returns void language plpgsql
as $$
declare
    rec record;
begin
    execute format(
        -- don't include constraints, because that include primary key uniqueness
        'CREATE TABLE %s.%s (like %s.%s INCLUDING DEFAULTS INCLUDING INDEXES)',
        new_schema, new_table, source_schema, source_table);
    for rec in
        select oid, conname
        from pg_constraint
        where contype = 'f' 
        and conrelid = source_table::regclass
    loop
        execute format(
            'ALTER TABLE %s.%s ADD CONSTRAINT %s %s',
            new_schema,
            new_table,
            replace(rec.conname, source_table, new_table),
            pg_get_constraintdef(rec.oid));
    end loop;
end $$;
`

const CREATE_TABLE_LIKE_DOWN = /* SQL */ `DROP FUNCTION create_table_like;`

exports.up = async (knex) => {
    await knex.raw(CREATE_TABLE_LIKE_UP)
    await knex.raw("select create_table_like('public', 'authors', 'history', 'authors');")
    await knex.schema.alterTable("history.authors", function (table) {
        table.timestamp("valid_from")
        table.timestamp("valid_to")
    })
    await knex.raw(versionTrigger("authors"))
    await knex.raw(versionInsertTrigger("authors"))

    await knex.raw("select create_table_like('public', 'books', 'history', 'books');")
    await knex.schema.alterTable("history.books", function (table) {
        table.timestamp("valid_from")
        table.timestamp("valid_to")
    })
    await knex.raw(versionTrigger("books"))
    await knex.raw(versionInsertTrigger("books"))
}

exports.down = async (knex) => {
    await knex.schema.withSchema("history").dropTable("books")
    await knex.schema.withSchema("history").dropTable("authors")

    await knex.raw(dropVersionTrigger("books"))
    await knex.raw(dropVersionInsertTrigger("books"))
    await knex.raw(dropVersionTrigger("authors"))
    await knex.raw(dropVersionInsertTrigger("authors"))

    await knex.raw(CREATE_TABLE_LIKE_DOWN)
}
