import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    items: ["Python", "C/C++", "SQL"],
  },
  {
    name: "ML / DL",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-Learn",
      "XGBoost",
      "CatBoost",
      "Optuna",
    ],
  },
  {
    name: "Generative AI",
    items: ["LangChain", "LangGraph", "OpenAI", "Huggingface", "Transformers"],
  },
  {
    name: "Technologies",
    items: ["FastAPI", "MLflow", "MongoDB", "Whisper", "Node.js", "Express"],
  },
  {
    name: "Tools",
    items: ["Git", "Jupyter", "VS Code", "Postman", "Docker", "Linux"],
  },
];
