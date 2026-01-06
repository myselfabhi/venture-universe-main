import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable prop-types since we're not using TypeScript
      "react/prop-types": "off",
      // Allow process.env in client components
      "no-undef": "off",
      // Three.js uses non-standard props
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "dispose",
            "rotation",
            "position",
            "scale",
            "object",
            "geometry",
            "material",
            "skeleton",
          ],
        },
      ],
      // Allow unused React import (sometimes needed for JSX)
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^React$",
        },
      ],
      // Allow apostrophes in text
      "react/no-unescaped-entities": "off",
      // Fast refresh warnings
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];

export default eslintConfig;
