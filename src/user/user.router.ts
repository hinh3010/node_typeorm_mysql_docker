import { UserController } from "./user.controller";
import { BaseRouter } from "../shared/routers/router";
import { UserMiddleware } from "./user.middleware";

export class UserRouter extends BaseRouter<UserController, UserMiddleware>{
    constructor() {
        super(UserController, UserMiddleware)
    }

    routes(): void {
        // this.router.get('/users', this.controller.getUsers)
        this.router.get('/users', (req, res) => this.controller.getUsers(req, res))
        this.router.get('/user/:id', (req, res) => this.controller.getUserById(req, res))

        this.router.post('/user',
            (req, res, next) => this.middleware.userValidator(req, res, next),
            (req, res) => this.controller.createUser(req, res))

        this.router.patch('/user/:id', (req, res) => this.controller.updateUser(req, res))
        this.router.delete('/user/:id', (req, res) => this.controller.deleteUser(req, res))

        this.router.get("/userRel/:id", (req, res) =>
            this.controller.getUserWithRelationById(req, res)
        );
    }
}