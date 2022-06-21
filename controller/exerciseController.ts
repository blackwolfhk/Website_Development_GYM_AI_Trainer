import { Request, Response } from "express";
import { ExerciseService } from "../service/exerciseService";
// import formidable from "formidable";
// import { mkdirSync } from "fs";
// import { Server as SocketIO } from 'socket.io';

export class ExerciseController {
    private exerciseService: ExerciseService;
    // private io: SocketIO;

    constructor(exerciseService: ExerciseService) {
        this.exerciseService = exerciseService;
        // this.io = io
    }

    getExercises = async (req: Request, res: Response) => {
        let exercises = await this.exerciseService.getExercises();
        res.json(exercises);
    }

    getExerciseById = async (req: Request, res: Response) => {
        let exerciseId = parseInt(req.params.id)
        let exercise = await this.exerciseService.getExerciseById(exerciseId);
        res.json(exercise);
    }

    addExercise = async (req: Request, res: Response) => {
        let { name, typeId, levelId, image, description, video, song, statusId } = req.body;
        if (!name || !typeId || !levelId || !image || !description || !video || !song || !statusId) {
            res.status(400).json({ error: "Invalid info" })
            return
        }
        await this.exerciseService.addExercise(name, typeId, levelId, image, description, video, song, statusId)
        res.json({
            message: "Create exercise successfully"
        });
    }

    inactiveExercise = async (req: Request, res: Response) => {
        let exercise = await this.exerciseService.inactiveExercise();
        res.json(exercise);
    }

    editExercise = async (req: Request, res: Response) => {
        let exercise = await this.exerciseService.editExercise();
        res.json(exercise);
    }


}