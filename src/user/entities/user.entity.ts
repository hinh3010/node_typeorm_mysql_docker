import { Column, Entity, OneToOne } from "typeorm";
import { CustomerEntity } from "../../customer/customer.entity";
import { BaseEntity } from "../../shared/entities/base.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column()
    name!: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column({ select: false })
    password!: string

    @Column()
    city!: string

    @Column()
    province !: string

    // quan he 1 - 1 vs table customer
    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}