import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ApiExecptionFilter } from './common/filters/api-execption.filter';
import { ApiTransformInterceptor } from './common/interceptors/api-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // validate
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors[0]?.toString());
      },
    }),
  );
  // execption
  app.useGlobalFilters(new ApiExecptionFilter());
  // api interceptor
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SF后台管理系统')
    .setDescription('Api文档')
    .setVersion('2.0.0')
    .addSecurity('admin', {
      description: '后台管理接口授权',
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/admin/doc/swagger-api', app, document);
  // start
  await app.listen(7001);
}

bootstrap();
