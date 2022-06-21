import { Knex } from "knex";


export class ExerciseService {
    constructor(private knex: Knex) { }

    public async getExercises() {
        let result = await this.knex("exercises").orderBy("updated_at", "desc")
        return result;
    }

    public async getExerciseById(exerciseId: number) {
        console.log("exercises ID", exerciseId)
        let result = await this.knex.raw(`
        select exercises.name, type_of_exercises.name as typeName, levels.name as levelName, description, video from exercises
        join type_of_exercises on exercises.type_id = type_of_exercises.id 
        join levels on exercises.level_id  = levels.id 
        where exercises.id = ?
        `, [exerciseId])
        return result.rows;
    }

    public async addExercise(name: string, typeId: number, levelId: number, image: string, description: string, video: string, song: string, statusId: number) {
        let result = await this.knex("exercises").insert({
            name,
            type_id: typeId,
            level_id: levelId,
            image,
            description,
            video,
            song,
            status_id: statusId
        }).returning('*')
        return result;
    }

    public async inactiveExercise() {
        let result = await this.knex("exercises")
        // add sth here...
        return result;
    }

    public async editExercise() {
        let result = await this.knex("exercises")
        // add sth here...
        return result;
    }

}