import { Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { AIService } from './ai.service'
import { NotificationService } from './notification.service'

@Module({
  providers: [TelegramService, AIService, NotificationService],
})
export class TelegramModule {}
