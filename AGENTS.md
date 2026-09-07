## Agent skills

### Issue tracker

Issues e specs vivem como arquivos markdown em `.scratch/<feature>/`. Veja `docs/agents/issue-tracker.md`.

### Triage labels

Triagem usa os cinco rótulos canônicos padrão (texto do rótulo = nome do papel). Veja `docs/agents/triage-labels.md`.

### Domain docs

Layout de contexto único: um `CONTEXT.md` + `docs/adr/` na raiz do repo. Veja `docs/agents/domain.md`.

### Lint vs typecheck

- `npm run lint` roda só `oxlint` (sem informação de tipos, não pega TS2339 como `Property 'segs' does not exist`).
- `npm run typecheck` roda `tsc -b` e é obrigatório para validar tipos.
- Em CI/validação completa rode `lint + typecheck + test`.
