import { BaseEntity } from "../../shared/entities/base.entity";
import { Entity, Column, OneToOne } from "typeorm";
import { CustomerEntity } from "../../customer/customer.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column()
    name !: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({ nullable: true })
    city !: string

    @Column()
    provice !: string

    // quan he 1 - 1 vs table customer
    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}