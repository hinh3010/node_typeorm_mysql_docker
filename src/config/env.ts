import * as dotenv from 'dotenv'
dotenv.config()

export const Env = {
    port: Number(process.env.PORT) || 8081,
    db: {
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
}