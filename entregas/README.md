# Resolução da lista da segunda unidade

[PDF das quatro questões](lista_2a_unidade_Eugenio_Santo.pdf), em oito páginas A4. Cada questão contém os dados do enunciado, polo de projeto, critérios de ângulo e módulo, controlador final, malha fechada, polos e verificação das exigências com a resposta ao degrau.

A fonte é a [lista fornecida](../../lista.pdf), na pasta que contém os três projetos. Os cálculos saem do mesmo núcleo TypeScript usado pelo app. A questão 1 utiliza ajuste manual do fator de frequência para **1,10**, pois o projeto inicial excede o limite de 4 s. O PDF explica o ajuste. As questões 2, 3 e 4 mantêm os dados dos respectivos exemplos do app, incluindo `H = 0,4` e faixa de 2% na questão 4. A questão 3 apresenta também o polo adicional −3, a redução do fator comum e o salto inicial da saída.

Para gerar novamente, com as dependências Node do projeto instaladas e Python com `matplotlib`, `numpy` e `scipy`:

```bash
python scripts/gerar-pdf-lista.py
```

O script exporta os resultados do app, verifica as curvas completas e suas métricas com SciPy e grava o PDF e `lista-2a-unidade-resolvida.dados.json`. Os dados preservam a precisão numérica completa, as 4001 amostras de cada resposta e o projeto inicial da questão 1. O documento arredonda os valores para leitura.

Aluno indicado no documento: Eugenio Lopes, conforme a autoria do app. A matrícula foi omitida porque não foi informada.

## Impressão pelo aplicativo

Na segunda unidade, **Imprimir resolução / salvar PDF** gera um documento A4 do projeto atual com o mesmo formato destas entregas. Inclui o pedido, cálculos de ângulo e módulo, ganhos, malha fechada, todos os polos, gráfico vetorial e apenas os requisitos informados. Não depende do detalhamento selecionado nem dos passos abertos. Um requisito não atendido continua marcado como não atendido na impressão. Dados alterados são identificados como projeto manual.

**Imprimir lista completa / salvar PDF** resolve as quatro questões fornecidas e prepara oito páginas, com fator de frequência 1,10 na questão 1 e a justificativa do ajuste. Essa opção usa o mesmo cálculo compartilhado com `scripts/exportar-lista.mjs`; não altera os campos do projeto atual. Ctrl+P imprime a resolução atual. A primeira unidade mantém a impressão de seus passos.

Os relatórios usam degrau unitário de 0 a 20 s e 4001 amostras, como o PDF das entregas, independentemente do horizonte escolhido para explorar o gráfico na tela. Não incluem a discretização, pois ela não é pedida nas quatro questões desta lista.
