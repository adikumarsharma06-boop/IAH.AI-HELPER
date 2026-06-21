export type AdviceMode =
  | "general_advisor"
  | "decision_engine"
  | "money_intelligence"
  | "business_intelligence"
  | "learning_system"
  | "research_mode"
  | "problem_solving"
  | "startup_advisor"
  | "productivity_engine";

export interface ModeDetail {
  id: AdviceMode;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  fields: CustomField[];
  presetScenarios: PresetScenario[];
}

export interface CustomField {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  helpText?: string;
}

export interface PresetScenario {
  title: string;
  scenario: string;
  additionalContext: Record<string, any>;
}

export interface StrategicBrief {
  id: string;
  title: string;
  mode: AdviceMode;
  scenario: string;
  additionalContext: Record<string, any>;
  analysisText: string;
  createdTime: string;
  modelUsed: string;
  chatHistory: ChatMessage[];
  category?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
