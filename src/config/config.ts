require('dotenv').config();


export const Config = {
    DataBase: {
        DB_CONFIG: process.env.DATABASE,

    },
    APICEP: {
        CEP_URL: process.env.API_VIACEP,
    }
}