import { Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { Conversion } from 'src/entities/conversion.entity';
import { CreateConversionDto } from './dto/create-conversion.dto';

@Controller('api/v1/exchange/')
export class ConversionController {
    constructor(
        private readonly conversionService: ConversionService
    ){}

    @Get()
    findExchanges(): Promise<Conversion[]>{
        return this.conversionService.findAllExchanges();
    }

    @Post(':amount/:from/:to/:rate')
    createConversion(
        @Param() params: CreateConversionDto
    ): Promise<{conversion: Conversion, status: HttpStatus}>{
        return this.conversionService.newConversion(params);
    }

    @Delete('delete/:id')
    deleteConversion(
        @Param('id') id: number
    ): HttpStatus {
        this.conversionService.destroy(id);
        return HttpStatus.OK;
    }
}
