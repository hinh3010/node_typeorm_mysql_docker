import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
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
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.userService.findUserById(id)
            if (!data)
                return this.httpResponse.NotFound(res, "User not found")
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.userService.findUserById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "User not found");
            }
            const isDeleted: DeleteResult = await this.userService.deleteUser(id)
            if (!isDeleted.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            return this.httpResponse.Ok(res, isExist)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.userService.findUserById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "User not found");
            }
            const isUpdated: UpdateResult = await this.userService.updateUser(id, req.body)
            if (!isUpdated.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            const data = await this.userService.findUserById(id)
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }
}