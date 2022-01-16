const { onUpdateTrigger } = require("../knexfile")

exports.up = async (knex) => {
    await knex.schema.createTable("authors", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
        table.string("name")
        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("authors"))

    await knex.schema.createTable("books", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
        table.string("title")
        table.string("isbn")
        table.dateTime("published_at", { precision: 6 })

        table
            .uuid("author_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.authors")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("books"))

    await knex.schema.createTable("libraries", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
        table.string("name")
        table.string("address")
        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("libraries"))

    await knex.schema.createTable("library_books", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
        table.integer("quantity").defaultTo(0).notNullable()

        table
            .uuid("library_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.libraries")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table
            .uuid("book_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.books")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("library_books"))

    await knex.schema.createTable("members", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
        table.string("name")
        table.string("address")
        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("members"))

    await knex.schema.createTable("library_members", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()

        table
            .uuid("library_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.libraries")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table
            .uuid("member_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.members")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("library_members"))

    await knex.schema.createTable("loans", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()

        table
            .uuid("library_book_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.library_books")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table
            .uuid("member_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("public.members")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.unique(["library_book_id", "member_id"])
        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("loans"))
}

exports.down = async (knex) => {
    await knex.schema.dropTable("loans")
    await knex.schema.dropTable("library_members")
    await knex.schema.dropTable("members")
    await knex.schema.dropTable("library_books")
    await knex.schema.dropTable("libraries")
    await knex.schema.dropTable("books")
    await knex.schema.dropTable("authors")
}
