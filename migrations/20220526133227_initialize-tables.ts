import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // 有次序之分; 
    // 先整左個無foreign key 既table，然後再整有foreign key 既table，因為後者依賴前者

    

    if (!(await knex.schema.hasTable("type_of_exercises"))) {
        await knex.schema.createTable("type_of_exercises", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }

    if (!(await knex.schema.hasTable("levels"))) {
        await knex.schema.createTable("levels", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }


    if (!(await knex.schema.hasTable("roles"))) {
        await knex.schema.createTable("roles", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }

    if (!(await knex.schema.hasTable("users"))) {
        await knex.schema.createTable("users", (table) => {
            table.increments();
            table.string("username");
            table.string("password");
            table.string("mobile_no");
            table.string("email");
            table.text("address");
            table.string("icon");
            table.integer("role_id").unsigned().notNullable();
            table.foreign("role_id").references("roles.id");
            table.timestamps(false, true);
        })
    }


    if (!(await knex.schema.hasTable("exercises"))) {
        await knex.schema.createTable("exercises", (table) => {
            table.increments();
            table.text("name");
            table.string("image");
            table.text("description");
            table.string("video");
            table.string("song");
            table.integer("type_id").unsigned().notNullable();
            table.foreign("type_id").references("type_of_exercises.id");
            table.integer("level_id").unsigned().notNullable();
            table.foreign("level_id").references("levels.id");
            table.timestamps(false, true);
        })
    }


    if (!(await knex.schema.hasTable("classes"))) {
        await knex.schema.createTable("classes", (table) => {
            table.increments();
            table.text("name");
            table.string("image");
            table.integer("trainer_id").unsigned().notNullable;
            table.foreign("trainer_id").references("users.id")
            table.text("description");
            table.integer("price");
            table.timestamps(false, true);
        });
    }

    if (!(await knex.schema.hasTable("chat_room"))) {
        await knex.schema.createTable("chat_room", (table) => {
            table.increments();
            table.text("content");
            table.text("admin_reply");
            table.integer("user_id").unsigned().notNullable;
            table.foreign("user_id").references("users.id");
            table.integer("class_id").unsigned().notNullable;
            table.foreign("class_id").references("classes.id");
            table.timestamps(false, true);
        });
    }

    if (!(await knex.schema.hasTable("user_records"))) {
        await knex.schema.createTable("user_records", (table) => {
            table.increments();
            table.integer("counts");
            // FOREIGN KEY is created automatically if we are using the function references
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("users.id");
            table.integer("exercise_id").unsigned().notNullable();
            table.foreign("exercise_id").references("exercises.id");
            table.timestamps(false, true);
        });
    }

    if (!(await knex.schema.hasTable("class_records"))) {
        await knex.schema.createTable("class_records", (table) => {
            table.increments();
            // FOREIGN KEY is created automatically if we are using the function references
            table.integer("class_id").unsigned().notNullable();
            table.foreign("class_id").references("classes.id");
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("users.id");
            table.timestamps(false, true);
        });
    }

}

export async function down(knex: Knex): Promise<void> {
    // 有次序之分;
    await knex.schema.dropTableIfExists("class_records")
    await knex.schema.dropTableIfExists("user_records")
    await knex.schema.dropTableIfExists("chat_room")
    await knex.schema.dropTableIfExists("classes")
    await knex.schema.dropTableIfExists("exercises")
    await knex.schema.dropTableIfExists("users")
    await knex.schema.dropTableIfExists("roles")
    await knex.schema.dropTableIfExists("levels")
    await knex.schema.dropTableIfExists("type_of_exercises")
}


// Notes:

// Running Migration:
// yarn knex migrate:latest

// Rolling Back migration:
// yarn knex migrate:rollback

// Run only one migration instead of all of the new migrations in a batch:
// yarn knex migrate:up

// Rollback only one migration instead of all of the migration in the previous batch:
// yarn knex migrate:down