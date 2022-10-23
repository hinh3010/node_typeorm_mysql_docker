import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../shared/services/base.service";
import { UserEntity } from "./user.entity";
import { UserDto } from "./user.dto";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }
    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }
    async createUser(body: UserDto): Promise<UserEntity> {
        return (await this.execRepository).save(body);
    }
    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
    async updateUser(id: string, infoUpdate: UserDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.customer", "customer")
            .where({ id })
            .getOne();
    }
}


