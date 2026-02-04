import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new LoggingInterceptor()); // Approach 1: Global Binding

  const config = new DocumentBuilder()
    .setTitle('Liao API')
    .setDescription('The Order Management API description')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // This sets the URL

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // Strips out fields not in the DTO
    transform: true,      // Automatically converts strings to numbers if typed
    stopAtFirstError: true
  }));

  await app.listen(3000);
}
bootstrap();
