import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "../category/category.entity";
import { PurchaseProductEntity } from "../purchase/entities/purchases-products.entity";
import { BaseEntity } from "../shared/entities/base.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity {
    @Column()
    productName!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    // quan he nhieu - 1 voi table category
    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;

    // quan he 1 - nhieu voi table purchaseProduct
    @OneToMany(
        () => PurchaseProductEntity,
        (purchaseProduct) => purchaseProduct.product
    )
    purchaseProduct!: PurchaseProductEntity[];

}
