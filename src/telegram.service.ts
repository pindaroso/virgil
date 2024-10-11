import { Injectable, OnModuleInit } from '@nestjs/common'
import { Telegraf } from 'telegraf'

import { AIService } from './ai.service'
import { NotificationService } from './notification.service'

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf

  constructor(
    private readonly aiService: AIService,
    private readonly notificationService: NotificationService
  ) {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
  }

  onModuleInit() {
    this.bot.on('text', async (ctx) => {
      const message = ctx.message.text
      console.log(`Received message: ${message}`)

      const actionItem = await this.aiService.processMessage(message)
      if (actionItem) {
        await this.notificationService.notify(actionItem)
      }
    })

    this.bot
      .launch()
      .then(() => {
        console.log('Telegram bot launched')
      })
      .catch((err) => {
        console.error('Failed to launch Telegram bot:', err)
      })
  }
}
