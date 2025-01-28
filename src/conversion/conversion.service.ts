import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from '../entities/conversion.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateConversionDto } from './dto/create-conversion.dto';


@Injectable()
export class ConversionService {
    constructor (
        @InjectRepository(Conversion) private conversionRepository: Repository<Conversion>
      ){}

    async findAllExchanges(): Promise<Conversion[]>{
        return this.conversionRepository.find();
    }

    async newConversion(params: CreateConversionDto): Promise<{conversion: Conversion, status: HttpStatus}> {
        const choices = {
            "BRL": "R$",
		    "USD": "$",
		    "BTC": "₿",
		    "EUR": "€",
        }
        const resConvert = params.amount * params.rate;
        const symbolKey = choices[params.to.toUpperCase()];
        const createdConversion = await this.conversionRepository.save(
            {
                value: resConvert,
                symbol: symbolKey
            })
    
        return {
            conversion : createdConversion,
            status: HttpStatus.CREATED
        };
    }

    async destroy(id: number): Promise<HttpStatus> {
        await this.conversionRepository.delete(id);
        return HttpStatus.OK;
    }
}
