import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * sessions
   * @param  {"session"} session({name
   * @param  {process.env.SESSION_SECRET} secret
   * @param  {Boolean(process.env.SESSION_RESAVE} resave
   */
  app.use(
    session({
      name: "session",
      secret: process.env.SESSION_SECRET,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVEUNINITIALIZED),
      cookie: { maxAge: 86400000 },
    })
  );

  //NOTE: in the future me -> save all the session in the redis cache so the api become stateless
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * enabling cors
   * @param  {process.env.CORS_ORIGIN} {origin
   * @param  {Boolean(process.env.CORS_CREDENTIALS} credentials
   */
  app.enableCors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: Boolean(process.env.CORS_CREDENTIALS),
  });

  /**
   * enable dto validations set per dto's
   * @param  {true} newValidationPipe({whitelist
   * @param  {} }
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //this will strip out the field that have not been included in dto / request body
    })
  );

  await app.listen(3000);
}
bootstrap();
