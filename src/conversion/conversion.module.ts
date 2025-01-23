import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversion } from 'src/entities/conversion.entity';
import { ConversionService } from './conversion.service';
import { ConversionController } from './conversion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion])],
  controllers: [ConversionController],
  providers: [ConversionService],
})
export class ConversionModule {}