import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { UserDto } from "./user.dto";

export class UserMiddleware extends SharedMiddleware {

    // constructor(
    //     private readonly httpResponse: HttpResponse = new HttpResponse()
    // ) { }

    constructor() {
        super();
    }

    userValidator(req: Request, res: Response, next: NextFunction) {

        const { name, lastName, email, password, city, province, role } = req.body;

        const valid = new UserDto();

        valid.name = name;
        valid.lastName = lastName;
        valid.email = email;
        valid.password = password;
        valid.city = city;
        valid.province = province;
        valid.role = role;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });

    }

}
