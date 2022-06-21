import express from "express";
// import { Server as SocketIO } from 'socket.io';
import { Knex } from "knex";
import { ExerciseService } from "../service/exerciseService";
import { ExerciseController } from "../controller/exerciseController";

export let exerciseRoutes = express.Router();

export class ExerciseRoutes {
    static readonly UPLOAD_DIR = "videos";
    public static InitializeExerciseRoutes(knex: Knex) {
        let service = new ExerciseService(knex)
        let controller = new ExerciseController(service)
        exerciseRoutes.get("/exercises", controller.getExercises);
        exerciseRoutes.get("/exercise/:id", controller.getExerciseById);
        exerciseRoutes.post("/exercise", controller.addExercise);
        exerciseRoutes.patch("/exercise", controller.inactiveExercise);
        exerciseRoutes.patch("/exercise/edit", controller.editExercise);

        // Open AI camara
        // exerciseRoutes.get("/openAICamara", controller.openAICamara);
    }
}
