export type OpenAIModel = 'gpt-4o' | 'gpt-3.5-turbo' | 'arlow' | 'arlow-thinking';

export type FrontendModel = 
  | 'gpt-3.5-turbo' | 'gpt-4o' | 'gpt-4o-mini'
  | 'arro' | 'arro-thinking';

export interface ChatBody {
  inputCode: string;
  model: FrontendModel;
  apiKey?: string | undefined;
}
