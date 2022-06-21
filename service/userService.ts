import { Knex } from "knex";
// import { hashPassword } from "../utils/hash";
import fetch from "cross-fetch";

export class UserService {
  constructor(private knex: Knex) {}
  async getUserByUsername(username: string) {
    console.log("username", username);

    let userResult = await this.knex("users").where({ username });
    console.log("userResult", userResult);

    let dbUser = userResult[0];
    return dbUser;
  }
  public async getRoleID(role: string) {
    let role_id = await this.knex("roles")
      .select("*")
      .where("name", role)
      .returning("id");
    console.log("id", role_id);

    return role_id[0].id;
  }
  public async register(
    username: string,
    hashedPassword: string | undefined,
    mobileNo: string | null,
    email: string,
    address: string | null,
    role_id: number
  ) {
    const result = await this.knex("users")
      .insert({
        username,
        password: hashedPassword || null,
        mobile_no: mobileNo,
        email,
        address,
        role_id,
      })
      .returning("*");
    return result;
  }
  public async getUserById(currentUserId: number) {
    let userResult = await this.knex("users").where("id", currentUserId);
    return userResult;
  }
  public async getGoogleLoginInfo(accessToken: string) {
    const fetchRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = await fetchRes.json();
    console.log("google result = ", result);
    return result;
  }
  // async addUser(username: string, password: string | undefined = undefined ||) {
  //   let randomHashPassword = null;
  //   if (!password) {
  //     randomHashPassword = null;
  //   } else {
  //     randomHashPassword = await hashPassword(password);
  //   }
  //   let role_id = await this.getRoleID("user");
  //   let newUser = await this.knex("users")
  //     .insert({ username: username, password: randomHashPassword, role_id,email: })
  //     .returning("*");
  //   return newUser;
  // }
}
