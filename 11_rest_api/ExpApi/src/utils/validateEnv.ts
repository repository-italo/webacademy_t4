import { cleanEnv, str, port, num } from "envalid";

function validateEnv () { 
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str(),
        DEFAULT_LANG: str(),
        SALT_ROUNDS: num(),
    })
}

export {validateEnv}