import Knex from 'knex';
import { ClassService } from '../service/classService';
import { UserService } from '../service/userService';
const knexfile = require('../knexfile'); // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile["test"]); // Now the connection is a testing connection.

describe('Demo testing', () => {
    let classService: ClassService;
    let userService: UserService

    function sum(a: number, b: number) {
        return a + b
    }

    beforeAll(async () => {
        await knex.migrate.latest()
        await knex.seed.run()
    })
    beforeEach(async () => {
        classService = new ClassService(knex);
        userService = new UserService(knex)
    })

    it('can add 2 numbers', () => {
        expect(sum(1, 2,)).toBe(3)
    })
    it("should get 6 classes on initial", async () => {
        const classes = await classService.getClasses();
        expect(classes.length).toBe(6);
    });

    it("can create new classes", async () => {
        // await userService.register("testUser", "1234", "12345678", "testUser@gmail.com", "Tai Po", 1)
        let users = await userService.getUserById(1)
        let user = users[0]
        console.log('user= ', user)
        const newClasses = await classService.addClass('Demo Class', "demoimage", user.id, "abcdefghijk...", 123);
        const totalClasses = await classService.getClasses();
        expect(newClasses.length).toBe(1);
        expect(totalClasses.length).toBe(7);
    });


    afterAll(async () => {
        console.log('afterall clearning up')
        await knex.migrate.rollback()
        await knex.destroy()
    })

})


