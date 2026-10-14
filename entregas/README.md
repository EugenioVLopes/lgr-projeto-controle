# Entregas da segunda unidade

[PDF das quatro questões](lista_2a_unidade_Eugenio_Santo.pdf), em oito páginas A4. Cada questão contém os dados do enunciado, polo de projeto, critérios de ângulo e módulo, controlador final, malha fechada, polos e verificação das exigências com a resposta ao degrau.

A fonte é a [lista fornecida](../../lista.pdf), na pasta que contém os três projetos. Os cálculos saem do mesmo núcleo TypeScript usado pelo app. A questão 1 preserva o fator de frequência **1** dos dados do exemplo. A simulação resulta em acomodação de 5% de **4,135 s**, acima do limite de 4 s; o PDF indica esse requisito como não atendido, sem alterar o projeto automaticamente. As questões 2, 3 e 4 mantêm os dados dos respectivos exemplos do app, incluindo `H = 0,4` e faixa de 2% na questão 4. A questão 3 apresenta também o polo adicional −3, a redução do fator comum e o salto inicial da saída.

Para gerar novamente, com as dependências Node do projeto instaladas e Python com `matplotlib`, `numpy` e `scipy`:

```bash
python scripts/gerar-pdf-lista.py
```

O script exporta os resultados do app, verifica as curvas completas e suas métricas com SciPy e grava o PDF e `lista-2a-unidade-resolvida.dados.json`. Os dados preservam a precisão numérica completa, as 4001 amostras de cada resposta e a avaliação dos requisitos. O documento arredonda os valores para leitura.

Aluno indicado no documento: Eugenio Lopes, conforme a autoria do app. A matrícula foi omitida porque não foi informada.

## Segunda lista

[PDF da lista 2](lista2_2a_unidade_Eugenio_Santo.pdf), em seis páginas A4. A fonte é [lista2.pdf](../docs/lista2.pdf). Cada questão ocupa três páginas, com projeto contínuo, validação pela malha completa e discretização.

A questão 1 apresenta o PID com zeros iguais e sua aproximação por Tustin, com T = 2 s. O projeto inicial do app resulta em Mp ≈ 169,52% e acomodação de 5% de 3,245 s, portanto **não atende ao item a**. O documento mostra os dois resultados não atendidos e o salto inicial da saída. A discretização corresponde a esse PID calculado; o PDF não apresenta esse projeto como uma solução que cumpre os limites.

A questão 2 encontra a = 7995/2104 e b = 738/263, verifica todos os polos e discretiza a malha aberta completa por Euler forward, com T = 1 s. O método está identificado, pois o enunciado diz apenas "Euler" e apresenta também a fórmula backward. A estabilidade indicada após a discretização é da malha aberta, sem fechar uma malha digital.

Para gerar novamente, use Python com `matplotlib`, `numpy`, `scipy` e `sympy`, além de Node e das dependências do projeto:

```bash
python scripts/gerar-pdf-lista2.py
```

O gerador exporta a segunda lista do mesmo núcleo do app, compara as duas curvas e suas métricas com SciPy e confere as discretizações e os parâmetros a e b com SymPy. O arquivo [lista2-2a-unidade.dados.json](lista2-2a-unidade.dados.json) preserva os coeficientes, as 4001 amostras de cada resposta, os requisitos e a conferência independente. A revisão do PDF inclui limites das páginas e sobreposição dos textos. As fórmulas e os gráficos são vetoriais, com texto selecionável.

## Impressão pelo aplicativo

Na segunda unidade, **Imprimir resolução / salvar PDF** gera um documento A4 do projeto atual com o mesmo formato destas entregas. Inclui o pedido, cálculos de ângulo e módulo, ganhos, malha fechada, todos os polos, gráfico vetorial e apenas os requisitos informados. Não depende do detalhamento selecionado nem dos passos abertos. Um requisito não atendido continua marcado como não atendido na impressão. Dados alterados são identificados como projeto manual.

**Imprimir lista completa / salvar PDF** usa a lista selecionada. A primeira lista prepara oito páginas com os dados originais dos exemplos e indica o limite de acomodação não atendido na questão 1. A segunda prepara seis páginas, incluindo as discretizações e os requisitos não atendidos. Essa opção usa o mesmo cálculo compartilhado com `scripts/exportar-lista.mjs`; não altera os campos do projeto atual. Ctrl+P imprime a resolução atual. A primeira unidade mantém a impressão de seus passos.

Os relatórios usam degrau unitário de 0 a 20 s e 4001 amostras, como os PDFs das entregas, independentemente do horizonte escolhido para explorar o gráfico na tela. A primeira lista não pede discretização. Os exemplos da segunda ativam **Incluir discretização na impressão**, e a resolução atual permite editar alvo, método e período.

Os critérios de ângulo e módulo usam θ/φ para os ângulos e A/B para as distâncias, com índice c para o controlador. Os PDFs agrupam parcelas iguais e mostram o ganho pelo produto das distâncias. As contas intermediárias com arco-tangente e raiz quadrada estão disponíveis na memória completa do aplicativo.
