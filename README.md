# LGR e projeto de controladores (DCA-3701 UFRN)

Aplicativo para celular em React/TypeScript, com cálculos locais no navegador. A primeira unidade mantém os 12 passos do Lugar Geométrico das Raízes. A segunda projeta PD, PI, PID com zeros reais iguais e controladores de primeira ordem a/(s+b) e confere a resposta completa de malha fechada.

## Segunda unidade

- Seleção das duas listas da segunda unidade, com quatro e duas questões, além de entrada manual de G(s), H(s) e especificações.
- Especificações por Mp e tempo de acomodação, ζ e ωn ou polo complexo desejado.
- Escolha entre passos essenciais e memória completa, com parcelas dos ângulos, distâncias, substituições e ganhos Kp, Ki e Kd ou parâmetros a e b.
- LGR compensado, todos os polos de malha fechada e resposta ao degrau unitário.
- Validação de Mp e acomodação em 2% ou 5%, com ajuste manual do fator de frequência.
- Discretização de Gc(s) ou Gc(s)G(s)H(s) por forward, backward e Tustin, com função em z e verificação dos polos discretos.
- Impressão da resolução atual no formato das entregas, com enunciado, cálculos, polos, requisitos e gráfico vetorial, independente dos passos abertos na tela. Ctrl+P usa o projeto atual.
- Botão para imprimir a lista selecionada em A4. A segunda lista inclui Tustin com T = 2 s na questão 1 e Euler forward com T = 1 s na questão 2.
- A resolução atual pode incluir a configuração de discretização escolhida, com método, período e alvo editáveis. O projeto inicial da questão 1 da segunda lista não atende Mp e acomodação; a tela e a impressão indicam essa reprovação.

Consulte [as convenções e limites dos cálculos](docs/segunda-unidade.md).
Veja também a [comparação executada com os dois projetos Python](docs/comparacao-referencias.md).

Veja a [verificação numérica da segunda lista](docs/verificacao-lista2.md).

A [resolução da primeira lista em PDF](entregas/lista_2a_unidade_Eugenio_Santo.pdf) contém as quatro questões com cálculos e verificação do enunciado. O [guia de geração](entregas/README.md) explica o ajuste da questão 1 e como reproduzir o documento.

A [entrega da segunda lista](entregas/lista2_2a_unidade_Eugenio_Santo.pdf) tem seis páginas com PID, controlador a/(s+b), Tustin e Euler forward. Inclui a reprovação do PID inicial nos limites do item 1a. Para reproduzir, execute `python scripts/gerar-pdf-lista2.py` com as dependências indicadas no guia.

## Rodar no celular (mesma rede)

```bash
npm install
npm run dev -- --host
# abra no celular o IP impresso, ex. http://192.168.0.10:5173
```

PWA: instalável como app (standalone, offline após 1º acesso).

## 12 passos implementados (`src/lib/lgr/`)

1. `1+G(s)H(s)=1+K·P(s)`, em `fazerPasso1`
2. Forma fatorada N/D
3. Polos/zeros (Durand-Kerner) + plot
4. Segmentos eixo real (regra ímpar)
5. `Ls=max(np,nz)`
6. Simetria eixo real
7. Assíntotas `σa`, `φa`
8. Breakaway `dK/ds=0`
9. Cruzamento jw (`Re_D·Im_N-Im_D·Re_N=0`) mais Routh numérico, sem sympy
10. Ângulos partida/chegada
11. Critério ângulo em s0
12. K em s0 (módulo)

Exemplos da lista em `src/lib/examples.ts` (Q1 a Q5 lidos via render PNG, pois `markitdown` não OCRiza equações-imagem).

## Scripts

```bash
npm run dev      # dev + host p/ celular
npm test         # vitest (core numérico)
npm run lint     # oxlint
npm run typecheck # tsc -b, obrigatório para validar tipos
npm run build    # tsc + vite build (PWA)
```
