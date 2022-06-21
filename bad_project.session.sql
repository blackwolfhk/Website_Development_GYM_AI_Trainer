-- Export from drawSQL --
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "mobile_no" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "last_login" DATE NOT NULL,
    "icon" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "users"
ADD PRIMARY KEY("id");
ALTER TABLE "users"
ADD CONSTRAINT "users_role_id_unique" UNIQUE("role_id");
CREATE TABLE "programs"(
    "id" INTEGER NOT NULL,
    "name_of_exercise" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "level_id" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "descriptions" INTEGER NOT NULL,
    "video" VARCHAR(255) NOT NULL,
    "song" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "programs"
ADD PRIMARY KEY("id");
ALTER TABLE "programs"
ADD CONSTRAINT "programs_type_id_unique" UNIQUE("type_id");
ALTER TABLE "programs"
ADD CONSTRAINT "programs_level_id_unique" UNIQUE("level_id");
CREATE TABLE "chat-room"(
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL
);
ALTER TABLE "chat-room"
ADD PRIMARY KEY("id");
CREATE TABLE "type_of_exercises"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE "type_of_exercises"
ADD PRIMARY KEY("id");
CREATE TABLE "levels"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE "levels"
ADD PRIMARY KEY("id");
CREATE TABLE "classes"(
    "id" INTEGER NOT NULL,
    "name_of_exercise" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "descriptions" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "classes"
ADD PRIMARY KEY("id");
ALTER TABLE "classes"
ADD CONSTRAINT "classes_trainer_id_unique" UNIQUE("trainer_id");
CREATE TABLE "class_records"(
    "id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "class_records"
ADD PRIMARY KEY("id");
ALTER TABLE "class_records"
ADD CONSTRAINT "class_records_class_id_unique" UNIQUE("class_id");
ALTER TABLE "class_records"
ADD CONSTRAINT "class_records_user_id_unique" UNIQUE("user_id");
CREATE TABLE "roles"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE "roles"
ADD PRIMARY KEY("id");
ALTER TABLE "programs"
ADD CONSTRAINT "programs_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "type_of_exercises"("id");
ALTER TABLE "programs"
ADD CONSTRAINT "programs_level_id_foreign" FOREIGN KEY("level_id") REFERENCES "levels"("id");
ALTER TABLE "class_records"
ADD CONSTRAINT "class_records_class_id_foreign" FOREIGN KEY("class_id") REFERENCES "classes"("id");
ALTER TABLE "class_records"
ADD CONSTRAINT "class_records_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");