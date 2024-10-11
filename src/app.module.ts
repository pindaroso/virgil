import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TelegramModule } from './telegram.module'
import { AIModule } from './ai.module'
import { NotificationModule } from './notification.module'

@Module({
  imports: [TelegramModule, AIModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
