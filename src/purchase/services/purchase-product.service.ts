import { DeleteResult, UpdateResult } from "typeorm";
import { ProductService } from "../../product/product.service";
import { BaseService } from "../../shared/services/base.service";
import { PurchaseProductDto } from "../dto/purchase-product.dto";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
    constructor(
        private readonly productService: ProductService = new ProductService()
    ) {
        super(PurchaseProductEntity);
    }

    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        // return (await this.execRepository).find({ relations: ["product", "purchase"] });
        return (await this.execRepository).createQueryBuilder('purchases_products')
            .innerJoinAndSelect("purchases_products.purchase", "purchase")
            .innerJoinAndSelect("purchase.customer", "customer")
            // .innerJoinAndSelect("customer.purchases", "purchases")
            .innerJoinAndSelect("customer.user", "user")
            .innerJoinAndSelect("purchases_products.product", "product")
            .innerJoinAndSelect("product.category", "category")
            .getMany()
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
        // return (await this.execRepository).findOne({ where: { id }, relations: ["product", "purchase"] });
        return (await this.execRepository).findOne({
            where: { id }, relations: {
                product: true,
                purchase: true
            },
        });
    }

    async createPurchaseProduct(body: PurchaseProductDto): Promise<PurchaseProductEntity> {
        // tạo đơn mua của 1 sản phẩm từ body
        const newPP = (await this.execRepository).create(body);

        // từ id của sản phẩm trong đơn mua tính giá tiền theo số lượng
        const prod = await this.productService.findProductById(newPP.product.id);
        newPP.totalPrice = prod!.price * newPP.quantityProduct;

        // lưu vào db đơn mua của sản phẩm vừa tạo
        return (await this.execRepository).save(newPP);
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}
