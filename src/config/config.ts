require('dotenv').config();

export const Config = {
  DATABASE: {
    DB_CONFIG: process.env.DATABASE,
  },
  APICEP: {
    CEP_URL: process.env.API_VIACEP,
  },
};
