import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ConfigServer } from "../../config/config";
import { BaseEntity } from "../entities/base.entity";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>;
    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository<T extends ObjectLiteral>(e: EntityTarget<T>): Promise<Repository<T>> {
        // async initRepository<T>(e: EntityTarget<T>): Promise < Repository < T >> {
        const getConn = await this.dbConnect();
        return getConn.getRepository(e);
    }
}