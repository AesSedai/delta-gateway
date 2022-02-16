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

    await knex.schema.createTable("cache", function (table) {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()

        table.text("query").notNullable().defaultTo("")
        table.jsonb("result").notNullable().defaultTo({})
        table.jsonb("patch").notNullable().defaultTo({})

        table.dateTime("lastUpdated")

        table.unique(["query", "lastUpdated"])

        table.timestamps(true, true)
    })
    await knex.raw(onUpdateTrigger("cache"))

    await knex.schema.createTable("events", (table) => {
        table.string("label").notNullable()
        table.integer("connection_id").notNullable()
        table.integer("operation_id").notNullable()
        table.integer("event_number").notNullable()
        table.jsonb("event_data").notNullable()
        table.timestamp("event_time", { useTz: true }).notNullable()
        table.boolean("is_error").notNullable()
        table.integer("latency")
        table.unique(["label", "connection_id", "operation_id", "event_number"])
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable("books")
    await knex.schema.dropTable("authors")
    await knex.schema.dropTable("cache")
    await knex.schema.dropTable("events")
}
