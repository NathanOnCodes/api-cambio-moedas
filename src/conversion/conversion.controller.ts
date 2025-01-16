import { Controller, Get } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { Conversion } from 'src/entities/conversion.entity';

@Controller('api/v1/exchange/')
export class ConversionController {
    constructor(
        private readonly conversionService: ConversionService
    ){}

    @Get()
    findExchanges(): Promise<Conversion[]>{
        return this.conversionService.findAllExchanges()
    }

}
