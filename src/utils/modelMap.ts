// Model mapping utilities for Arro GPT (Arlow backend) integration

export const isArro = (m: string) => m === "arro" || m === "arro-thinking";

export const toBackendModel = (m: string) =>
  m === "arro" ? "arlow" :
  m === "arro-thinking" ? "arlow-thinking" : m;

export const needsArlowKey = (m: string) => isArro(m);

export const getProviderName = (m: string) => 
  isArro(m) ? "Arro GPT" : "OpenAI";
