const { versionTrigger, dropVersionTrigger, versionInsertTrigger, dropVersionInsertTrigger } = require("../knexfile")

exports.up = async (knex) => {
    await knex.raw("CREATE TABLE history.authors (LIKE public.authors);")
    await knex.schema.alterTable("history.authors", function (table) {
        table.timestamp("valid_from")
        table.timestamp("valid_to")
    })
    await knex.raw(versionTrigger("authors"))
    await knex.raw(versionInsertTrigger("authors"))

    await knex.raw("CREATE TABLE history.books (LIKE public.books);")
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
}
