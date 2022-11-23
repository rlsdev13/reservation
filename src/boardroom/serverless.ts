import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express'
import { ValidationPipe } from '@nestjs/common';
import { Handler, Context, Callback } from 'aws-lambda';
import { BoardroomModule } from './boardroom.module';

let server : Handler;

async function bootstrap() {
  const app = await NestFactory.create( BoardroomModule );
  app.useGlobalPipes( new ValidationPipe() );
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app : expressApp });
}

export const handler: Handler = async (
    event : any,
    context : Context,
    callback : Callback
) => {
    server = server ?? ( await bootstrap() );
    return server( event, context, callback )
}