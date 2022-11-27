// eslint-disable-next-line @typescript-eslint/no-var-requires
const { description, version } = require('../package.json');

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true
  });
  const port: string | number = process.env.PORT || 3000;
  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Votatoon API')
    .setDescription(description)
    .setVersion(version)
    .build();
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey
    }
  );

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port, () => console.log(`Running on port ${port}`));
}
bootstrap();
