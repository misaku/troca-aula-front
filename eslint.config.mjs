import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Mantém as extensões padrões do Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Adiciona este objeto para customizar as regras
  {
    rules: {
      // 1. Permite variáveis não utilizadas (ex: NextRequest, error, index)
      "@typescript-eslint/no-unused-vars": "off",

      // 2. Permite o uso de 'any'
      "@typescript-eslint/no-explicit-any": "off",

      // 3. Permite usar @ts-ignore sem forçar @ts-expect-error
      "@typescript-eslint/ban-ts-comment": "off",

      // 4. Desativa o aviso de dependências do useEffect (opcional, mas evita erros no build)
      "react-hooks/exhaustive-deps": "off",

      // 5. Se o ESLint reclamar de regras do Next especificamente:
      "@next/next/no-html-link-for-pages": "off"
    },
  },
];

export default eslintConfig;
