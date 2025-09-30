import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Eccommerce tiagoisi')
    .setDescription('Documentacion detallada backend')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server listening on port ${process.env.PORT}`);
}
bootstrap();
