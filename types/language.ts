export const language = [
  "Python",
  "JavaScript",
  "Ruby",
  "Rust",
  "TypeScript",
  "C++",
  "C#",
  "Solidity",
] as const;

export type Language = typeof language[number];
