import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('First project NestJS')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });
  const port = 3000;

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger is running on http://localhost:${port}/docs`);
  });
}
void bootstrap();
