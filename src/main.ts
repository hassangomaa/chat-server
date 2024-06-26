import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from './ws.adapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new WsAdapter());
  await app.listen(3001);
  console.log(`NestJS server listening on http://localhost:3001`);
}
bootstrap();
