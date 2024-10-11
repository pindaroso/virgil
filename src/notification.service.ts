import { Injectable } from '@nestjs/common'

@Injectable()
export class NotificationService {
  async notify(actionItem: string) {
    // Implement your notification logic here
    // Example: Send an email or push notification
    console.log('Action Item:', actionItem)
  }
}
