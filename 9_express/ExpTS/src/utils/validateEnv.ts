import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PASTA_LOGS: str(),
        PORT: port(),
    })
}

export {validateEnv}