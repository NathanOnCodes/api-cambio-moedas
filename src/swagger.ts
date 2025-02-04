import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function swagger(app: INestApplication) {

    const config = new DocumentBuilder()
        .setTitle('API de cambio')
        .setDescription('Converta moedas com base na cotação do dia.')
        .setVersion('1.0')
        .build();

    const documentFactory =  SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
}  