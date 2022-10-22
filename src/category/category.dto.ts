import { IsNotEmpty } from "class-validator";
import { BaseDto } from "../shared/dto/base.dto";

export class CategoryDto extends BaseDto {
    @IsNotEmpty()
    categoryName!: string;
}
