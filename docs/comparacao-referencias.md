# Comparação executada com os projetos de referência

Os quatro projetos de controladores foram executados com as mesmas entradas do PDF de 2026.2. Ganhos, zeros, polos e respostas do TypeScript coincidiram com os cálculos dos projetos Python dentro das tolerâncias indicadas abaixo.

## O que foi executado

- O código atual de `src/lib/controladores`, sem usar valores copiados dos testes.
- As funções reais de `controlador/lgr.py`, incluindo projeto, malha fechada, métricas e discretização.
- Os blocos reais de parsing, especificações, ângulo, módulo e discretização de `projeto-controladores/app.py`, extraídos por AST. As chamadas de apresentação Streamlit foram substituídas por uma interface sem saída; as contas e decisões do código original foram preservadas.

As interfaces Streamlit não foram iniciadas. A biblioteca `control`, usada na simulação do segundo projeto, não estava instalada no ambiente. Para comparar curvas, as funções de transferência produzidas por ambos os códigos foram simuladas com SciPy, em uma grade comum de 4001 pontos entre 0 e 20 s. Isso verifica as funções obtidas, sem afirmar que a apresentação ou `control.step_info` foram executados.

Versões usadas: NumPy 2.0.2, SciPy 1.15.2 e SymPy 1.14.0.

## Valores comuns aos três cálculos

| Questão |           z |          Kc |           Kp |           Ki |          Kd |
| ------- | ----------: | ----------: | -----------: | -----------: | ----------: |
| 1 · PD  | 8,659776085 | 0,030457748 |  0,263757278 |            0 | 0,030457748 |
| 2 · PD  | 2,038857143 |        7000 |        14272 |            0 |        7000 |
| 3 · PI  | 3,428571429 |           7 |            7 |           24 |           0 |
| 4 · PID | 2,048997302 | 3,135959580 | 12,851145437 | 13,165981161 | 3,135959580 |

O maior erro absoluto em Kc foi inferior a 1,4 × 10⁻¹¹. Todos os polos calculados no app ficaram a menos de 10⁻⁷ dos polos das funções de transferência obtidas em cada referência. As amostras das respostas diferiram por menos de 6 × 10⁻¹¹.

Também foram conferidas 48 discretizações: quatro questões, períodos de 0,5, 1 e 2 s, métodos forward e Tustin, e alvos Gc(s) ou Gc(s)G(s)H(s). As funções discretas foram avaliadas em três pontos complexos e coincidiram com ambos os projetos, com tolerâncias absoluta e relativa de 10⁻⁸. A comparação por valores da função admite fatores cancelados pelo SymPy, mesmo quando os vetores de coeficientes têm graus diferentes. Backward não está implementado nas referências e permanece coberto pelos testes analíticos do app.

## Diferenças nas métricas

| Questão | Mp do app | Mp nativo de `controlador` | ts de 2% do app | ts de 2% da referência | ts de 5% do app | ts de 5% da referência |
| ------- | --------: | -------------------------: | --------------: | ---------------------: | --------------: | ---------------------: |
| 1       | 9,180371% |                  9,180371% |         4,700 s |                4,695 s |         4,135 s |                4,130 s |
| 2       | 4,775768% |                  4,775768% |        11,455 s |               11,450 s |         5,240 s |                5,235 s |
| 3       |      600% |                 30,147171% |         1,145 s |                1,140 s |         1,070 s |                1,065 s |
| 4       | 5,434472% |                  5,434472% |         4,645 s |                4,640 s |         2,295 s |                2,290 s |

A diferença de 0,005 s é uma amostra da grade usada nesta comparação. O app retorna a primeira amostra dentro da faixa depois da última saída; `controlador` retorna a última amostra fora da faixa. Quando as curvas Python são medidas pela mesma convenção do app, os resultados coincidem.

Na questão 3, a saída começa em 35 e termina em 5. O app mede o pico relativo ao valor final e inclui o salto em 0⁺, resultando em `(35−5)/5 × 100 = 600%`. `controlador` ignora o salto e, no ramo que começa acima do regime, mede o mínimo depois do primeiro cruzamento. Seus 30,147171% descrevem o vale abaixo de 5. As curvas são iguais; a definição do indicador é diferente. A questão 3 não impõe um limite de Mp.

Os valores finais foram 1; 5,7088; 5; e 2,5, respectivamente. H(s)=1 não garante sozinho saída final igual a 1, como mostra a questão 2, que usa PD sem ação integral.

## Padrões divergentes no segundo projeto

O template original da questão 4 em `projeto-controladores/app.py` usa H(s)=0,5 e inicia o seletor de acomodação em 5%. O PDF atual exige H(s)=0,4 e 2%. Executando os padrões originais, o código produz:

- Polo desejado de aproximadamente −0,6 + 1,171188759j.
- z = 3,296176668.
- Kc = 0,554278060.

Esses resultados não devem ser usados como referência da questão 4 do PDF atual. Ao informar H(s)=0,4 e a faixa de 2%, o mesmo código produz os valores da tabela principal.

A etapa gráfica desse projeto também desenha as faixas em torno de 1, mesmo quando o valor final é diferente, e não passa a faixa escolhida na chamada a `control.step_info`. Essas linhas de apresentação não foram usadas para aprovar os resultados do app.

## Como repetir

Na pasta `lgr-projeto-controle`, com as dependências npm instaladas e Python com NumPy, SciPy e SymPy disponíveis:

```bash
python scripts/verificar-referencias.py > comparacao.json
```

O script executa o núcleo TypeScript pelo loader de validação, lê o código dos dois projetos irmãos e interrompe a execução se os valores ultrapassarem as tolerâncias. Também aceita um arquivo JSON previamente exportado:

```bash
node scripts/exportar-referencias.mjs > resultados-app.json
python scripts/verificar-referencias.py resultados-app.json > comparacao.json
```

A suíte original de `controlador` também foi executada: os 11 testes passaram. A suíte do app passou nos 46 testes numéricos. Os projetos de referência foram mantidos sem alterações de código.
