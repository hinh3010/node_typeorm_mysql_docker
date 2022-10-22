import { IsNotEmpty } from "class-validator";
import { CategoryEntity } from "../category/category.entity";
import { BaseDto } from "../shared/dto/base.dto";

export class ProductDto extends BaseDto {
    @IsNotEmpty()
    productName!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    category!: CategoryEntity;
}
