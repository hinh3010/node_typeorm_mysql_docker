import { IsNotEmpty } from "class-validator";
import { BaseDto } from "../shared/dto/base.dto";

export class UserDto extends BaseDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastname!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    city!: string;

    @IsNotEmpty()
    province!: string;
}