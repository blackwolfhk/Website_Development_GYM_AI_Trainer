import express from "express";
// import { Server as SocketIO } from 'socket.io';
import { Knex } from "knex";
import { ClassService } from "../service/classService";
import { ClassController } from "../controller/classController";

export let classRoutes = express.Router();

export class ClassRoutes {
    static readonly UPLOAD_DIR = "photos";
    public static InitializeClassRoutes(knex: Knex) {
        let service = new ClassService(knex)
        let controller = new ClassController(service)
        classRoutes.get("/classes", controller.getClasses);
        classRoutes.get("/class/:id", controller.getClassById);
        classRoutes.post("/class", controller.addClass);
        classRoutes.patch("/class", controller.inactiveClass);
        classRoutes.patch("/class/edit", controller.editClass);
    }
}