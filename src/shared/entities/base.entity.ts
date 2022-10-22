import {
    Column,
    CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updatedAt!: Date;

    @Column({
        default: false,
        name: "is_deleted",
        type: "boolean",
    })
    isDeleted!: boolean;

    @DeleteDateColumn({
        name: "deleted_at",
        type: "timestamp",
        default: null,
    })
    deletedAt!: Date;

}