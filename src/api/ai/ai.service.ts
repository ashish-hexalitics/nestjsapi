import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly genAI: GoogleGenerativeAI;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('AI_API_KEY');
    if (!apiKey) {
      throw new Error('AI_API_KEY is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async convertMarkdownToJson(mdData: string): Promise<object> {
    try {
      const jsonBlockMatch = mdData.match(/```json([\s\S]*?)```/);
      if (!jsonBlockMatch || !jsonBlockMatch[1]) {
        throw new Error("No JSON block found in the Markdown data");
      }

      // Parse the extracted JSON block
      const jsonString = jsonBlockMatch[1].trim();
      const jsonObject = JSON.parse(jsonString);

      return jsonObject;
    } catch (error: any) {
      console.error(
        "Error converting Markdown to JSON:",
        error.message || error
      );
      throw new Error("Failed to convert Markdown data to JSON");
    }
  };

  async generateAIContent(prompt: string, tag: string): Promise<any> {
    try {
      // Initialize the generative model
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });

      // Adjust the message based on the tag
      let refinedPrompt = '';
      switch (tag) {
        case 'summary':
          refinedPrompt = `You are an AI assistant skilled in professional writing.
                            Your task is to refine and enhance the following career summary to make it concise, 
                            professional, and impactful for a resume or LinkedIn profile. 
                            Ensure the tone is formal and the content highlights the user's expertise effectively. 
                            Provide the refined summary in the following JSON format:
                                {
                                "options": [
                                    {
                                    "text": "<Refined Summary Option 1>"
                                    },
                                    {
                                    "text": "<Refined Summary Option 2>"
                                    },
                                    {
                                    "text": "<Refined Summary Option 3>"
                                    }
                                ]
                                }

                            Here's the original summary:
                            "${prompt}"

                            Please ensure the response strictly adheres to the specified JSON format.`;

          break;
        case 'html':
          refinedPrompt = `Improve the responsiveness and quality of the following HTML:\n\n${prompt}`;
          break;
        default:
          throw new Error(
            'Invalid tag provided. Please use "summary" or "html".',
          );
      }

      // Generate AI content
      const result = await model.generateContent(refinedPrompt);
      const responseText = await this.convertMarkdownToJson(result.response.text());

      // Return the generated content text
      return {
        data: responseText,
      };
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw new Error('AI content generation failed');
    }
  }
}
