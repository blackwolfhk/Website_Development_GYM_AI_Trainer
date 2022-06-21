import { UserService } from "../service/userService";
import { Request, Response } from "express";
import { hashPassword, checkPassword } from "../utils/hash";
import express from "express";
// import fetch from "node-fetch";
export default class UserController {
  constructor(private userService: UserService) { }

  register = async (req: Request, res: Response) => {
    let { username, password, mobileNo, email, address } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await this.userService.getUserByUsername(username);
    const role = "user";
    const role_id = Number(await this.userService.getRoleID(role));
    console.log("role", role_id);
    if (!user) {
      await this.userService.register(
        username,
        hashedPassword,
        mobileNo,
        email,
        address,
        role_id
      );
      res.json({
        message: `${username} is create! `,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    console.log("456");

    if (!username) {
      res.status(400).json({ error: "missing username" });
      return;
    }
    if (!password) {
      res.status(400).json({ error: "missing password" });
      return;
    }
    console.log({ username, password });
    let dbUser = await this.userService.getUserByUsername(username);
    if (!dbUser) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    let isMatched = await checkPassword(password, dbUser.password);
    console.log(isMatched);
    if (!isMatched) {
      res.status(403).json({ error: "wrong password" });
      return;
    }
    delete dbUser.password;

    req.session["user"] = dbUser;
    res.json({
      message: "login successfully",
    });
  };

  getMe = async (req: express.Request, res: express.Response) => {
    // console.log("session id", req.session.id);
    if (!req.session["user"]) {
      // console.log("NO LOGIN");
      res.status(400).json({
        message: "Login Not Yet",
      });
      return;
    }

    let id = req.session["user"].id;

    let currentUserId = Number(id);
    let currentUserData = await this.userService.getUserById(currentUserId);
    res.json(currentUserData);
  };

  logout = (req: express.Request, res: express.Response) => {
    let username = req.session["username"];
    console.log(`${username} want to logout`);
    req.session.destroy((error) => {
      if (error) {
        console.error("failed to destroy session:", error);
      }

      res.redirect(`/index.html?user=${username}`);
    });
  };
  googleLogin = async (req: express.Request, res: express.Response) => {
    try {
      const accessToken = req.session?.["grant"].response.access_token;

      const googleLoginInfo = await this.userService.getGoogleLoginInfo(
        accessToken
      );
      console.log(" googleLoginInfo = ", googleLoginInfo);

      let user = await this.userService.getUserByUsername(
        googleLoginInfo.email
      );
      console.log("hi");

      if (!user) {
        const role = "user";
        const role_id = Number(await this.userService.getRoleID(role));
        user = await this.userService.register(
          googleLoginInfo.email,
          undefined,
          null,
          googleLoginInfo.email,
          null,
          role_id
        );
      }
      if (req.session) {
        req.session["user"] = user;
      }
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Google login fail",
      });
    }
  };
}
