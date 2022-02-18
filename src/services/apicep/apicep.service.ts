import { Config } from './../../config/config';
import { Address } from './../../types/Adress.type';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApicepService {

    async search(code: string): Promise<Address> {

        const cepFormatado = code.replace(/\D/g, '');
        try {

            const { data } = await axios.get(`${Config.APICEP.CEP_URL}/${cepFormatado}/json/`)
            const address = {
                code: code,
                state: data.uf,
                city: data.localidade,
                district: data.bairro,
                address: data.logradouro
            }
            return address

        } catch (error) {

        }
    }

}

