// Data enums (categories, product types) are stored in ALL CAPS. This turns
// them into readable labels: short acronyms (AI, API, CLI) stay as written,
// everything else becomes sentence case ("FULL STACK" -> "Full stack").
export function sentenceCase(value: string): string {
  if (value.length <= 3) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
