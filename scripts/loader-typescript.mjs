// Loader usado somente pela verificação numérica, sem build da interface.
import ts from "../node_modules/typescript/lib/typescript.js";
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
    const base = new URL(specifier, context.parentURL);
    for (const suffix of ["", ".ts", "/index.ts"]) {
      const candidate = new URL(base.href + suffix);
      const path = fileURLToPath(candidate);
      if (path.endsWith(".ts") && existsSync(path) && statSync(path).isFile()) {
        return { url: candidate.href, shortCircuit: true };
      }
    }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".ts")) {
    return {
      format: "module",
      shortCircuit: true,
      source: ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
        },
      }).outputText,
    };
  }
  return nextLoad(url, context);
}
