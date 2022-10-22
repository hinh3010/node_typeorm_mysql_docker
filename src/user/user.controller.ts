import { Request, Response } from "express";
import { HttpResponse } from "../shared/response/http.response";
import { UserService } from "./user.service";

export class UserController {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }


    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser()
            console.log({ data })
            // if (data.length <= 0)
            // return this.httpResponse.NotFound(res, data)
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log({ error: error })
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserById(id)
            return res.json({
                stutus: 200,
                data: data
            })
        } catch (error) {
            console.log({ error: error })
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body)
            return res.json({
                stutus: 200,
                data: data
            })
        } catch (error) {
            console.log({ error: error })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.deleteUser(id)
            return res.json({
                stutus: 200,
                data: data
            })
        } catch (error) {
            console.log({ error: error })
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.updateUser(id, req.body)
            return res.json({
                stutus: 200,
                data: data
            })
        } catch (error) {
            console.log({ error: error })
        }
    }
}