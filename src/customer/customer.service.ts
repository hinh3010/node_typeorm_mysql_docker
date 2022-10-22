import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../shared/services/base.service";
import { CustomerDto } from "./customer.dto";
import { CustomerEntity } from "./customer.entity";

export class CustomerService extends BaseService<CustomerEntity> {
    constructor() {
        super(CustomerEntity);
    }

    async findAllCustomers(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find();
    }
    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }
    async createCustomer(body: CustomerDto): Promise<CustomerEntity> {
        return (await this.execRepository).save(body);
    }
    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
    async updateCustomer(
        id: string,
        infoUpdate: CustomerDto
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}
