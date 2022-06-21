import express from "express";
import path from "path";
import { ClassRoutes } from "./routes/classRoutes";
import { classRoutes } from "./routes/classRoutes";
import { ExerciseRoutes } from "./routes/exerciseRoutes";
import { exerciseRoutes } from "./routes/exerciseRoutes";
import { userRoutes } from "./routes/userRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { connectDB } from "./utils/db";
import env from "./utils/env";
import { expressSessionMiddleware } from "./utils/middleware";
import grant from "grant";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
import Knex from 'knex';
import expressSession from "express-session";

// import { isloggedin } from "./utils/guard";
// import {Server as SocketIO} from 'socket.io';
// import { setSocketIO } from "./utils/socketIO";



let app = express();


app.use(expressSessionMiddleware);

app.use(
    expressSession({
        secret: 'Tecky Academy teaches typescript',
        resave: true,
        saveUninitialized: true,
    }),
)

declare module "express-session" {
    interface SessionData {
        user?: any;
        name?: string;
        username? :string;
    }
}



dotenv.config();

const knexConfig = require('./knexfile');
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);



// server handling request from json data
app.use(express.json());

// class setting
app.use(classRoutes);
ClassRoutes.InitializeClassRoutes(knex);

// exercise setting
app.use(exerciseRoutes);
ExerciseRoutes.InitializeExerciseRoutes(knex);

// signup setting
app.use(userRoutes);
UserRoutes.InitializeUserRoutes(knex);
const grantExpress = grant.express({
    defaults: {
        origin: `http://localhost:${env.SERVER_PORT}`,
        transport: "session",
        state: true,
    },
      google: {
        key: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
        scope: ["profile", "email"],
        callback: "/login/google",
      },
});

app.use(grantExpress as express.RequestHandler);

app.use(express.static("public"));
app.use(express.static("public/html"));

// app.use(isloggedin, express.static("protected"));

// app.get("/", (req, res) => {
//     res.json({ message: "connect ok" });
// });

app.use((req, res) => {
    res.sendFile(path.resolve(path.join("public", "html", "404.html")));
});

app.listen(env.SERVER_PORT, () => {
    logger.info(`listening on http://localhost:${env.SERVER_PORT}`);
    connectDB();
});
