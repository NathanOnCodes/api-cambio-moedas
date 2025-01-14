import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversionController } from './conversion/conversion.controller';

@Module({
  imports: [],
  controllers: [AppController, ConversionController],
  providers: [AppService],
})
export class AppModule {}
