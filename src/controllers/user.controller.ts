import { Request, Response } from "express";

export class UserController {
    getUsers(req: Request, res: Response) {
        return res.json({
            stutus: 200,
            data: "adu"
        })
    }
}