import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from 'src/entities/conversion.entity';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ConversionService {
    constructor (
        @InjectRepository(Conversion) private conversionRepository: Repository<Conversion>
      ){}

    async findAllExchanges(): Promise<Conversion[]>{
        return this.conversionRepository.find();
    }
}
