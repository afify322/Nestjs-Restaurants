import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './middleware/ExceptionHandler';
import { v2 } from 'cloudinary';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  v2.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: parseFloat(process.env.API_KEY),
    api_secret: `${process.env.API_SECRET}`,
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Restaurants')
    .setDescription('The Restaurants API description')
    .setVersion('1.0')
    .addTag('Restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
