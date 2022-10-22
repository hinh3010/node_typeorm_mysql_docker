import { IsNotEmpty } from "class-validator";
import { CustomerEntity } from "../../customer/customer.entity";
import { BaseDto } from "../../shared/dto/base.dto";

export class PurchaseDto extends BaseDto {
	@IsNotEmpty()
	status!: string;

	@IsNotEmpty()
	paymentMethod!: string;

	@IsNotEmpty()
	customer!: CustomerEntity;
}
