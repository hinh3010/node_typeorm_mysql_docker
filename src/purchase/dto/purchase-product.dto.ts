import { IsNotEmpty, IsOptional } from "class-validator";
import { ProductEntity } from "../../product/product.entity";
import { BaseDto } from "../../shared/dto/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";


export class PurchaseProductDto extends BaseDto {
    @IsNotEmpty()
    quantityProduct!: number;

    @IsOptional()
    totalPrice?: number;

    @IsOptional()
    purchase?: PurchaseEntity;

    @IsOptional()
    product?: ProductEntity;
}
