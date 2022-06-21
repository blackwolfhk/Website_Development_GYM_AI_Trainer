import { Knex } from "knex";
import XLSX from "xlsx"
import { hashPassword } from "../utils/hash";

interface Type_of_exercise {
    name: string;
}

interface Level {
    name: string;
}

interface DBLevel {
    id: number
    name: string;
}
interface Role {
    name: string;
}

interface User {
    username: string;
    password: string;
    mobile_no: string;
    email: string;
    address: string;
    icon: string;
    role_id: number;
}

interface Exercise {
    name: string;
    image: string;
    description: string;
    video: string;
    song: string;
    status_id: number;
    type_id: number;
    level_id: number;
}

interface Class {
    name: string;
    image: string;
    trainer_id: number;
    description: string;
    price: number;
    status_id: number;
}

interface Chat_room {
    content: string;
    admin_reply: string;
    user_id: number;
    class_id: number;
}

interface User_record {
    counts: number;
    user_id: number;
    exercise_id: number;
}

interface Class_record {
    class_id: number;
    user_id: number;
}

interface Status {
    name: string;
}
interface DBStatus {
    id: number
    name: string;
}

class ExerciseDB {
    public static TypeMap = new Map();
    public static LevelMap = new Map();
    public static StatusMap = new Map();
    public name: string;
    public image: string;
    public description: string;
    public video: string;
    public song: string;
    public type_id: number;
    public level_id: number;
    public status_id: number;

    constructor(exercise: Exercise) {
        this.name = exercise.name;
        this.image = exercise.image;
        this.description = exercise.description;
        this.video = exercise.video;
        this.song = exercise.song;

        console.log('exercise.level_id = ', exercise.level_id)
        console.log(' mapped result =', ExerciseDB.LevelMap[exercise.level_id])
        this.type_id = ExerciseDB.TypeMap[exercise.type_id] ? ExerciseDB.TypeMap[exercise.type_id] : -1;
        this.level_id = ExerciseDB.LevelMap[exercise.level_id] ? ExerciseDB.LevelMap[exercise.level_id] : -1;
        this.status_id = ExerciseDB.StatusMap[exercise.status_id] ? ExerciseDB.StatusMap[exercise.status_id] : -1;
    }
    public static async InitializeMaps(txn: Knex.Transaction, exercise: Exercise[], types: Type_of_exercise[], levels: DBLevel[], status: DBStatus[]) {
        for (let type of types) {
            let results = await txn("type_of_exercises").where({ name: type.name });
            if (results) {
                ExerciseDB.TypeMap[type.name] = results[0].id;
            } else {
                throw new Error("Type not found")
            }
        }
        for (let level of levels) {
            ExerciseDB.LevelMap[level.name] = level.id
        }
        for (let sts of status) {
            let results = await txn("status").where({ name: sts.name });
            if (results) {
                ExerciseDB.StatusMap[sts.name] = results[0].id;
            } else {
                throw new Error("Exercise status not found")
            }
        }
    }
}

class ClassDB {
    public static UserMap = new Map();
    public static StatusMap = new Map();
    public name: string;
    public image: string;
    public trainer_id: number;
    public description: string;
    public price: number;
    public status_id: number;

    // note: cls = class 
    constructor(cls: Class) {
        this.name = cls.name;
        this.image = cls.image;
        this.trainer_id = ClassDB.UserMap[cls.trainer_id] ? ClassDB.UserMap[cls.trainer_id] : -1;
        this.description = cls.description;
        this.price = cls.price;
        this.status_id = ClassDB.StatusMap[cls.status_id] ? ClassDB.StatusMap[cls.status_id] : -1;
    }

    public static async InitializeMaps(txn: Knex.Transaction, cls: Class[], users: User[], status: DBStatus[]) {
        for (let user of users) {
            let results = await txn("users").where({ username: user.username });
            if (results) {
                ClassDB.UserMap[user.username] = results[0].id;
            } else {
                throw new Error("User not found");
            }
        }
        for (let sts of status) {
            let results = await txn("status").where({ name: sts.name });
            if (results) {
                ClassDB.StatusMap[sts.name] = results[0].id;
            } else {
                throw new Error("Class status not found")
            }
        }
    }
}

class UserRecordDB {
    public static ExerciseMap = new Map();
    public static UserMap = new Map();
    public counts: number;
    public exercise_id: number;
    public user_id: number;

