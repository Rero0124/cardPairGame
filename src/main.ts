import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import handlebars, { partials } from 'handlebars';
import fastifyView from '@fastify/view';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const config = app.get(ConfigService);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars: handlebars
    },
    options: {
      partials: {
        layout: 'layout.hbs',
      }
    },
    templates: join(__dirname, '..', 'views')
  });

  app.useWebSocketAdapter(new IoAdapter(app));
  
  await app.listen({
    port: config.get('app.port'),
    host: config.get('app.host'),
  });
}
bootstrap();
