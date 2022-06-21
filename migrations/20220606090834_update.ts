import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("status"))) {
        await knex.schema.createTable("status", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }

    if (await knex.schema.hasTable("exercises")) {
        await knex.schema.alterTable("exercises", (table) => {
            table.integer("status_id");
            table.foreign("status_id").references("status.id");
        });
    }
    if (await knex.schema.hasTable("classes")) {
        await knex.schema.alterTable("classes", (table) => {
            table.integer("status_id");
            table.foreign("status_id").references("status.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("exercises")) {
        await knex.schema.alterTable("exercises", (table) => {
            table.dropColumn("status_id");
        });
    }
    if (await knex.schema.hasTable("classes")) {
        await knex.schema.alterTable("classes", (table) => {
            table.dropColumn("status_id");
        });
    }

    await knex.schema.dropTableIfExists("status")
}