    constructor(user_record: User_record) {
        this.counts = user_record.counts;
        this.exercise_id = UserRecordDB.ExerciseMap[user_record.exercise_id] ? UserRecordDB.ExerciseMap[user_record.exercise_id] : -1;
        this.user_id = UserRecordDB.UserMap[user_record.user_id] ? UserRecordDB.UserMap[user_record.user_id] : -1;
    }

    public static async InitializeMaps(txn: Knex.Transaction, user_record: User_record[], exercises: Exercise[], users: User[]) {
        for (let exercise of exercises) {
            let results = await txn("exercises").where({ name: exercise.name });
            if (results) {
                UserRecordDB.ExerciseMap[exercise.name] = results[0].id;
            } else {
                throw new Error("Exercise not found");
            }
        }
        for (let user of users) {
            let results = await txn("users").where({ username: user.username });
            if (results) {
                UserRecordDB.UserMap[user.username] = results[0].id;
            } else {
                throw new Error("User not found")
            }
        }
    }
}

class ClassRecordDB {
    public static ClassMap = new Map();
    public static UserMap = new Map();
    public class_id: number;
    public user_id: number;

    constructor(class_record: Class_record) {
        this.class_id = ClassRecordDB.ClassMap[class_record.class_id] ? ClassRecordDB.ClassMap[class_record.class_id] : -1;
        this.user_id = ClassRecordDB.UserMap[class_record.user_id] ? ClassRecordDB.UserMap[class_record.user_id] : -1;
    }

    public static async InitializeMaps(txn: Knex.Transaction, class_record: Class_record[], classes: Class[], users: User[]) {
        for (let cls of classes) {
            let results = await txn("classes").where({ name: cls.name });
            if (results) {
                ClassRecordDB.ClassMap[cls.name] = results[0].id;
            } else {
                throw new Error("Classes not found");
            }
        }
        for (let user of users) {
            let results = await txn("users").where({ username: user.username });
            if (results) {
                ClassRecordDB.UserMap[user.username] = results[0].id;
            } else {
                throw new Error("User not found");
            }
        }
    }
}

class ChatroomDB {
    public static UserMap = new Map();
    public static ClassMap = new Map();
    public content: string;
    public admin_reply: string;
    public user_id: number;
    public class_id: number;

    constructor(chat_room: Chat_room) {
        this.content = chat_room.content;
        this.admin_reply = chat_room.admin_reply;
        this.user_id = ChatroomDB.UserMap[chat_room.user_id] ? ChatroomDB.UserMap[chat_room.user_id] : -1;
        this.class_id = ChatroomDB.ClassMap[chat_room.class_id] ? ChatroomDB.ClassMap[chat_room.class_id] : -1;
    }

    public static async InitializeMaps(txn: Knex.Transaction, chat_room: Chat_room[], users: User[], classes: Class[]) {
        for (let user of users) {
            let results = await txn("users").where({ username: user.username });
            if (results) {
                ChatroomDB.UserMap[user.username] = results[0].id;
            } else {
                throw new Error("User not found");
            }
        }
        for (let cls of classes) {
            let results = await txn("classes").where({ name: cls.name });
            if (results) {
                ChatroomDB.ClassMap[cls.name] = results[0].id;
            } else {
                throw new Error("Classes not found");
            }
        }
    }
}


