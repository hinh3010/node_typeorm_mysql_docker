import { IsNotEmpty } from "class-validator";
import { BaseDto } from "../shared/dto/base.dto";
import { UserEntity } from "../user/user.entity";

export class CustomerDto extends BaseDto {
    @IsNotEmpty()
    address!: string;

    @IsNotEmpty()
    dni!: number;

    @IsNotEmpty()
    user!: UserEntity;
}
