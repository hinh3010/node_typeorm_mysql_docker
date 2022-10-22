import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDto } from "../shared/dto/base.dto";

export class UserDto extends BaseDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    city!: string;

    @IsNotEmpty()
    province!: string;

    @IsOptional()
    role?: RoleType
}

export enum RoleType {
    USER = "USER",
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
}