export async function seed(knex: Knex): Promise<void> {
    const txn = await knex.transaction();
    try {
        let workbook = XLSX.readFile("./seeds/YGIG_seed_table.xlsx");

        let typeOfExercisesWs = workbook.Sheets["type_of_exercises"];
        let levelsWs = workbook.Sheets["levels"];
        let rolesWs = workbook.Sheets["roles"];
        let statusWs = workbook.Sheets["status"];
        let usersWs = workbook.Sheets["users"];
        let exercisesWs = workbook.Sheets["exercises"];
        let classesWs = workbook.Sheets["classes"];
        let chatroomWs = workbook.Sheets["chat_room"];
        let userRecordsWs = workbook.Sheets["user_records"];
        let classRecordsWs = workbook.Sheets["class_records"];

        let typeOfExercises: Type_of_exercise[] = XLSX.utils.sheet_to_json(typeOfExercisesWs);
        let levels: Level[] = XLSX.utils.sheet_to_json(levelsWs);
        let roles: Role[] = XLSX.utils.sheet_to_json(rolesWs);
        let status: Status[] = XLSX.utils.sheet_to_json(statusWs);
        let users: User[] = XLSX.utils.sheet_to_json(usersWs);
        let exercises: Exercise[] = XLSX.utils.sheet_to_json(exercisesWs);
        let classes: Class[] = XLSX.utils.sheet_to_json(classesWs);
        let chatrooms: Chat_room[] = XLSX.utils.sheet_to_json(chatroomWs);
        let userRecords: User_record[] = XLSX.utils.sheet_to_json(userRecordsWs);
        let classRecords: Class_record[] = XLSX.utils.sheet_to_json(classRecordsWs);

        // Deletes ALL existing entries
        // must follow the same sequence as migrations' s down function
        await txn("class_records").del();
        await txn("user_records").del();
        await txn("chat_room").del();
        await txn("classes").del();
        await txn("exercises").del();
        await txn("users").del();
        await txn("status").del();
        await txn("roles").del();
        await txn("levels").del();
        await txn("type_of_exercises").del();


        await txn.raw("ALTER SEQUENCE class_records_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE user_records_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE chat_room_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE classes_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE exercises_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE status_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE roles_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE levels_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE type_of_exercises_id_seq RESTART WITH 1")


        await txn("type_of_exercises").insert(typeOfExercises).returning("id");

        // Inserts seed for level
        let dbLevels = await txn("levels").insert(levels).returning("*");

        // Inserts seed for Role
        let rolesResult = await txn("roles").insert(roles).returning("*");
        // console.log('rolesResult:', rolesResult);

        // inserts seed for status
        let stautsResult = await txn("status").insert(status).returning("*")

        // Inserts seed for User
        const usersHashed: User[] = [];
        for (let user of users) {
            let hashedPassword = await hashPassword(user.password.toString())
            user.password = hashedPassword
            if (user.username) {

                let role = rolesResult.find(e => e.name === user.role_id)
                user.role_id = role.id
                usersHashed.push(user);
            }
        }
        await txn("users").insert(usersHashed).returning("id");

        // Inserts seed for Exercise
        await ExerciseDB.InitializeMaps(txn, exercises, typeOfExercises, dbLevels, stautsResult);
        const exercisesDB: ExerciseDB[] = [];

        console.log('exercises:', exercises)
        for (let exercise of exercises) {
            let exerciseDB = new ExerciseDB(exercise);
            console.log('exerciseDB:', exerciseDB)
            if (exerciseDB.type_id > 0 && exerciseDB.level_id > 0 && exerciseDB.status_id > 0) {
                exercisesDB.push(exerciseDB);
                console.log('exerciseDB after loop:', exerciseDB)
            }
            // console.log('exerciseDB = ', exerciseDB)

        }
        await txn("exercises").insert(exercisesDB).returning("id");

        // Inserts seed for Class
        await ClassDB.InitializeMaps(txn, classes, users, stautsResult)
        const clsDB: ClassDB[] = [];
        for (let cls of classes) {
            let classDB = new ClassDB(cls);
            if (classDB.trainer_id > 0 && classDB.status_id > 0) {
                clsDB.push(classDB);
            }

        }
        // console.log('clsDB:', clsDB)


        await txn("classes").insert(clsDB).returning("id");

        // Inserts seed for Chatroom
        await ChatroomDB.InitializeMaps(txn, chatrooms, users, classes);
        const chatroomsDB: ChatroomDB[] = [];
        for (let chatroom of chatrooms) {
            let chatroomDB = new ChatroomDB(chatroom);
            if (chatroomDB.user_id > 0 && chatroomDB.class_id > 0) {
                chatroomsDB.push(chatroomDB);
            }
        }
        await txn("chat_room").insert(chatroomsDB).returning("id");

        // Inserts seed for User record
        await UserRecordDB.InitializeMaps(txn, userRecords, exercises, users);
        const userrecordsDB: UserRecordDB[] = [];
        for (let userRecord of userRecords) {
            let userrecordDB = new UserRecordDB(userRecord);
            if (userrecordDB.exercise_id > 0 && userrecordDB.user_id > 0) {
                userrecordsDB.push(userrecordDB);
            }
        }
        await txn("user_records").insert(userrecordsDB).returning("id");


        // Inserts seed for Class record
        await ClassRecordDB.InitializeMaps(txn, classRecords, classes, users);
        const classrecordsDB: ClassRecordDB[] = [];
        for (let classRecord of classRecords) {
            let classrecordDB = new ClassRecordDB(classRecord);
            if (classrecordDB.class_id > 0 && classrecordDB.user_id > 0) {
                classrecordsDB.push(classrecordDB);
            }
        }
        await txn("class_records").insert(classrecordsDB).returning("id");

        await txn.commit();


    } catch (error) {
        console.log(error);
        await txn.rollback();
    }
    // await knex.destroy();
};

