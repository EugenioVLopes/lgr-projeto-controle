# Rastreador de issues: Markdown local

Issues e specs deste repo vivem como arquivos markdown em `.scratch/`.

## Convenções

- Uma funcionalidade por diretório: `.scratch/<feature-slug>/`
- A spec é `.scratch/<feature-slug>/spec.md`
- Issues de implementação são um arquivo por ticket em `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numeradas a partir de `01`, nunca um único arquivo combinado de tickets
- O estado de triagem é registrado como uma linha `Status:` perto do topo de cada arquivo de issue (veja `triage-labels.md` para os textos dos papéis)
- Comentários e histórico de conversa são anexados ao final do arquivo sob um cabeçalho `## Comentários`

## Quando uma skill disser "publicar no rastreador de issues"

Crie um novo arquivo sob `.scratch/<feature-slug>/` (criando o diretório se necessário).

## Quando uma skill disser "buscar o ticket relevante"

Leia o arquivo no caminho referenciado. Normalmente o usuário passa o caminho ou o número da issue diretamente.

## Operações de wayfinding

Usadas pelo `/wayfinder`. O **mapa** é um arquivo com um arquivo **filho** por ticket.

- **Mapa**: `.scratch/<esforço>/map.md` (o corpo de Notas / Decisões-tomadas / Névoa).
- **Ticket filho**: `.scratch/<esforço>/issues/NN-<slug>.md`, numerados a partir de `01`, com a pergunta no corpo. Uma linha `Type:` registra o tipo do ticket (`research`/`prototype`/`grilling`/`task`); uma linha `Status:` registra `claimed`/`resolved`.
- **Bloqueio**: uma linha `Blocked by: NN, NN` perto do topo. Um ticket está desbloqueado quando todos os arquivos que ele lista estão `resolved`.
- **Fronteira**: varra `.scratch/<esforço>/issues/` por arquivos abertos, desbloqueados e não reivindicados; o menor número vence.
- **Reivindicar (Claim)**: defina `Status: claimed` e salve antes de qualquer trabalho.
- **Resolver (Resolve)**: anexe a resposta sob um cabeçalho `## Resposta`, defina `Status: resolved` e então anexe um ponteiro de contexto (resumo + link) às Decisões-tomadas do mapa em `map.md`.
