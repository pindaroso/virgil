import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

@Injectable()
export class AIService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async processMessage(message: string): Promise<string | null> {
    const prompt = `Analyze the following message and determine if there is any actionable task to be done. If yes, respond with the task, otherwise respond with null.

Message: "${message}"`

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      })

      const result = response.choices[0].message.content?.trim()
      console.log('AI response:', result)
      return result && result.toLowerCase() !== 'null' ? result : null
    } catch (error) {
      console.error('AI processing failed:', error)
      return null
    }
  }
}
