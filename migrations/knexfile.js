require("dotenv").config({ path: "../.env" })

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            connectionString: process.env.POSTGRES_HOST_CONNECTION_STRING
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    onUpdateTrigger: (table) => `
        CREATE TRIGGER ${table}_updated_at
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE PROCEDURE on_update_timestamp();
    `,

    versionTrigger: (table) => `
        CREATE TRIGGER ${table}_versioning_trigger
        BEFORE UPDATE OR DELETE ON public.${table}
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        'valid_from', 'valid_to', 'history.${table}', true, true);
    `,

    dropVersionTrigger: (table) => `
        DROP TRIGGER IF EXISTS ${table}_versioning_trigger ON public.${table}
    `,

    versionInsertTrigger: (table) => `
        CREATE TRIGGER ${table}_versioning_insert_trigger
        AFTER INSERT ON public.${table}
        FOR EACH ROW EXECUTE PROCEDURE versioning_insert(
        'valid_from', 'valid_to', 'history.${table}');
    `,

    dropVersionInsertTrigger: (table) => `
        DROP TRIGGER IF EXISTS ${table}_versioning_insert_trigger ON public.${table}
    `

    //   staging: {
    //     client: 'postgresql',
    //     connection: {
    //       database: 'my_db',
    //       user:     'username',
    //       password: 'password'
    //     },
    //     pool: {
    //       min: 2,
    //       max: 10
    //     },
    //     migrations: {
    //       tableName: 'knex_migrations'
    //     }
    //   },

    //   production: {
    //     client: 'postgresql',
    //     connection: {
    //       database: 'my_db',
    //       user:     'username',
    //       password: 'password'
    //     },
    //     pool: {
    //       min: 2,
    //       max: 10
    //     },
    //     migrations: {
    //       tableName: 'knex_migrations'
    //     }
    //   }
}
