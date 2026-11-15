import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "STRINGR_AI_PreDevelopment_Documentation/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
