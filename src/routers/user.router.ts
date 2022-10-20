import { UserController } from "../controllers/user.controller";
import { BaseRouter } from "./router";

export class UserRouter extends BaseRouter<UserController>{
    constructor() {
        super(UserController)
    }

    routes(): void {
        // this.router.get('/users', this.controller.getUsers)
        this.router.get('/users', (req, res) => this.controller.getUsers(req, res))
    }
}