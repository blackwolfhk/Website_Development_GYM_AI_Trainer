import { Request, Response } from "express";
// import formidable from "formidable";
// import { mkdirSync } from "fs";
import { ClassService } from "../service/classService";
// import { Server as SocketIO } from 'socket.io';

export class ClassController {
    private classService: ClassService;
    // private io: SocketIO;

    constructor(classService: ClassService) {
        this.classService = classService;
        // this.io = io
    }

    getClasses = async (req: Request, res: Response) => {
        let classes = await this.classService.getClasses();
        res.json(classes);
    }

    getClassById = async (req: Request, res: Response) => {
        let clsId = parseInt(req.params.id)
        let cls = await this.classService.getClassById(clsId);
        res.json(cls);
    }

    addClass = async (req: Request, res: Response) => {
        let { name, image, trainerId, description, price } = req.body
        if (!Number(price)) {
            res.status(400).json({ error: "Invalid price" })
            return
        }
        if (!name || !image || !trainerId || !description) {
            res.status(400).json({ error: "Invalid info" })
            return
        }
        await this.classService.addClass(name, image, trainerId, description, Number(price));
        res.json({
            message: "New class created successfully"
        });
    }

    inactiveClass = async (req: Request, res: Response) => {
        let cls = await this.classService.inactiveClass();
        res.json(cls);
    }

    editClass = async (req: Request, res: Response) => {
        let cls = await this.classService.editClass();
        res.json(cls);
    }
}