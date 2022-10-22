import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../shared/services/base.service";
import { ProductDto } from "./product.dto";
import { ProductEntity } from "./product.entity";

export class ProductService extends BaseService<ProductEntity> {
    constructor() {
        super(ProductEntity);
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRepository).find();
    }
    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }
    async createProduct(body: ProductDto): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    }
    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
    async updateProduct(
        id: string,
        infoUpdate: ProductDto
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}
