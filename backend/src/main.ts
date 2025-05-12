import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow CORS for my frontend only
  app.use(helmet());
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PATCH,DELETE', 
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials:true
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
  
}
bootstrap();
