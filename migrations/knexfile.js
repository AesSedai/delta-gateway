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