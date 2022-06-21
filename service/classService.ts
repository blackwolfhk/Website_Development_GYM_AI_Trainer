import { Knex } from "knex";

export class ClassService {
    constructor(private knex: Knex) { }

    public async getClasses() {
        let classResultFromDB = await this.knex("classes").orderBy("updated_at", "desc")
        return classResultFromDB
    }

    public async getClassById(clsId: number) {
        // select * from classes 
        // join users on classes.trainer_id = users.id 
        // where classes.id = 43
        let result = await this.knex("classes")
            .join("users", "classes.trainer_id", "users.id")
            .where("classes.id", clsId)
        return result
    }

    public async addClass(name: string, image: string, trainerId: number, description: string, price: number) {
        let result = await this.knex("classes").insert({
            name,
            image,
            trainer_id: trainerId,
            description,
            price
        }).returning('*')
        return result;
    }

    public async inactiveClass() {
        let result = await this.knex("classes")
        // add sth here...
        return result;
    }

    public async editClass() {
        let result = await this.knex("classes")
        // add sth here...
        return result;
    }
}