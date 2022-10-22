import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../shared/services/base.service";
import { ProductDto } from "./product.dto";
import { ProductEntity } from "./product.entity";

export class ProductService extends BaseService<ProductEntity> {

    constructor() {
        super(ProductEntity);
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRepository).find({ relations: ["category"] });
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOne({ where: { id }, relations: ["category"] });
    }

    async createProduct(body: ProductDto): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
        // return (await this.execRepository).softDelete({ id });
    }

    async updateProduct(id: string, infoUpdate: ProductDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

}
