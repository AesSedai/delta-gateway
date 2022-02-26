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

    execute (SELECT concat(format('alter table %s.%s drop constraint ', new_schema, new_table), constraint_name) AS my_query
            FROM information_schema.table_constraints
            WHERE table_schema = new_schema
                AND table_name = new_table
                AND constraint_type = 'PRIMARY KEY');
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
