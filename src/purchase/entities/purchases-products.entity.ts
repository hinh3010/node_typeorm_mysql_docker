import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../shared/entities/base.entity";
import { ProductEntity } from "../../product/product.entity";
import { PurchaseEntity } from "./purchase.entity";


@Entity({ name: "purchases_products" })
export class PurchaseProductEntity extends BaseEntity {
    @Column()
    quantityProduct!: number;

    @Column()
    totalPrice!: number;

    // quan he nhieu - 1 voi table purchase
    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
    @JoinColumn({ name: "purchase_id" })
    purchase!: PurchaseEntity;

    // quan he nhieu - 1 voi table product
    @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
    @JoinColumn({ name: "product_id" })
    product!: ProductEntity;
}
