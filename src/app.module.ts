import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversionController } from './conversion/conversion.controller';
import { ConversionService } from './conversion/conversion.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,   
      username: 'adm',
      password: 'password',
      database: 'dbpostgres',
      entities: [`${__dirname}/typeorm/entities/*{.ts,.js}`],
      synchronize: true,
    })
  ],
  controllers: [AppController, ConversionController],
  providers: [AppService, ConversionService],
})
export class AppModule {}
