
// import { client } from "../utils/db";
// import { logger } from "../utils/logger";
// import expressSession from "express-session";
// import formidable from "formidable";
// import fs from "fs";

// import fetch from "node-fetch";
import express from "express";
// import { Server as SocketIO } from 'socket.io';
import { Knex } from "knex";
import { UserService } from "../service/userService";
import UserController from "../controller/userController";

export let userRoutes = express.Router();


export class UserRoutes {
  static readonly UPLOAD_DIR = "photos";
  public static InitializeUserRoutes(knex: Knex) {
      let service = new UserService(knex)
      let controller = new UserController(service)
      userRoutes.post("/user", controller.register);
      userRoutes.post("/login", controller.login);
      userRoutes.get("/me", controller.getMe);
      userRoutes.get("/logout", controller.logout);
      userRoutes.get("/login/google", controller.googleLogin);
      
  }
}



// declare module "express-session" {
//     interface SessionData {
//       user?: any;
//       name?: string;
//       userid? : number;
      // shoppingCart: Array<{
      //   img:string
      //   category: string 
      //   sub_category: string
      //   name: string
      //   price:number
  //     // }>
  //   }
  // }
  
  // async function register(req: Request, res: Response) {
  //   console.log('123');
    
  //   // logger.info(JSON.stringify(req.body, null, 4));
  //   let { username, password, mobileNo, email, address ,age,gender } = req.body;
  //   console.log('body',req.body);
    
  //   if (!username || !password || !mobileNo || !email ||!address ||!age||!gender) {
  //     console.log('789')
  //     res.status(400).json({
        
    
  //       error: "Invalid input",
  //     });
  //     console.log('456')
  //     return;
  //   }
  //   console.log(username, password, mobileNo, email, address ,age,gender );
  //   // await client.query(
  //   //   /*SQL*/ `
  //   //       INSERT INTO users (name,password,email, create_at, update_at) 
  //   //       values ($1,$2,$3, current_timestamp, current_timestamp)
  //   //     `,
  //   //   [username, password, email]
  //   // );
  
  //   // res.json({
  //   //   message: `${username} is create! `,
  //   // });
  //   // console.log('789')
  // }
  
  // async function login(req: Request, res: Response) {
  //   let { username, password } = req.body;
  //   if (!username || !password) {
  //     res.json({
  //       error: "Invalid input",
  //     });
  //     return;
  //   }
  
  //   let dbUser = (
  //     await client.query(
  //       /*SQL*/ `
  //     select * from users where name = $1
  //     `,
  //       [username]
  //     )
  //   ).rows[0];
  
  //   if (!dbUser) {
  //     res.status(400).json({
  //       error: "Invalid user",
  //     });
  //     return;
  //   }
  //   if (!dbUser) {
  //     res.status(400).json({
  //       error: "Invalid user",
  //     });
  //     return;
  //   }
  //   if (username == dbUser.username) {
  //     res.status(400).json({
  //       error: "Invalid user",
  //     });
  //     return;
  //   }
  
  //   if (dbUser.password !== password) {
  //     res.status(400).json({
  //       error: "Invalid password",
  //     });
  //     return;
  //   }
  //   delete dbUser.password;
  //   req.session['user'] = dbUser
     
  //   res.json({
  //     message: `login success `,
  //   });
  // }
  
  // function getMe(req: Request, res: Response) {
  //   if (!req.session || !req.session.user || !req.session.user.name) {
  //     res.json({
  //       message: "Not yet login",
  //     });
  //     return;
  //   }
  //   res.json({
  //     data: req.session.user.name,
  //   });
  // }
  // interface GoogleUser {
  //   email: string;
  
  //   image: string;
  // }
  
  // async function loginGoogle(req: Request, res: Response) {
  //   const accessToken = req.session?.["grant"].response.access_token;
  //   const fetchRes = await fetch(
  //     "https://www.googleapis.com/oauth2/v2/userinfo",
  //     {
  //       method: "get",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  
  //   const googleUser = (await fetchRes.json()) as any as GoogleUser;
  //   const users = (
  //     await client.query(`SELECT * FROM users WHERE name = $1`, [
  //       googleUser.email,
  //     ])
  //   ).rows;
  //   const dbUser = users[0];
  //   if (!dbUser) {
  //     (
  //       await client.query(
  //         /*SQL*/ `
  //         INSERT INTO users (name,password,email,create_at,update_at) 
  //         values ($1,$2,$3,current_timestamp,current_timestamp) RETURNING *`,
  //         [googleUser.email, "password", googleUser.email]
  //       )
  //     ).rows[0];
  //   }
  
  //   if (req.session) {
  //     delete dbUser.password;
  //     req.session['user'] = dbUser
      
  //   }
  //   res.redirect("/index.html");
  // }
  
  // async function editCourse(req: Request, res: Response) {
  //     console.log("editCourse")
  //   const uploadDir = "uploads";
  //   fs.mkdirSync(uploadDir, { recursive: true });
  
  //   const form = formidable({
  //     uploadDir,
  //     keepExtensions: true,
  //     maxFiles: 1,
  //     maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  //     filter: (part) => part.mimetype?.startsWith("image/") || false,
  //   });
  
  //   form.parse(req, (err, fields, files) => {
  //     console.log({ err, fields, files });
  //     // res.redirect("/");
  //     console.log('edit ' ,fields)
  //     res.status(200).json("successful")
  //   });
  // }
  
      
      
  
          
          
  
    
        
    
  
    
  
    
  
  
      
  
  // async function createCourse(req: Request, res: Response) {
  //     console.log("createCourse")
  //   const uploadDir = "uploads";
  //   fs.mkdirSync(uploadDir, { recursive: true });
  
  //   const form = formidable({
  //     uploadDir,
  //     keepExtensions: true,
  //     maxFiles: 1,
  //     maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  //     filter: (part) => part.mimetype?.startsWith("image/") || false,
  //   });
  
  //   form.parse(req, async (err, fields, files) => {
  //     try {
  //       console.log({
  //           err,
  //           fields,
  //           files,
  //       });
  
  //       let { courseName,level,duration,price,subCategory } = fields;
  //       console.log(fields)
  //       if (!courseName || !price || !Number(price)) {
  //           res.status(400).json({
  //               message: "Invalid input",
  //           });
  //           return;
  //       }
  
  //       // let manType = (
  //       //     await client.query(/*SQL*/ `
  //       //     select * from product_types where name = 'man'
  //       // `)
  //       // ).rows[0];
  
  //       if (!files || !files.image) {
  //           await client.query(
  //               /*SQL*/ `
  //               INSERT INTO course (category,name,level,duration,price, sub_category_id) 
  //               values ('string',$1,$2,$3,$4,$5)
  //             `,
  //               [courseName,level,duration,price,subCategory]
  //           );
  //       } else {
  //           let image: formidable.File = files.image as formidable.File;
  //           await client.query(
  //               /*SQL*/ `
  //               INSERT INTO course (category,name,level,duration,price,image,sub_category_id) 
  //               values ('string',$1,$2,$3, $4,$5,$6)
  //             `,
  //               [courseName,level,duration,price, "uploads/"+image.newFilename,subCategory]
  //           );
  //       }
        
  
        
  //       res.json({
  //           message: "Create success!",
  //       });
  //   } catch (error: any) {
  //       logger.error(error.message);
  //       res.json({
  //           error: "Create fail! " + error.message,
  //       });
  //   }
      
  //   });
  
  // }
  
  // app.post('/contact', (req, res) => {
  //     form.parse(req, (err, fields, files) => {
  //       console.log({ err, fields, files })
  //       res.redirect('/')
  //       console.log(fields)
  //       console.log(files)
  //     })
  //   })
  
  // function getParticipant(){
  //   res.json({
  //     data:req.session.dbUser.id
  //   })
  // }
  // async function logout(req: Request, res: Response) {
  //   req.session.destroy(() => {
  //     logger.info("logout successfully");
  //   });
  //   res.json({
  //     message: "session is destory",
  //   });
  // }
  // controller.userRoutes.post("/user", register);
  // // userRoutes.post("/login", login);
  // userRoutes.get("/logout", logout);
  // // userRoutes.get("/me", getMe);
  // userRoutes.get("/login/google", loginGoogle);
  // userRoutes.post("/adminCreate", createCourse);
  // userRoutes.patch("/adminEdit", editCourse);
  // userRoutes.delete("/adminDelete", deleteCourse);
  // userRoutes.post("/participant",getParticipant)
  
