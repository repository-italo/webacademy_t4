import { cleanEnv, port, str, url } from "envalid";

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PASTA_LOGS: str(),
        PORT: port(),
        DB_SERVER: url(),
    })
}

export {validateEnv}