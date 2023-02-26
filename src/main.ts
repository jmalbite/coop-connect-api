import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * enable dto validations set per dto's
   * @param  {true} newValidationPipe({whitelist
   * @param  {} }
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //this will strip out the field that have not been included in dto / request body
    }),
  );

  await app.listen(3000);
}
bootstrap();
