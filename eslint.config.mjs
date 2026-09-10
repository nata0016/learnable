import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // next/core-web-vitals only enables a handful of jsx-a11y rules at "warn".
  // Layer the plugin's own "strict" ruleset on top (applied after, so its
  // "error"-level rules take precedence) to get the full a11y ruleset.
  // Only spread `rules` here — `next/core-web-vitals` already registers the
  // jsx-a11y plugin via its legacy-config shim, and flat config errors if the
  // same plugin name is registered twice with different object references.
  {
    rules: jsxA11y.flatConfigs.strict.rules,
  },
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
