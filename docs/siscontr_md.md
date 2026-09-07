UNIVERSIDADE FEDERAL DO RIO GRANDE DO NORTE
CENTRO DE TECNOLOGIA
DEPT°. DE ENGENHARIA DE COMPUTAÇÃO E AUTOMAÇÃO
SSIISSTTEEMMAASS
DDEE
CCOONNTTRROOLLEE
Prof. Fábio Meneghetti Ugulino de Araújo Fevereiro de 2007 Natal - RN

ÍÍnnddiiccee
1 PROBLEMA DE CONTROLE ___________________________________________________ 1
1.1 DEFINIÇÕES__________________________________________________________________ 1
• Planta____________________________________________________________________ 1
• Processo__________________________________________________________________ 1
• Sistema___________________________________________________________________ 1
• Sistema Físico _____________________________________________________________ 1
• Especificações de Desempenho ________________________________________________ 1
• Modelo___________________________________________________________________ 1
• Controle__________________________________________________________________ 1
• Controlador _______________________________________________________________ 1
• Sistema de Controle_________________________________________________________ 1
• Sistema de Controle em Malha Aberta___________________________________________ 2
• Sistema de Controle em Malha Fechada_________________________________________ 2
1.2 EXEMPLOS___________________________________________________________________ 2
1.3 FORMULAÇÃO GERAL DO PROBLEMA DE CONTROLE___________________________________ 3
2 MÉTODO DO LUGAR GEOMÉTRICO DAS RAÍZES (LGR)_________________________ 4
2.1 INTRODUÇÃO_________________________________________________________________ 4
2.2 PASSOS PARA A CONSTRUÇÃO DO LGR_____________________________________________ 6
• Exemplo 1: Sistema com 2 pólos e 1 zero reais____________________________________ 7
• Exemplo 2: Sistema com 4 pólos e 1 zero reais____________________________________ 8
• Exemplo 3: Sistema com 2 pólos reais e 2 pólos complexos _________________________ 10
2.3 LGR PARA FUNÇÕES DE TRANSFERÊNCIA TÍPICAS ___________________________________ 12
2.4 LOCALIZANDO RAÍZES NO LGR__________________________________________________ 16
• Exemplo: Teste de localização de raízes para um sistema de segunda ordem ___________ 17
2.5 EXERCÍCIOS_________________________________________________________________ 18
3 AÇÕES DE CONTROLE BÁSICAS______________________________________________ 19
3.1 INTRODUÇÃO________________________________________________________________ 19
• Controladores Série________________________________________________________ 19
• Controladores por Realimentação_____________________________________________ 19
3.2 AÇÕES PROPORCIONAL, INTEGRAL E DERIVATIVA (P-I-D) _____________________________ 20
• Controle Proporcional (P)___________________________________________________ 20
• Controlador Proporcional + Integral (PI)_______________________________________ 21
• Controlador Proporcional + Derivativo (PD)____________________________________ 22
• Controlador Proporcional + Integral + Derivativo (PID) __________________________ 23
3.3 AÇÕES DE CONTROLE AVANÇO-ATRASO___________________________________________ 23
• Controlador Avanço de Fase (Lead) ___________________________________________ 23
• Controlador Atraso de Fase(Lag) _____________________________________________ 24
• Controlador Avanço-Atraso de Fase(Lead-Lag)__________________________________ 24
3.4 MODIFICAÇÕES DAS AÇÕES DE CONTROLE PID______________________________________ 25
• PID Original _____________________________________________________________ 25
• Parte Derivativa -Filtro_____________________________________________________ 25
• PI-D ____________________________________________________________________ 25
• I-PD ____________________________________________________________________ 25
3.5 EXERCÍCIOS_________________________________________________________________ 26
4 PROJETO DE CONTROLADORES PELO MÉTODO DO LGR______________________ 27
4.1 ESPECIFICAÇÕES DE DESEMPENHO________________________________________________ 27
4.2 PROJETO DE CONTROLADORES PD________________________________________________ 28
• Passos para o projeto de controladores PD _____________________________________ 28
4.3 PROJETO DE CONTROLADORES PI ________________________________________________ 30
• Passos para o projeto de controladores PI ______________________________________ 30
4.4 PROJETO DE CONTROLADORES PID_______________________________________________ 32
• Passos para o projeto de controladores PID_____________________________________ 32
Sistemas de Controle i

4.4.1 Regras de Zigler-Nichols para o Ajuste dos Parâmetros do PID___________________ 33
• Primeiro Método de Ziegler-Nichols___________________________________________ 34
• Segundo Método de Ziegler-Nichols ___________________________________________ 37
4.5 PROJETO DE CONTROLADORES AVANÇO DE FASE ____________________________________ 40
• Passos para o projeto de controladores Avanço de Fase ___________________________ 40
4.6 PROJETO DE CONTROLADORES ATRASO DE FASE_____________________________________ 42
• Passos para o projeto de controladores Atraso de Fase____________________________ 42
4.7 PROJETO DE CONTROLADORES ATRASO-AVANÇO DE FASE_____________________________ 44
• Passos para o projeto de controladores atraso-avanço_____________________________ 44
4.8 EXERCÍCIOS_________________________________________________________________ 49
5 APROXIMAÇÃO DISCRETA DE FUNÇÕES DE TRANSF. CONTÍNUAS_____________ 50
5.1 INTRODUÇÃO________________________________________________________________ 50
5.2 APROXIMAÇÕES POR INTEGRAÇÃO NUMÉRICA ______________________________________ 50
• Método de Euler ou Forward_________________________________________________ 50
• Método Backward _________________________________________________________ 51
• Método Trapezoidal, Tustim ou Aproximação Bilinear_____________________________ 52
5.3 INVARIÂNCIA AO DEGRAU______________________________________________________ 52
5.4 EXERCÍCIOS_________________________________________________________________ 53
6 IMPLEMENTAÇÃO DE CONTROLADORES DIGITAIS___________________________ 54
6.1 INTRODUÇÃO________________________________________________________________ 54
6.2 PRÉ-FILTRAGEM E ATRASO COMPUTACIONAL_______________________________________ 54
• Pré-Filtragem_____________________________________________________________ 54
• Atraso Computacional______________________________________________________ 55
6.3 ATUADORES NÃO-LINEARES____________________________________________________ 56
6.4 ASPECTOS OPERACIONAIS______________________________________________________ 56
6.5 MUDANÇAS DE PARÂMETROS ___________________________________________________ 57
6.6 ASPECTOS NUMÉRICOS ________________________________________________________ 59
6.7 PROJETO DE CONTROLADORES DIGITAIS___________________________________________ 60
6.7.1 Controladores Deadbeat__________________________________________________ 60
7 PROJETO DE SISTEMAS DE CONTROLE USANDO O ESPAÇO DE ESTADOS______ 63
7.1 DESCRIÇÃO POR VARIÁVEIS DE ESTADO ___________________________________________ 63
7.2 SOLUÇÃO DA EQUAÇÃO DE ESTADO ______________________________________________ 64
• Caso Escalar _____________________________________________________________ 64
• Caso Vetorial_____________________________________________________________ 64
7.3 ESTABILIDADE_______________________________________________________________ 64
7.4 CONTROLABILIDADE __________________________________________________________ 65
7.5 OBSERVABILIDADE ___________________________________________________________ 66
7.6 REALIZAÇÕES DE FUNÇÕES DE TRANSFERÊNCIA_____________________________________ 66
7.6.1 Realização na Forma Canônica Observável___________________________________ 67
7.6.2 Realização na Forma Canônica Controlável __________________________________ 67
7.7 REALIMENTAÇÃO DE ESTADO ___________________________________________________ 68
• Fórmula de Ackermann para Determinação da Matriz de Ganhos K__________________ 69
7.8 OBSERVADORES DE ESTADO ____________________________________________________ 71
• Erro de Estimação _________________________________________________________ 71
• Fórmula de Ackermann para Determinação da Matriz de Ganhos do Observador L _____ 72
7.9 REALIMENTAÇÃO DE ESTADOS OBSERVADOS _______________________________________ 74
7.10 SEGUIDORES DE REFERÊNCIA (OU SERVOSISTEMAS)________________________________ 77
• Princípio do modelo interno para referência do tipo degrau unitário_________________ 77
• Princípio do modelo interno para referência do tipo rampa unitária__________________ 80
7.11 DESCRIÇÃO POR VARIÁVEIS DE ESTADO DE SISTEMAS DISCRETOS NO TEMPO____________ 81
7.11.1 Discretização da Equação de Estado______________________________________ 82
7.12 SOLUÇÃO DA EQUAÇÃO DE ESTADO DE SISTEMAS DISCRETOS NO TEMPO _______________ 84
7.13 ESTABILIDADE DE SISTEMAS DISCRETOS NO TEMPO________________________________ 84
7.14 CONTROLABILIDADE DE SISTEMAS DISCRETOS NO TEMPO___________________________ 84
7.15 OBSERVABILIDADE DE SISTEMAS DISCRETOS NO TEMPO ____________________________ 85
7.16 REALIMENTAÇÃO DE ESTADOS DE SISTEMAS DISCRETOS NO TEMPO ___________________ 85
7.17 OBSERVADORES DE ESTADO DE SISTEMAS DISCRETOS NO TEMPO _____________________ 85
7.18 SEGUIDOR DE REFERÊNCIA PARA SISTEMAS DISCRETOS NO TEMPO ____________________ 86
ii Sistemas de Controle

• 86
Entrada do Tipo Degrau ____________________________________________________
7.19 EXERCÍCIOS_______________________________________________________________ 87

| 8                                                                                  |     | 90  |
| ---------------------------------------------------------------------------------- | --- | --- |
| INTRODUÇÃO AOS SISTEMAS DE CONTROLE ÓTIMO _________________________                |
| 8.1 CONTROLE ÓTIMO QUADRÁTICO_________________________________________________ 90  |
| 8.2                                                                                |     | 93  |
| ----                                                                               | --- | --- |
| CONTROLE ÓTIMO QUADRÁTICO DISCRETO ________________________________________        |
| • Equação de Riccati de Regime Permanente______________________________________ 94 |
| 96                                                                                 |
| REFERÊNCIAS____________________________________________________________________    |

| Sistemas de Controle |     | iii |
| -------------------- | --- | --- |

AAggrraaddeecciimmeennttooss
Agradecemos ao Prof. Dr. André Laurindo Maitelli
(<www.dca.ufrn.br/~maitelli>) por ter, gentilmente, cedido o material
didático que serviu de fonte para elaboração deste texto. Agradecemos
ainda, a todos os demais professores do Departamento de Engenharia
de Computação e Automação (DCA / UFRN) que, de alguma forma,
também contribuíram com o conteúdo deste material. Por fim, agradecemos
a todos os alunos que têm contribuído para o aprimoramento deste texto
com suas importantes sugestões.
iv Sistemas de Controle

1 PROBLEMA DE CONTROLE
O objetivo principal do estudo dos sistemas de controle e resolver o que se costuma
denominar por “Problema de Controle”. Para que se possa apresentar uma formulação geral
do que seja o problema de controle, são necessárias algumas definições iniciais.
1.1 Definições
• Planta
É uma parte de um equipamento ou instalação industrial, eventualmente um conjunto de
itens de uma máquina que funcionam juntos, cuja finalidade é desempenhar uma dada
operação.
• Processo
Pode ser definido como uma operação ou desenvolvimento natural que evolui
progressivamente, caracterizado por uma série de mudanças graduais que se sucedem de
modo relativamente fixo, conduzindo a um resultado ou finalidade particular.
• Sistema
É uma disposição, conjunto ou coleção de partes, dentro de um universo, que estão
conectadas ou relacionadas de tal maneira a formarem um todo.
• Sistema Físico
É uma parte do universo que foi delimitada para estudo.
• Especificações de Desempenho
São descrições do comportamento a ser apresentado pelo sistema físico, conforme
solicitação do usuário.
• Modelo
Consiste na representação de certas características do sistema físico que são relevantes
para seu estudo.
• Controle
É a ação de fazer com que um sistema físico atenda as especificações de desempenho
determinadas a priori.
• Controlador
Dispositivo utilizado para a obtenção do controle de um sistema físico.
• Sistema de Controle
Conjunto formado pelo sistema a ser controlado e o controlador.
Sistemas de Controle 1

• Sistema de Controle em Malha Aberta
É aquele em que a saída ou resposta não possui nenhuma influência sobre a entrada.
Sinal de Controle

|                       |                           | Resposta Desejada |     |             |     |        |                        | Saída |     |
| --------------------- | ------------------------- | ----------------- | --- | ----------- | --- | ------ | ---------------------- | ----- | --- |
| (Variável Manipulada) |
|                       | (Referência ou Set-Point) |                   |     |             | MV  |        | (Variável de Processo) |       |     |
| ---                   | ------------------------- | ---               | --- | ----------- | --- | ------ | ---------------------- | ---   | --- |
|                       |                           |                   |     | Controlador |     | Planta |                        | PV    |     |
| SP                    |

• Sistema de Controle em Malha Fechada
É aquele em que a saída ou resposta influencia a entrada do sistema.
Sinal de Controle
Saída

|     | Resposta Desejada         |     | Comparação |             | (Variável Manipulada) |        |     |                        |     |
| --- | ------------------------- | --- | ---------- | ----------- | --------------------- | ------ | --- | ---------------------- | --- |
|     | (Referência ou Set-Point) |     |            |             |                       |        |     | (Variável de Processo) |     |
|     |                           |     | +          |             |                       | MV     |     |                        |     |
|     |                           | SP  |            | Controlador |                       | Planta |     |                        | PV  |

-

Sensor +
Transmissor

1.2 Exemplos
Ser humano tentando pegar um objeto

|         |     | Posição do |       |     |     |     |     | Posição |     |
| ------- | --- | ---------- | ----- | --- | --- | --- | --- | ------- | --- |
|         |     |            | Olhos |     |     |     |     | da Mão  |     |
|         |     | Objeto     | +     |     |     |     |     |         |     |
| Braço   |
| Cérebro |
| e Mão   |

-

|     |     |     |     | Controlador |     | Sistema |     |     |     |
| --- | --- | --- | --- | ----------- | --- | ------- | --- | --- | --- |

Controle de temperatura de uma sala
Temperatura
Temperatura
Termostato

|              |     | Desejada |     |     |     |     |     | Ambiente |     |
| ------------ | --- | -------- | --- | --- | --- | --- | --- | -------- | --- |
|              |     |          | +   |     | Ar  |     |     |          |     |
| Sala         |
| Condicionado |

-

|     |     |     |     | Controlador |     | Sistema |     |     |     |
| --- | --- | --- | --- | ----------- | --- | ------- | --- | --- | --- |

Controle do nível de um reservatório

|     |     | Nivel |     |     |     |     |     | Nível de |     |
| --- | --- | ----- | --- | --- | --- | --- | --- | -------- | --- |

-

|     |     | Desejado |     |       |     |              |     | Água |     |
| --- | --- | -------- | --- | ----- | --- | ------------ | --- | ---- | --- |
|     |     |          |     | Bomba |     | Reservatório |     |      |     |

-

|      |     |     |     | Controlador |        | Sistema |     |                      |     |
| ---- | --- | --- | --- | ----------- | ------ | ------- | --- | -------------------- | --- |
| Bóia |
|      |     |     |     |             | Sensor |         |     |                      |     |
| ---  | --- | --- | --- | ---         | ------ | ---     | --- | -------------------- | --- |
| 2    |     |     |     |             |        |         |     | Sistemas de Controle |     |

1.3 Formulação Geral do Problema de Controle
Um problema de controle consiste em determinar uma forma de afetar um dado sistema
físico de modo que seu comportamento atenda às especificações de desempenho previamente
estabelecidas.
Como, normalmente, não é possível alterar a estrutura funcional do sistema físico em
questão, a satisfação das especificações de desempenho é atingida mediante o projeto e
implementação de controladores (compensadores).
U= Universo
Entradas Manipuladas
Sistema
u(t)
Físico
Entradas
Exógenas
w(t)
Meio
Ambiente
Saídas Observadas
y(t)
Saídas de Interesse
z(t)
Especificações de
Desempenho
||
Modelos Velocidade
|| Segurança
Quantitativos (Ex.: Modelos Matemáticos) Conforto
ou Custo
Durabilidade
Qualitativos (Ex.: Modelos em Escala)
.
.
.
Análise Projeto Implementação
Sistemas de Controle 3

2 MÉTODO DO LUGAR GEOMÉTRICO DAS RAÍZES (LGR)
2.1 Introdução
O diagrama do LGR consiste em um conjunto de curvas no plano complexo s, onde estas
curvas representam as posições admissíveis para os pólos de malha fechada de um dado
sistema quando o seu ganho varia de zero a infinito.
Considere o seguinte sistema:
R(s)+ C(s)

|     | G(s) |     |       | C(s) | G(s)       |
| --- | ---- | --- | ----- | ---- | ---------- |
|     |      |     | G (s) | = =  |            |
|     |      |     | MF    | R(s) | 1+G(s)H(s) |

-

Os pólos de malha fechada são as raízes do polinômio característico:
1 + G(s)H(s) = 0
⇓

|                                                                                  |            | G(s)H(s)= −1      |            |     |          |
| -------------------------------------------------------------------------------- | ---------- | ----------------- | ---------- | --- | -------- |
| Como G(s)H(s) representa uma quantidade complexa, a igualdade acima precisa ser  |
| desmembrada em duas equações, as quais nos fornecem as seguintes condição para a |
| localização dos pólos no plano s:                                                |
| Condição de Módulo:                                                              |
|                                                                                  |            | G(s)H(s) =1       |            |     |          |
| ---                                                                              | ---        | ------------      | ---        | --- | ---      |
| ( 2.1 )                                                                          |
| Condição de ângulo:                                                              |
|                                                                                  | ∠G(s)H(s)= | ± 180(2k +1) k    | = 0,1,...  |     | ( 2.2 )  |
| ---                                                                              | ---------- | ----------------- | ---------- | --- | -------- |
| Ponto de                                                                         |
|                                                                                  | Teste      | p                 | Im         |     |          |
| ---                                                                              | -----      | ---               | ---        | --- | ---      |
| 1                                                                                |
| s                                                                                |
| i                                                                                |
| z                                                                                |
|                                                                                  | 1          |                   | Re         |     |          |
| ---                                                                              | ---        | ---               | ---        | --- | ---      |
| p                                                                                |
| 2                                                                                |

| 4   |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | -------------------- | --- |

Ex:

| R(s)+ |     |             | K C(s) |     |     |      |       |     |     |
| ----- | --- | ----------- | ------ | --- | --- | ---- | ----- | --- | --- |
|       |     |             |        |     |     | C(s) | K     |     |     |
|       |     | s ( s + 4 ) |        |     |     | =    |       |     |     |
| s2    |
|       | -   |             |        |     |     | R(s) | +4s+K |     |     |
| ---   | --- | ---         | ---    | --- | --- | ---- | ----- | --- | --- |

Os pólos de malha fechada são as raízes da eq. característica ⇒ s2 +4s+K =0

|     |     |           |       |       | p = −2+ | 4−K     |     |     |     |
| --- | --- | --------- | ----- | ----- | -------- | ------- | --- | --- | --- |
|     |     | −4± 16−4K |       |       |  1      |         |     |     |     |
|     | s = |           | = −2± | 4−K  |          |         |     |     |     |
| 2   |
|    |
|     |     |           |       |       | p =      | −2− 4−K |     |     |     |
| --- | --- | ---       | ---   | ---   | ---      | ------- | --- | --- | --- |
|  2 |

Variando K temos a seguinte tabela de pólos de malha fechada:

|     |     | K   |                | p     |                | p   |     |     |     |
| --- | --- | --- | -------------- | ----- | -------------- | --- | --- | --- | --- |
|     |     |     |                | 1     |                | 2   |     |     |     |
|     |     | 0   |                | 0     |                | -4  |     |     |     |
|     |     | 1   |                | -0,27 | -3,73          |     |     |     |     |
|     |     | 2   |                | -0,59 | -3,41          |     |     |     |     |
|     |     | 4   |                | -2,00 | -2,00          |     |     |     |     |
|     |     | 5   | -2,00 + j 1,00 |       | -2,00 - j 1,00 |     |     |     |     |
|     |     | 8   | -2,00 + j 2,00 |       | -2,00 - j 2,00 |     |     |     |     |

Ponto de

|       | K → ∞ |       |       |     |            | G(s)H(s) | =1⇒       |      |     |
| ----- | ----- | ----- | ----- | --- | ---------- | -------- | --------- | ---- | --- |
|       |       | Im    | Teste |     |            |          |           |      |     |
| Im    |
| s     |
|       |       |       | i     |     |            |          |           |      |     |
| ---   | ---   | ---   | ---   | --- | ---        | ---      | ---       | ---  | --- |
| K     |
| =1    |
|       |       |       |       |     |            |          | A A       |      |     |
| ----- | ----- | ----- | ---   | --- | ---------- | ---      | --------- | ---- | --- |
|       |       |       |       |     |            |          | 1 2       |      |     |
| K = 0 |       | K = 0 |       |     |            |          |           |      |     |
| 1 1   |       | Re    |       |     |            |          |           |      |     |
| - -   |       |       |       |     |            |          |           |      |     |
| τ 2τ  |       |       | - 1   | - 1 | Re         |          |           |      |     |
| 1     | 1     |       | τ     | 2 τ |            |          |           |      |     |
|       |       |       | 1     | 1   |            |          | ± 180o(2k |      |     |
|       |       |       |       |     | ∠G(s)H(s)= |          |           | +1)⇒ |     |
|       | K → ∞ |       |       |     |            | θ        | +θ =180o  |      |     |

|                      |     |     |     |     |     |     | 1 2 |     |     |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sistemas de Controle |     |     |     |     |     |     |     |     | 5   |

2.2 Passos para a Construção do LGR

| 1. Escrever                                                           |          | o polinômio |     | característico |     | do  |     |                |     |     |      |
| --------------------------------------------------------------------- | -------- | ----------- | --- | -------------- | --- | --- | --- | -------------- | --- | --- | ---- |
| modo que o parâmetro de interesse (K) p.ex.: 1 + G(s)H(s) = 1 + KP(s) |
| apareça claramente:                                                   |
| n                                                                     |
|                                                                       |          |             |     |                |     |     |     |                |     | Z   | ( )  |
| ---                                                                   | ---      | ---         | --- | ---            | --- | --- | --- | ---            | --- | --- | ---- |
|                                                                       |          |             |     |                |     |     |     |                |     | ∏   | s+ z |
| i                                                                     |
| 2. Fatorar o polinômio P(s) em termos dos n                           |          |             |     |                |     |     |     |                |     |     |      |
| --------------------------------------------                          | -------- | ---         | --- | ---            | --- | --- | --- | -------------- | --- | --- | ---  |
|                                                                       |          |             |     |                |     | P   |     | 1+G(s)H(s)=1+K |     | i=1 |      |
| pólos e n                                                             | zeros.   |             |     |                |     |     |     |                |     | n   |      |
|                                                                       | Z        |             |     |                |     |     |     |                |     | ∏ P | ( )  |
| s+ p                                                                  |
| j                                                                     |
| j=1                                                                   |

3. Assinalar os pólos e zeros de malha aberta X = Pólos e O = Zeros.
   no plano s com os símbolos O LGR começa nos pólos e termina nos
   | correspondentes. |     |     |     |     |     |     | zeros. |     |     |     |     |
   | ---------------- | --- | --- | --- | --- | --- | --- | ------ | --- | --- | --- | --- |
4. Assinalar os segmentos do eixo real que são O LGR se situa à esquerda de um número
   | LGR. |     |     |     |     |     |     |     | ímpar de pólos e zeros |     |     |     |
   | ---- | --- | --- | --- | --- | --- | --- | --- | ---------------------- | --- | --- | --- |
5. Determinar o número de lugares separados, LS = n , quando np ≥ n ;
   |                                                                   |     |     |     |     |     |     |     | P                             |     |     | Z   |
   | ----------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- | --- |
   | LS (seguimentos de curva que compõe o n = Número de pólos finitos |
   | P                                                                 |
   | LGR).                                                             |     |     |     |     |     |     |     | n = Número de zeros finitos   |     |     |     |
   | -------                                                           | --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- | --- |
   | Z                                                                 |
6. O LGR é simétrico com relação ao eixo real Basta desenhar a parte acima do eixo real e
   | (eixo horizontal)                           |      |                 |        |                      |                |       |                             | depois espelhar o esboço. |             |     |         |
   | ------------------------------------------- | ---- | --------------- | ------ | -------------------- | -------------- | ----- | --------------------------- | ------------------------- | ----------- | --- | ------- |
   |                                             |      |                 |        |                      |                |       |                             | ∑(−p                      | )−∑(−z      |     |         |
   | )                                           |
   |                                             |      |                 |        |                      |                |       |                             |                           | j           |     | i       |
   | ------                                      | ---- | --------------- | ---    | ---                  | ---            | ----  | ---                         | ---                       | ---         | --- | ---     |
   | 7. (n                                       | - n  | ) seguimentos   |        | de                   | um             | LGR   |                             | σ =                       |             |     |         |
   | P                                           | Z    |                 |        |                      |                |       |                             | A                         |             |     |         |
   | n −n                                        |
   | prosseguem em direção aos zeros infinitos   |      |                 |        |                      |                |       |                             |                           | P           | z   |         |
   | ------------------------------------------  | ---  | ---             | ---    | ---                  | ---            | ---   | ---                         | ---                       | ---         | --- | ---     |
   | ao longo de assíntotas centralizadas em σ e |
   |                                             |      |                 |        |                      |                | A     |                             | ( 2q+1 )                  |             |     |         |
   | ---                                         | ---  | ---             | ---    | ---                  | ---            | ---   | ---                         | --------                  | ---         | --- | ---     |
   | ( )                                         |
   | com ângulos φ.                              |      |                 |        |                      |                |       | φ =                         | 180o,q                    | =0,1,2,..., |     | n −n −1 |
   | ---------------                             | ---  | ---             | ---    | ---                  | ---            | ---   | ---                         | ------                    | ----------- | --- | ------- |
   |                                             |      | A               |        |                      |                |       | A                           |                           |             |     | P z     |
   | n −n                                        |
   |                                             |      |                 |        |                      |                |       |                             | P z                       |             |     |         |
   | ---                                         | ---  | ---             | ---    | ---                  | ---            | ---   | ---                         | ---                       | ---         | --- | ---     |
   | 1º Fazer K = p(s);                          |
   | 8. Determinar                               |      | o ponto         |        | de saída             | (se existir)   |       |                             |                           |             |     |         |
   | -------------------                         | ---  | ---------       | ---    | ----------           | -------------- | ---   | --------------------------- | ---                       | ---         | --- | -----   |
   | sobre o eixo real.                          |      |                 |        |                      |                |       |                             |                           |             |     | dp(s)   |
   |                                             |      |                 |        |                      |                |       | 2º Determinar as raízes de  |                           |             |     | = 0.    |
   | ds                                          |
   | 9. Utilizando                               |      | o critério      |        | de Routh-Hurwirtz,   |                |       |                             |                           |             |     |         |
   | ---------------                             | ---  | ------------    | ---    | -------------------- | ---            | ---   | ---                         | ---                       | ---         | --- | ---     |
   | Ver critério de estabilidade de             |
   | determinar                                  |      | o               | ponto  | no qual              | o              | eixo  |                             |                           |             |     |         |
   | -----------                                 | ---  | ---             | ------ | ---------            | ---            | ----- | ---                         | ---                       | ---         | --- | ---     |
   | Routh-Hurwirtz.                             |
   | imaginário é cruzado (se isso ocorrer).     |
   | Ângulo de Partida = 180° - (∑θ) + (∑φ)      |
   |                                             |      |                 |        |                      |                |       |                             |                           |             |     | i j     |
   | ---                                         | ---  | ---             | ---    | ---                  | ---            | ---   | ---                         | ---                       | ---         | --- | ---     |
7. Usando a condição de ângulo, determinar o
   ângulo de partida para os pólos complexos e Ângulo de Chegada = 180° - (∑φ ) + (∑θ )
   i j
   | o ângulo                            |        | de                     | chegada | para | os  | zeros |     |                                      |     |     |     |
   | ----------------------------------- | ------ | ---------------------- | ------- | ---- | --- | ----- | --- | ------------------------------------ | --- | --- | --- |
   | onde:                               |
   | complexos.                          |
   |                                     |        |                        |         |      |     |       |     | θ = ângulos de vetores partindo dos  |     |     |     |
   | ---                                 | ---    | ---                    | ---     | ---  | --- | ---   | --- | ------------------------------------ | --- | --- | --- |
   | i                                   |
   | demais pólos até o pólo em questão. |
   | ∠ P(s)                              | = 180o | ±q360o em s = p ou z.  |         |      |     |       |     |                                      |     |     |     |
   | ------                              | ------ | ---------------------- | ---     | ---  | --- | ---   | --- | ------------------------------------ | --- | --- | --- |
   |                                     |        |                        |         |      | j   | i     |     | φ = ângulos de vetores partindo dos  |     |     |     |
   | j                                   |
   | demais zeros até o pólo em questão  |

| 6   |     |     |     |     |     |     |     |     | Sistemas de Controle |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | --- | --- |

• Exemplo 1: Sistema com 2 pólos e 1 zero reais

Considere o seguinte sistema:

|             | R(s)+ |     | s + 2 | C(s) |     |               |     |        |     |
| ----------- | ----- | --- | ----- | ---- | --- | ------------- | --- | ------ | --- |
|             |       | K   |       |      |     |               |     | K(s+2) |     |
|             |       |     |       |      |     | 1+G(s)H(s)=1+ |     |        |     |
| s ( s + 4 ) |
|             | -     |     |       |      |     |               |     | s2 +4s |     |
| ---         | ---   | --- | ---   | ---  | --- | ---           | --- | ------ | --- |

| 1. Escrever                                                  | o        | polinômio | característico | do  |             |       |                      |     |     |
| ------------------------------------------------------------ | -------- | --------- | -------------- | --- | ----------- | ----- | -------------------- | --- | --- |
| K(s+2)                                                       |
| modo que o parâmetro de interesse (K) 1+G(s)H(s)=1+ =1+KP(s) |
| s2                                                           |
| +4s                                                          |
| apareça claramente:                                          |
| K(s+2)                                                       |
|                                                              |          |           |                |     | 1+G(s)H(s)= |       |                      | ⇒   |     |
| ---                                                          | ---      | ---       | ---            | --- | ----------- | ---   | ---                  | --- | --- |
| s2                                                           |
| 2. Fatorar o polinômio P(s) em termos dos n                  |          |           |                |     |             |       | +4s                  |     |     |
| --------------------------------------------                 | -------- | ---       | ---            | --- | ------      | ----- | -------------------- | --- | --- |
|                                                              |          |           |                | P   |             |       |                      |     |     |
| pólos e n                                                    | zeros.   |           |                |     |             | (s+2) |                      |     |     |
|                                                              | Z        |           |                |     | ⇒ P(s)      | =     | ( forma fatorada     |     | )   |
| s(s+4)                                                       |
| Lugar Geométrico das Raízes                                  |
| Im                                                           |
|                                                              |          |           |                |     |             | (LGR) |                      |     | 0.2 |
| ---                                                          | ---      | ---       | ---            | --- | ---         | ----- | ---                  | --- | --- |

3. Assinalar os pólos e zeros de malha aberta
   | no                                           | plano   | s com       | os símbolos |      |                 |          |            |     |      |
   | -------------------------------------------- | ------- | ----------- | ----------- | ---- | --------------- | -------- | ---------- | --- | ---- |
   | correspondentes:                             |         |             |             |      |                 |          |            |     | 0.1  |
   |                                              |         |             |             |      |                 |          |            |     | Re   |
   | 0                                            |
   |                                              |         |             |             | -5   | -4              | -3       | -2         | -1  |      |
   | ---                                          | ---     | ---         | ---         | ---  | ---             | ---      | ---        | --- | ---  |
   | X = Pólos e O = Zeros.                       |
   | O LGR                                        | começa  | nos pólos   | e termina   | nos  |                 |          |            |     | -0.1 |
   | -------                                      | ------- | ----------- | ----------- | ---- | ---             | ---      | ---        | --- | ---- |
   | zeros.                                       |
   | -0.2                                         |
   | Lugar Geométrico das Raízes                  |
   | Im                                           |
   |                                              |         |             |             |      |                 | (LGR)    |            |     | 0.2  |
   | ---                                          | ---     | ---         | ---         | ---  | ---             | -----    | ---        | --- | ---  |
   | Total de                                     |
   | 4. Assinalar os segmentos do eixo real que   |         |             |             |      | 2 pólos e zeros |          |            |     |      |
   | -------------------------------------------- | ---     | ---         | ---         | ---  | --------------- | -------- | ---        | --- | ---  |
   |                                              |         |             |             |      |                 | (nº Par) |            |     | 0.1  |
   | são LGR.                                     |
   |                                              |         |             |             |      |                 |          |            |     | Re   |
   | ---                                          | ---     | ---         | ---         | ---  | ---             | ---      | ---        | --- | ---  |
   | 0                                            |
   |                                              |         |             |             | -5   | -4              | -3       | -2         | -1  |      |
   | ---                                          | ---     | ---         | ---         | ---  | ---             | ---      | ---        | --- | ---  |
   | O LGR se situa à esquerda de um número       |
   | ímpar de pólos e zeros.                      |
   |                                              |         |             |             |      | Total de        |          |            |     | -0.1 |
   | ---                                          | ---     | ---         | ---         | ---  | --------        | ---      | ---        | --- | ---- |
   | Total de                                     |
   | 3 pólos e zeros                              |
   | 1 pólos e zeros                              |
   | (nº Impar)                                   |
   |                                              |         |             |             |      |                 |          | (nº Impar) |     | -0.2 |
   | ---                                          | ---     | ---         | ---         | ---  | ---             | ---      | ---------- | --- | ---- |

| Sistemas de Controle |     |     |     |     |     |     |     |     | 7   |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

• Exemplo 2: Sistema com 4 pólos e 1 zero reais
Considere agora o seguinte sistema:

| R(s)+               |     | K   |     | C(s) |     |     |           |             |
| ------------------- | --- | --- | --- | ---- | --- | --- | --------- | ----------- |
| ( s + 2 ) ( s + 4 ) |
|                     | -   |     |     |      |     |     | K(s+1)    |             |
| ---                 | --- | --- | --- | ---  | --- | --- | ------    | ---         |
| 1+G(s)H(s)=1+       |
|                     |     |     |     |      |     |     | s4 +10 s3 | +32 s2 +32s |
| ---                 | --- | --- | --- | ---  | --- | --- | --------- | ----------- |
| ( s + 1 )           |
| s ( s + 4 )         |

| 1. Escrever                                  | o polinômio | característico |        | do         |              |              |        |             |
| -------------------------------------------- | ----------- | -------------- | ------ | ---------- | ------------ | ------------ | ------ | ----------- |
| s+1                                          |
|                                              |             |                |        |            | 1+KP(s) =1+K |              |        |             |
| ---                                          | ---         | ---            | ---    | ---        | ------------ | ---          | ---    | ---         |
| modo que o parâmetro de interesse (K)        |
|                                              |             |                |        |            |              | s4           | +10 s3 | +32 s2 +32s |
| ---                                          | ---         | ---            | ---    | ---        | ---          | ---          | ------ | ----------- |
| apareça claramente:                          |
| 2. Fatorar o polinômio P(s) em termos dos    |             |                |        |            |              |              | (s+1)  |             |
| -------------------------------------------  | --------    | ---            | ---    | ---        | ----         | ------------ | -----  | ---         |
|                                              |             |                |        |            | P(s)         | =            |        |             |
| n pólos e n                                  | zeros.      |                |        |            |              | s(s+2)(s+4)2 |        |             |
| P                                            | Z           |                |        |            |              |              |        |             |
| Im                                           |
| 5                                            |
| Pólo com                                     |
| 3. Assinalar                                 | os pólos    | e              | zeros  | de malha   |              |              |        |             |
| --------------                               | ----------  | ---            | ------ | ---------- | ---          | ---          | ---    | ---         |
| multiplicidade 2                             |
| aberta                                       | no plano    | s com          | os     | símbolos   |              |              |        |             |
| -------                                      | ----------  | -------        | ---    | ---------  | ---          | ---          | ---    | ---         |
| correspondentes:                             |
| Re                                           |
|                                              |             |                |        |            | -5 -4        | -3           | -2     | -1 0        |
| ---                                          | ---         | ---            | ---    | ---        | -----        | ---          | ---    | ----        |
| X = Pólos e O = Zeros.                       |
| O LGR começa nos pólos e termina nos         |
| zeros.                                       |
| -5                                           |
| Im                                           |
| Trecho entre 5                               |
| Total de                                     |
| 2 pólos                                      |
| 2 pólos e zeros                              |
| 4. Assinalar os segmentos do eixo real que   |             |                |        |            | Pólo com     |              |        |             |
| -------------------------------------------- | ---         | ---            | ---    | ---        | ---------    | ---          | ---    | ---         |
| (nº Par)                                     |
| multiplicidade 2                             |
| são LGR.                                     |
| Re                                           |

|                                        |                          |     |     |     | -5 -4           | -3  | -2  | -1 0 |
| -------------------------------------- | ------------------------ | --- | --- | --- | --------------- | --- | --- | ---- |
| O LGR se situa à esquerda de um número |
| Total de                               |
|                                        | ímpar de pólos e zeros.  |     |     |     | 3 pólos e zeros |     |     |      |
| ---                                    | ------------------------ | --- | --- | --- | --------------- | --- | --- | ---  |
| Total de                               |
| (nº Impar)                             |
| 1 pólos e zeros                        |
| (nº Impar) -5                          |

5. Determinar o nº de lugares separados,
   LS = n = 4
   P
   | LS = n                                       | , quando np ≥ n |     | ;   |     |     |     |                      |     |
   | -------------------------------------------- | --------------- | --- | --- | --- | --- | --- | -------------------- | --- |
   |                                              | P               |     | Z   |     |     |     |                      |     |
   | 6. LGR é simétrico em relação ao eixo real . |                 |     |     |     |     |     |                      |     |
   | 8                                            |                 |     |     |     |     |     | Sistemas de Controle |     |

| 7. (n              | -      | n ) seguimentos |                    |           | de um      | LGR   |     |     |       |       |     |
| ------------------ | ------ | --------------- | ------------------ | --------- | ---------- | ----- | --- | --- | ----- | ----- | --- |
|                    | P      | Z               |                    |           |            |       |     |     |       |       |     |
| prosseguem         |        |                 | em direção         |           | aos        | zeros |     |     |       |       |     |
| infinitos          |        | ao              | longo              | de        | assíntotas |       |     |     |       |       |     |
| Im                 |
| centralizadas em σ |        |                 | A e com ângulos φ  |           |            | A .   |     |     |       |       | 5   |
| ------------------ | ---    | ----            | ------------------ | ---       | ---        | ----  | --- | --- | ----  | ---   | --- |
|                    |        | ∑(−p            | )−∑(−z             |           | )          |       |     |     | 180º  |       |     |
|                    |        |                 | j                  |           | i          |       |     |     |       |       |     |
|                    | σ      | =               |                    |           |            |       |     |     |       |       |     |
| A                  |
|                    |        |                 | n                  | −n        |            |       |     |     |       |       |     |
| ---                | ---    | ---             | ---                | ---       | ---        | ---   | --- | --- | ---   | ---   | --- |
| P z                |
| 60º                |
|                    | ( 2q+1 | )               |                    |           |            |       |     |     |       |       |     |
| ---                | ------ | ------          | -----------        | ---       | ----       | ----  | --- | --- | ----- | ----- | --- |
|                    |        | 180o,q          |                    |           | (          | )     |     |     |       |       |     |
| φ                  | =      |                 | =0,1,2,...,        |           | n −n       | −1    |     |     |       |       | Re  |
| A                  |        |                 |                    |           | P          | z     |     |     |       |       |     |
|                    | n −n   |                 |                    |           |            |       |     |     |       |       |     |
|                    | P      | z               |                    |           |            |       | -5  | -4  | σ =-3 | -2 -1 | 0   |
| A                  |
|                    |        | (−2)+2(−4)−(−1) |                    |           | −9         |       |     |     |       |       |     |
| ---                | ---    | --------------- | ---                | ---       | ---        | ---   | --- | --- | ---   | ---   | --- |
| 300º               |
|                    | σ =    |                 |                    | =         | =          | −3    |     |     |       |       |     |
| ---                | ---    | ---             | ---                | ---       | ---        | ---   | --- | --- | ---   | ---   | --- |
| A                  |
|                    |        | 4−1             |                    |           | 3          |       |     |     |       |       |     |
| ---                | ---    | ---             | ---                | ---       | ---        | ---   | --- | --- | ---   | ---   | --- |
| ( )                |
|                    | 2      | q + 1           | φ                 | =60o;q    |            | =0    |     |     |       |       |     |
| ---                | ---    | -----           | ----               | -------   | ---        | ----  | --- | --- | ---   | ---   | --- |
| φ                  | =      | 180o            |                    |           |            |       |     |     |       |       |     |
|                    |        |                 |                    | A         |            |       |     |     |       |       | -5  |
|                    | A 4    | − 1             |                   |           |            |       |     |     |       |       |     |
|                    |        |                 | ⇒ φ               | =180o;q   |            | =1    |     |     |       |       |     |
| A                  |
|                   |
|                    | (      | )               |                    | φ =300o;q |            | = 2   |     |     |       |       |     |
| ---                | ----   | ----            | ---                | --------- | ---        | ---   | --- | --- | ---   | ---   | --- |
|                    | n −n   | −1 =            | 2                 |           |            |       |     |     |       |       |     |
|                    | P      | z               |                    | A         |            |       |     |     |       |       |     |

8. Determinar o ponto de saída (se existir)
   sobre o eixo real.

1º Fazer K = p(s);
Im

|                            |        |            |           |            | dp(s)    |     |                          |     |     |       | 5   |
| -------------------------- | ------ | ---------- | --------- | ---------- | -------- | --- | ------------------------ | --- | --- | ----- | --- |
| 2º Determinar as raízes de |        |            |           |            |          | =0. |                          |     |     |       |     |
| ds                         |
| dp(s)                      |
| = 0 ⇒ s = -2,5994          |
| ds                         |
|                            |        |            |           | s+1        |          |     | (Pto. de saída sobre Re) |     |     |       |     |
| -------                    | ---    | ----       | --------- | ------     | ---      | --- | ------------------------ | --- | --- | ---   | --- |
| 1+KP(s)                    |        | =1+K       |           |            |          | ⇒   |                          |     |     |       |     |
|                            |        |            | s4 +10 s3 | +32 s2     |          |     |                          |     |     |       |     |
| +32 s                      |
| Re                         |
|                            |        | s4         | +10 s3    | +32 s2     | +32 s    |     |                          |     |     |       |     |
| ---                        | ------ | -----      | ------    | ------     | -----    | --- | ---                      | --- | --- | ----- | --- |
| ⇒                          | p(s) = | K = −      |           |            |          | ⇒   | -5                       | -4  | -3  | -2 -1 | 0   |
| s+1                        |
|                            | dp(s)  | 3s4 +24 s3 |           | +62 s2     | +64 s+32 |     |                          |     |     |       |     |
| ---                        | -----  | ---------- | ---       | ------     | -------- | --- | ---                      | --- | --- | ---   | --- |
| ⇒                          | =      | −          |           |            |          |     |                          |     |     |       |     |
|                            | ds     |            |           | ( s+1      | )2       |     |                          |     |     |       |     |
| logo:                      |
| -5                         |
| dp(s)                      |
|                            |        | =          | 0⇒s       | = −2,5994  |          |     |                          |     |     |       |     |
| ---                        | ---    | ---        | ---       | ---------- | ---      | --- | ---                      | --- | --- | ---   | --- |
| ds                         |
| Sistemas de Controle       |        |            |           |            |          |     |                          |     |     |       | 9   |
| ---------------------      | ---    | ---        | ---       | ---        | ---      | --- | ---                      | --- | --- | ---   | --- |

• Exemplo 3: Sistema com 2 pólos reais e 2 pólos complexos
Ex.: Considere agora o seguinte sistema:

| R(s)+              |     | K   |     | C(s) |               |     |                        |     |
| ------------------ | --- | --- | --- | ---- | ------------- | --- | ---------------------- | --- |
| s ( s2 + 8s + 32 ) |
|                    | -   |     |     |      |               |     | K                      |     |
| ---                | --- | --- | --- | ---  | ------------- | --- | ---------------------- | --- |
|                    |     |     |     |      | 1+G(s)H(s)=1+ |     |                        |     |
|                    |     |     |     |      |               |     | s4 +12 s3 +64 s2 +128s |     |
| 1                  |
| ( s + 4 )          |

| 1. Escrever                                 | o polinômio | característico |        | do         |             |                        |                      |     |
| ------------------------------------------- | ----------- | -------------- | ------ | ---------- | ----------- | ---------------------- | -------------------- | --- |
| 1                                           |
|                                             |             |                |        |            | 1+KP(s)=1+K |                        |                      |     |
| ---                                         | ---         | ---            | ---    | ---        | ----------- | ---                    | ---                  | --- |
| modo que o parâmetro de interesse (K)       |
|                                             |             |                |        |            |             | s4                     | +12 s3 +64 s2 +128 s |     |
| ---                                         | ---         | ---            | ---    | ---        | ---         | ---                    | -------------------- | --- |
| apareça claramente:                         |
| 2. Fatorar o polinômio P(s) em termos dos   |             |                |        |            |             |                        | 1                    |     |
| ------------------------------------------- | --------    | ---            | ---    | ---        | ----        | ---------------------- | ---                  | --- |
|                                             |             |                |        |            | P(s)        | =                      |                      |     |
| n pólos e n                                 | zeros.      |                |        |            |             | s(s+4)(s+4+4i)(s+4−4i) |                      |     |
| P                                           | Z           |                |        |            |             |                        |                      |     |
| 10                                          |
| 3. Assinalar                                | os pólos    | e              | zeros  | de malha   |             |                        |                      |     |
| --------------                              | ----------  | -------        | ------ | ---------- | ---         | ---                    | ---                  | --- |
| aberta                                      | no plano    | s com          | os     | símbolos   |             |                        |                      |     |
| 5                                           |
| correspondentes:                            |

0

|                                       |     |     |     |     | -10 | -8 -6 | -4 -2 | 2   |
| ------------------------------------- | --- | --- | --- | --- | --- | ----- | ----- | --- |
| X = Pólos e O = Zeros.                |
| O LGR começa nos pólos e termina nos  |     |     |     |     |     |       | -5    |     |
| ------------------------------------- | --- | --- | --- | --- | --- | ---   | ---   | --- |
| zeros.                                |
| -10                                   |
| Im 10                                 |
| Total de                              |
| 2 pólos e zeros                       |

4. Assinalar os segmentos do eixo real que
   (nº Par)
   5
   são LGR.
   Re

0

|                                                |                          |     |     |     | -10 | -8 -6  | -4 -2                | 2   |
| ---------------------------------------------- | ------------------------ | --- | --- | --- | --- | ------ | -------------------- | --- |
| O LGR se situa à esquerda de um número         |
| -5                                             |
|                                                | ímpar de pólos e zeros.  |     |     |     |     |        | Total de             |     |
| ---                                            | ------------------------ | --- | --- | --- | --- | ---    | --------             | --- |
| 1 pólos e zeros                                |
|                                                |                          |     |     |     |     |        | (nº Impar)           |     |
| ---                                            | ---                      | --- | --- | --- | --- | ---    | ----------           | --- |
| -10                                            |
| 5. Determinar o nº de lugares separados,       |                          |     |     |     |     | LS = n | = 4                  |     |
| ------------------------------------------     | ---                      | --- | --- | --- | --- | ------ | -----                | --- |
| P                                              |
| 6. LGR é simétrico em relação ao eixo real .   |                          |     |     |     |     |        |                      |     |
| ---------------------------------------------- | ---                      | --- | --- | --- | --- | ---    | -------------------- | --- |
| 10                                             |                          |     |     |     |     |        | Sistemas de Controle |     |

1. (n - n ) seguimentos de um LGR
   P Z
   prosseguem em direção aos zeros
   infinitos ao longo de assíntotas 10
   centralizadas em σ e com ângulos φ.
   A A 135º
   5
   (0)+(−4)+(−4)+(−4) −12
   σ = = = −3
   A 4 4
   45º
   225º
   0
   ( 2q+1 ) φ A = 45o;q =0 -10 -8 -6 -4 -3 || -2 2
   φ = 180o  315º
   A 4 ⇒   φ A =135o;q =1 σ A -5
   φ = 225o;q = 2
   ( ) A
   n −n −1 =3 
   P z  φ =315o;q =3 -10
   A
2. Determinar o ponto de saída (se existir)
   sobre o eixo real.
   1º Fazer K = p(s); p(s)
   (-1,5767; 83,5704)
   dp(s)
   80
   2º Determinar as raízes de =0.
   ds
   60
   1
   1+KP(s) =1+K ⇒
   s4 +12 s3 +64 s2 +128 s
   40
   ⇒ p(s) = K = −s4 +12 s3 +64 s2 +128 s⇒
   dp(s)
   ⇒ = −4 s3 −36 s2 −128 s-128 20
   ds
   logo:
   dp(s) -4 -3 -2 -1 0 s
   = 0⇒s = −1,5767
   ds
3. Utilizando o critério de Routh-Hurwirtz, s4 1 64 K
   determinar o ponto no qual o eixo real é s3 12 128
   cruzado (se isso ocorrer). s2 b K
   1
   s1 c
   1
   O polinômio característico é: s0 K
   12(64)−128
   s4 +12 s3 +64 s2 +128 s+K = 0 b = =53,3333
   1 12
   A partir do critério de Routh-Hurwirtz,
   determinamos o polinômio auxiliar: b (128)−12(K)
   c = 1 =128−0,2250K
   1 b
   1
   53,3334 s2 +568,8889=0
   Logo, o limite de ganho para estabilidade é:
   cujo as raízes determinam os pontos onde o
   LGR cruza o eixo imaginário. 128
   K = =568,8889
   0,2250
   s = ± 3,2660 i
   1,2
   Sistemas de Controle 11

| 10. Usando a condição de ângulo, determinar |        |                        |        |     |       |        |     |          | Im  | 10        |     |
| ------------------------------------------- | ------ | ---------------------- | ------ | --- | ----- | ------ | --- | -------- | --- | --------- | --- |
| o ângulo                                    | de     | partida                | para   | os  | pólos |        |     |          |     |           |     |
|                                             |        |                        |        |     |       |        |     | θ = 225º |     |           |     |
| complexos e o ângulo de chegada para os     |        |                        |        |     |       |        |     | 1        |     |           |     |
| 5                                           |
| zeros complexos.                            |
|                                             |        |                        |        |     |       |        |     |          |     | θ = 135º  |     |
| ---                                         | ---    | ---                    | ---    | --- | ---   | ---    | --- | ---      | --- | --------- | --- |
| 3                                           |
| 90º                                         |
| ∠ P(s)                                      | = 180o | ±q360o em s = p ou z.  |        |     |       |        |     |          |     | Re        |     |
| ------                                      | ------ | ---------------------- | ---    | --- | ---   | ---    | --- | ---      | --- | ---       | --- |
|                                             |        |                        |        | j   | i     |        |     |          |     |           |     |
| 0                                           |
|                                             |        |                        |        |     |       | -10 -8 | -6  | -4       | -2  |           | 2   |
| ---                                         | ---    | ---                    | ---    | --- | ---   | ------ | --- | ---      | --- | ---       | --- |
| 90º                                         |
| Logo:                                       |
| -5                                          |
| Por simetria                                |
| θ = 180o                                    | −(90o  | +90o                   | +135o) | =   | 225o  |        |     |          |     |           |     |
| --------                                    | -----  | ----                   | ------ | --- | ----- | ---    | --- | ---      | --- | ---       | --- |
| 1                                           |
|                                             |        |                        |        |     |       |        |     |          |     | -10       |     |
| ---                                         | ---    | ---                    | ---    | --- | ---   | ---    | --- | ---      | --- | ---       | --- |

dp(s)

|                          | = 0 ⇒ s = -1,5767 |     |     |     | 10  |        |     |     |     | 10  |     |
| ------------------------ | ----------------- | --- | --- | --- | --- | ------ | --- | --- | --- | --- | --- |
| ds                       |
| (Pto. de saída sobre Re) |
|                          |                   |     |     |     | 5   |        |     |     |     | 5   |     |
| ---                      | ---               | --- | --- | --- | --- | ---    | --- | --- | --- | --- | --- |
| ±3,2660 i                |
| 0                        |
|                          |                   |     |     | 0   |     | -10 -8 | -6  | -4  | -2  |     | 2   |
| ------                   | ---               | --- | --- | --- | --- | ------ | --- | --- | --- | --- | --- |
| -10 -8                   | -6                | -4  | -2  |     | 2   |        |     |     |     |     |     |
| -5                       |
| -5                       |
| -10                      |
| -10                      |

2.3 LGR para Funções de Transferência Típicas

|        |     | G(s) |     |     |     |     | LGR |     |     |     |     |
| ------ | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Im     |
| K      |
| 1.     |     |      |     |     |     |     |     |     |     |     |     |
| ------ | --- | ---  | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s τ +1 |     |      |     |     |     |     |     |     |     | Re  |     |
| 1      |     |      |     |     |     |     |     | -   | 1   |     |     |
| τ      |
| 1      |

| 12  |     |     |     |     |     |     |     | Sistemas de Controle |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | --- | --- | --- |

Im
K

| 2.           |     |     |     |     |
| ------------ | --- | --- | --- | --- |
| (s τ +1)(s τ | +1) |     |     |     |
|              |     | 1   | 1   | Re  |
| 1            | 2   | -   | -   |     |
|              |     | τ   | τ   |     |
|              |     | 1   | 2   |     |

Im
K 3.

| (s τ +1)(s τ | +1)(s τ +1) |     | 1 1 | 1    |
| ------------ | ----------- | --- | --- | ---- |
|              |             |     | - - | - Re |
| 1            | 2 3         |     | τ τ | τ    |
|              |             |     | 3 2 | 1    |

Im
K 4.

| s   |     |     |     | Re  |
| --- | --- | --- | --- | --- |

Im
K

| 5.        |     |     |     |     |
| --------- | --- | --- | --- | --- |
| s(s τ +1) |     |     |     |     |
|           |     | 1   |     | Re  |
| 1 -       |
| τ         |
| 1         |

| Sistemas de Controle |     |     |     | 13  |
| -------------------- | --- | --- | --- | --- |

Im
K

| 6.            |     |     |     |     |
| ------------- | --- | --- | --- | --- |
| s(s τ +1)(s τ | +1) |     |     |     |
| 1 - 1 Re      |
| 1             | 2   |     | -   |     |
| ---           | --- | --- | --- | --- |
| τ τ           |
| 2 1           |
| Im            |
| K(s τ         | +1) |     |     |     |
| -----         | --- | --- | --- | --- |
| a             |
| 7.            |     |     |     |     |
| ------------- | --- | --- | --- | --- |
| s(s τ +1)(s τ | +1) | 1 1 | 1   | Re  |
| 1             | 2   | - - | -   |     |
|               |     | τ τ | τ   |     |
|               |     | 2 a | 1   |     |

Im
Pólo com
multiplicidade 2
K 8.

| s2  |     |     |     | Re  |
| --- | --- | --- | --- | --- |

Im
Pólo com
multiplicidade 2
K

| 9.     |     |     |     |     |
| ------ | --- | --- | --- | --- |
| s2(s τ |
| +1)    |     |     |     | Re  |
| ---    | --- | --- | --- | --- |
| 1 - 1  |
| τ      |
| 1      |

| 14  |     |     | Sistemas de Controle |     |
| --- | --- | --- | -------------------- | --- |

Im

| K(s τ  | +1)   |       |     |     |     |     |
| ------ | ----- | ----- | --- | --- | --- | --- |
| a      |
| 10.    | ; τ   | > τ   |     |     |     |     |
| ------ | ----- | ----- | --- | --- | --- | --- |
| s2(s τ | +1) a | 1     |     |     |     |     |
|        |       |       | 1   | - 1 |     | Re  |
|        | 1     |       | -   |     |     |     |
|        |       |       | τ   | τ   |     |     |
|        |       |       | 1   | a   |     |     |

Im
Pólo com
multiplicidade 3
K 11.
s3
Re

Im
Pólo com
multiplicidade 3

| K(s τ | +1) |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- |
| 12.   | a   |     |     |     |     |     |
| s3    |     |     | 1   |     | Re  |     |

-

τ
a

Im
Pólo com
multiplicidade 3

| K(s τ | +1)(s τ +1) |     |     |     |     |     |
| ----- | ----------- | --- | --- | --- | --- | --- |
| 13.   | a b         |     |     |     |     |     |
|       | s3          |     |     |     | 1 1 | Re  |

- -

τ τ
b a

| Sistemas de Controle |     |     |     |     |     | 15  |
| -------------------- | --- | --- | --- | --- | --- | --- |

Im
Pólo com
multiplicidade 2
K(s τ +1)
a

| 14.    |         |     |     |     |     |     |     |     |     |     |     |
| ------ | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s2(s τ |
|        | +1)(s τ | +1) |     |     |     |     |     | 1   | - 1 | 1   | Re  |
| ---    | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|        | 1       | 2   |     |     |     |     |     | -   |     | -   |     |
|        |         |     |     |     |     |     |     | τ   | τ   | τ   |     |
|        |         |     |     |     |     |     |     | 2   | 1   | a   |     |

Im

|       | K(s τ   | +1)(s τ | +1)     |     |     |     |     |     |     |     |     |
| ----- | ------- | ------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
| 15.   |         | a       | b       |     |     |     |     |     |     |     |     |
| s(s τ | +1)(s τ | +1)(s τ | +1)(s τ |     | +1) |     |     |     |     |     | Re  |
|       | 1       | 2       | 3       | 4   |     |     |     |     |     |     |     |

2.4 Localizando Raízes no LGR
Um ponto qualquer no plano s pertence ao LGR de um sistema, ou seja, é raiz deste
sistema, se forem satisfeitos os critérios de módulo e ângulo de fase (eqs. ( 2.1 ) e ( 2.2 )).
Desta forma, uma vez traçado o LGR, é possível, através de dois passos adicionais, verificar
se um ponto qualquer no plano s pertence ao LGR de um dado sistema.

|                                          |     |               |     |     |        |     | ∠P(s) |       | =180°±q360°⇒ |             |     |
| ---------------------------------------- | --- | ------------- | --- | --- | ------ | --- | ----- | ----- | ------------ | ----------- | --- |
|                                          |     |               |     |     |        |     |       | s=s i |              |             |     |
| 11. Determinar                           |     | a localização |     | das | raízes | que |       |       |              |             |     |
|                                          |     |               |     |     |        |     |      |       |             |             |     |
|                                          |     |               |     |     |        |     | ∑θ   |       |             |             |     |
| satisfazem o critério do ângulo de fase. |     |               |     |     |        |     |       | −∑φ   |              | =180°±q360° |     |
|                                          |     |               |     |     |        |     |      | i     | j           |             |     |
|                                          |     |               |     |     |        |     |  n   | n     |             |             |     |
|                                          |     |               |     |     |        |     |       | p     | z s=s        |             |     |
| i                                        |
|                                          |     |               |     |     |        |     |       |       |              | n P (       | )   |
| ---                                      | --- | ---           | --- | --- | ---    | --- | ---   | ---   | ---          | -----       | --- |
|                                          |     |               |     |     |        |     |       |       |              | ∏ s+        | p   |
| j                                        |
| j=1                                      |

1.  Determinar o valor do parâmetro K na raiz s. KP(s) =1⇒ K =
    |     |     |     |     |     |     | i   |     |       | i   |        |     |
    | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | ------ | --- |
    |     |     |     |     |     |     |     |     | s=s i |     | n Z    |     |
    |     |     |     |     |     |     |     |     |       |     | ∏ ( s+ | z ) |
    | k   |
    |     |     |     |     |     |     |     |     |       |     | k=1    | s=s |
    | --- | --- | --- | --- | --- | --- | --- | --- | ---   | --- | ---    | --- |
    | i   |

| 16  |     |     |     |     |     |     |     |     | Sistemas de Controle |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | --- | --- |

• Exemplo: Teste de localização de raízes para um sistema de segunda ordem
Considere o seguinte sistema de segunda ordem:

|           | R(s)+ |     | K           | C(s) |     |         |     |     |     |        |
| --------- | ----- | --- | ----------- | ---- | --- | ------- | --- | --- | --- | ------ |
| K         |
| =s2       |
|           |       |     | s ( s + 4 ) |      |     | 1+GH(s) | =1+ |     |     | +4s+K  |
| ---       | ---   | --- | ----------- | ---  | --- | ------- | --- | --- | --- | ------ |
| s ( s+4 ) |

-

Dado um ponto s no plano s, é possível verificar se ele pertence ao LGR do sistema em
1
questão através do critério do ângulo de fase:

| 11. Determinar                           |     | a localização |     | das raízes | que |     |           |        |        |        |
| ---------------------------------------- | --- | ------------- | --- | ---------- | --- | --- | --------- | ------ | ------ | ------ |
| K                                        |
|                                          |     |               |     |            |     |     | ∠         | = -∠ s | -∠ s ( | +4 ) = |
| ---                                      | --- | ---           | --- | ---        | --- | --- | ---       | ------ | ------ | ------ |
| satisfazem o critério do ângulo de fase. |
|                                          |     |               |     |            |     |     | s ( s+4 ) | i      |        | i      |
| ---                                      | --- | ---           | --- | ---        | --- | --- | --------- | ---    | ---    | ---    |

s=s
i

|     | ∠ P(s) |     | = 180o | ±q360o |     |     | [( 180o | ) ] −180o |     |     |
| --- | ------ | --- | ------ | ------ | --- | --- | ------- | --------- | --- | --- |
|     |        |     |        |        |     |     | = −     | −θ +θ =   |     |     |
| s=s |
| i   |
| n   |
|     |        |     |        |        |     |     | P (     | )         |     |     |
| --- | ---    | --- | ---    | ---    | --- | --- | ----    | ---       | --- | --- |
|     |        |     |        |        |     |     | ∏ s+    | p         |     |     |
| j   |

1.  Determinar o valor do parâmetro K na raiz s.
    |                      |     |       |        |     | i   |           | j=1                                |         |                                | ( )    |
    | -------------------- | --- | ----- | ------ | --- | --- | --------- | ---------------------------------- | ------- | ------------------------------ | ------ |
    |                      |     |       |        |     |     | K         | =                                  | ⇒       | K =                            | s s +4 |
    |                      |     |       |        |     |     | i         | n                                  |         | i                              | i i    |
    |                      |     |       |        |     |     |           | Z (                                | )       |                                |        |
    |                      |     |       |        |     |     |           | ∏ s+                               | z       |                                |        |
    |                      |     | n     | P (    | )   |     |           |                                    | k       |                                |        |
    |                      |     | ∏     | s+ p   |     |     |           |                                    |         |                                |        |
    | k=1                  |
    |                      |     |       |        | j   |     |           |                                    | s=s i   |                                |        |
    | ---                  | --- | ----- | ---    | --- | --- | ---       | ---                                | -----   | ---                            | ---    |
    |                      | K   | = j=1 |        |     |     |           |                                    |         |                                |        |
    | i                    |
    |                      |     | n     | Z      |     |     | onde:     | s                                  |         | é a magnitude do vetor que vai |        |     |     |
    | ---                  | --- | ---   | ------ | --- | --- | --------- | ---------------------------------  | ---     | ---                            | ---    |
    |                      |     | ∏     | ( s+ z | )   |     |           | i                                  |         |                                |        |
    |                      |     |       |        | k   |     |           | da origem até s.                   |         |                                |        |
    | i                    |
    |                      |     | k=1   |        | s=s |     |           |                                    |         |                                |        |
    | ---                  | --- | ---   | ---    | --- | --- | ---       | ---------------------------------- | ---     | ---                            | ---    |
    |                      |     |       |        | i   |     |           |                                    | (s + 4) | é a magnitude do vetor         |        |     |     |
    | i                    |
    | que vai de -4 até s. |
    | i                    |

Im
Re

| Sistemas de Controle |     |     |     |     |     |     |     |     |     | 17  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

2.5 Exercícios

1. Traçar o LGR para os seguintes sistemas (com K>0), e, testar se o ponto dado
   pertence ao LGR do sistema:
   K
   |        | a) G(s)H(s)= |             |              | ; s                   | =-1,0066 + 3,9950i.       |     |
   | ------ | ------------ | ----------- | ------------ | --------------------- | ------------------------- | --- |
   |        |              | s(s2        | +6s+25)      | i                     |                           |     |
   | K      |
   |        | b) G(s)      | =           | ; H(s)       | =1; s                 | = -0,3337 −0,5780i.       |     |
   | ---    | -------      | ----------- | ------------ | ------                | --------------------      | --- |
   |        |              | s(s+1)(s+2) |              |                       | i                         |     |
   | K(s+2) |
   |        | c) G(s)H(s)= |             | ; s          | = -0,7660 + 0,2995i.  |                           |     |
   | ---    | ------------ | ---         | --------     | --------------------- | --------------------      | --- |
   |        |              | s2          | +2s+3        | i                     |                           |     |
   |        |              | 1           |              | 1                     |                           |     |
   |        | d) G(s)      | =           | ; H(s)       | = ; s                 | =-0,4968 + 1,3290i.       |     |
   | i      |
   |        |              | s2 +4s+5    |              | s                     |                           |     |
   | ---    | -------      | --------    | ----------   | ----                  | ------------------------- | --- |
   |        |              |             | 1            |                       | 1                         |     |
   |        | e) G(s)      | = (         | ) ; H(s)     | =                     | ; s = 2,5509 - 4,1649i.   |     |
   |        |              | s2          |              |                       | i                         |     |
   |        |              | s +4s+13    |              | s+1                   |                           |     |
   |        |              | 1           | s+1          |                       |                           |     |
   |        | f) G(s)      | =           | ; H(s) =     | ; s                   | =-0,2968 + 4,3290i.       |     |
   | i      |
   |        |              | s+3,6       |              | s2                    |                           |     |
   | ---    | ---          | -----       | ---          | ---                   | ---                       | --- |
2. Dadas as seguintes funções de transferência de malha fechada. Considerando que
   estes sistemas têm realimentação unitária, traçar o LGR, e, testar se o ponto dado pertence ao
   LGR:
   s2
   |     | C(s) |            | +1            |                     |                             |     |
   | --- | ---- | ---------- | ------------- | ------------------- | --------------------------- | --- |
   |     | a)   | =          | ; s           | =-0,5000 + 0,5000i. |                             |     |
   | i   |
   |     | R(s) | 2s2 +2s+1) |               |                     |                             |     |
   | --- | ---- | ---------- | ------------- | ---                 | --------------------------- | --- |
   |     | C(s) |            | 1             |                     |                             |     |
   |     | b)   | =          |               |                     | ; s = -1,0000 - 1,5811i.    |     |
   |     | R(s) | s4 +4s3    | +11s2 +14s+11 |                     | i                           |     |

| 18  |     |     |     |     |     | Sistemas de Controle |
| --- | --- | --- | --- | --- | --- | -------------------- |

3 AÇÕES DE CONTROLE BÁSICAS
3.1 Introdução
A introdução de um controlador em um determinado sistema visa a modificação de sua
dinâmica, manipulando a relação entrada/saída através da atuação sobre um ou mais dos seus
parâmetros, com o objetivo de satisfazer certas especificações com relação a sua resposta
(Ogata, 1993). Os parâmetros do sistema que sofrem uma ação direta do controlador, são
denominadas de variáveis manipuladas, enquanto que os parâmetros no qual se deseja obter
as mudanças que satisfaçam as dadas especificações, denominam-se variáveis controladas.
O controlador é um dispositivo físico, podendo ser: eletrônico, elétrico, mecânico,
pneumático, hidráulico ou combinações destes. No projeto real de um sistema de controle, o
projetista deverá decidir pela utilização de um ou mais controladores. Esta escolha depende
de vários fatores. O tipo de controlador mais comumente usado, mesmo em plantas das mais
diversas naturezas, é o controlador eletrônico. De fato, os sinais não elétricos são,
normalmente, transformados em sinais elétricos, através de transdutores, e, devido a
simplicidade de transmissão, aumento da performance, aumento da confiabilidade e
principalmente, facilidade de compensação. Geralmente controladores eletrônicos são
circuitos simples, formados basicamente por amplificadores operacionais, sendo assim de
fácil implementação prática e baixos custos (Ogata, 1993).
Uma vez determinada a necessidade de se projetar um controlador, existem algumas
configurações possíveis, com respeito ao posicionamento do mesmo no sistema a ser
controlado. Algumas das configurações mais usadas em sistemas de controle, são:
• Controladores Série
Em geral, o projeto de controladores série é mais simples que o de controladores por
realimentação. Entretanto, normalmente exige amplificadores adicionais para aumentar o
ganho do sistema. Consiste em colocar o controlador no ramo direto de alimentação, ou seja,
em série com a planta
• Controladores por Realimentação
Em geral, o número de componentes necessários na compensação por realimentação será
menor que o número de componentes na compensação série. Esta configuração recebe este
nome pois, neste caso, o compensador é inserido num ramo de realimentação.
R(s) + U(s) C(s)
R(s) + E(s) U(s) C(s) Planta
Comp. Planta -
-

Comp.
Sistemas de Controle 19

3.2 Ações Proporcional, Integral e Derivativa (P-I-D)
• Controle Proporcional (P)
A razão entre a saída e a entrada do compensador é chamada de ganho proporcional ‘K’,
quanto maior for o ganho do compensador, menor será o erro de estado estacionário ‘e ’,
ss
contudo, o tempo de acomodação aumenta, tendendo, em certos casos, a desestabilizar o
sistema. O inverso acontece quando se reduz (atenua) o ganho. Um compensador deste tipo,
como não acrescenta pólos nem zeros ao sistema principal, representa apenas um ajuste no
seu ganho original.
u(t) = Ke(t) ; U(s)=KE(s)
onde: e(t)= r(t) - y(t)
Resumo
• É um amplificador com ganho ajustável (K).
• O aumento de K diminui o erro de regime.
• Em geral, o aumento de K torna o sistema mais oscilatório, podendo instabilizá-lo.
• Melhora o regime e piora o transitório, sendo bastante limitado.
Ex:
R(s)+ 1 C(s)
K
(τ s + 1 )
-

1
Para entrada degrau unitário ⇒ e =
ss 1+ K
O erro será nulo somente para K → ∞, o que nem sempre é possível.
20 Sistemas de Controle

• Controlador Proporcional + Integral (PI)
A ação integral corresponde a ter-se uma taxa de variação do sinal de saída com relação a
t
entrada (u& =k e⇒u =k ∫ e dt). Desta forma, com uma ação integral, atua-se beneficamente
i i
0
na resposta em regime permanente, tendendo a eliminar o erro de estado estacionário,
contudo, prejudica-se o regime transitório, pois acrescenta-se pólos ao sistema tendendo a
desestabilizá-lo, e com isso aumentar o tempo de acomodação.
A atuação de um controlador PI corresponde à soma de uma ação proporcional com uma
ação integral. Desta forma pode-se melhorar a resposta transitória com a contribuição da ação
proporcional, enquanto a ação integral corrige o erro de estado estacionário.

|        |          |           |     |        | ( )      |     |
| ------ | -------- | --------- | --- | ------ | -------- | --- |
|        |         | 1 t      |     |        | K s+K    |     |
| u(t) = | K e(t)+ | ∫e(τ)dτ  | ;   | U(s) = | p i E(s) |     |
|        | p       |          |     |        |          |     |
|        |          | τ         |     |        | s        |     |
|        |         | 0        |     |        |          |     |
| i      |

K

| onde: K = p | , sendo τ o tempo integrativo ou reset time. |     |     |     |     |     |
| ----------- | -------------------------------------------- | --- | --- | --- | --- | --- |
| i           |
| i τ         |
| i           |

Resumo
• Tende a zerar o erro de regime, pois aumenta o tipo do sistema.

| • Adiciona um pólo em p = 0 e um zero em z = - K/K                            |     |     |     | .   |     |     |
| ----------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| i p                                                                           |
| • É utilizado quando a resposta transitória é aceitável e resposta em regime  |
| insatisfatória.                                                               |
| • Como aumenta a ordem do sistema, acrescenta possibilidades de instabilidade |
| diferentes daquelas apresentadas pelo sistema original.                       |

Ex:

|                |     | R(s)+ | 1   |      |     |     |
| -------------- | --- | ----- | --- | ---- | --- | --- |
|                |     |       | Κ   | C(s) |     |     |
| i              |
| K +            |
| p s (τ s + 1 ) |

-

1

| Para entrada degrau unitário ⇒ e |     | =   | =0  |     |     |     |
| -------------------------------- | --- | --- | --- | --- | --- | --- |
| ss                               |
| 1+∞                              |

| Sistemas de Controle |     |     |     |     |     | 21  |
| -------------------- | --- | --- | --- | --- | --- | --- |

• Controlador Proporcional + Derivativo (PD)
Embora um controlador puramente derivativo não seja implementável na prática, a ação
derivativa, associada à ação proporcional, corresponde ao acréscimo de um zero ao sistema,
atuando beneficamente no regime transitório, tendendo a aumentar a estabilidade relativa do
sistema e reduzindo o tempo de acomodação, contudo, contrapondo-se a estas vantagens, ele
aumenta o tempo de subida e, por não atuar no regime permanente, não corrige o erro de
estado estacionário.
Obs.: Este compensador, por introduzir um avanço de fase, é considerado na bibliografia
como um caso particular de um compensador em avanço. (Ogata, 1993 e Kuo, 1995)

|     |        |          | d    |        | (   | )         |
| --- | ------ | --------- | ----- | ------ | --- | --------- |
|     | u(t) = | K e(t)+τ | e(t) | ; U(s) | = K | +K s E(s) |
|     |        | p         | d dt |        | p   | d         |
|    |

| onde: K = K | τ, sendo τ a constante derivativa. |     |     |     |     |     |
| ----------- | ---------------------------------- | --- | --- | --- | --- | --- |
| d           | p d                                | d   |     |     |     |     |

Resumo
• Leva em conta a taxa de variação do erro

| • Adiciona um zero em z = - K                                                      |     |     | /K  |     |     |     |
| ---------------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| p d                                                                                |
| • É utilizado quando a resposta em regime é aceitável e resposta transitória       |
| insatisfatória.                                                                    |
| • Introduz um efeito de antecipação no sistema, fazendo com que o mesmo reaja não  |
| somente à magnitude do sinal de erro, como também à sua tendência para o instante  |
| futuro, iniciando, assim, uma ação corretiva mais cedo.                            |
| • A ação derivativa tem a desvantagem de amplificar os sinais de ruído, o que pode |
| causar um efeito de saturação nos atuadores do sistema.                            |

Ex:

|     |     | R(s)+ |       | 1   | C(s) |     |
| --- | --- | ----- | ----- | --- | ---- | --- |
|     |     |       | K + K | s   |      |     |
|     |     |       | p d   | Js2 |      |     |

-

( )

|     |     |     | C(s)     | K +K s |     |                      |
| --- | --- | --- | -------- | ------ | --- | -------------------- |
|     |     |     |          | p d    |     |                      |
| =   |
|     |     |     | R(s) Js2 | +K s+K |     |                      |
| --- | --- | --- | -------- | ------ | --- | ---                  |
| d p |
| 22  |     |     |          |        |     | Sistemas de Controle |
| --- | --- | --- | ---      | ---    | --- | -------------------- |

• Controlador Proporcional + Integral + Derivativo (PID)
O PID une as ações proporcional, integral e derivativa num só controlador, atuando tanto
no regime transitório quanto no regime permanente.
s2

|     |         |    | K    |         |     | U(s) | K   | +K s+K |     |     |
| --- | ------- | --- | ---- | -------- | --- | ---- | --- | ------ | --- | --- |
|     |         |     | i    |          |     |      |     | d p    | i   |     |
|     | U(s)=K |     | + +K | sE(s) ⇒ |     |      | =   |        |     |     |
|     |         | p   | s    | d        |     | E(s) |     | s      |     |     |
|     |         |    |      |         |     |      |     |        |     |     |

Resumo
• É utilizado quando temos resposta transitória e em regime insatisfatórias.
• Adiciona um pólo em p = 0 e 2 zeros, que dependem dos parâmetros do controlador.
• Geralmente os dois zeros são reais e iguais.

3.3 Ações de Controle Avanço-Atraso

• Controlador Avanço de Fase (Lead)
Sua principal finalidade é suprir um atraso de fase estabelecido naturalmente pelas
próprias características de alguns componentes do sistema original. Este tipo de compensação
permite remodelar o lugar das raízes de maneira a obterem-se pólos dominantes desejados em
malha fechada. Em geral seus efeitos correspondem a um aumento no amortecimento, com
menores tempo de subida e de acomodação, o que corresponde, no domínio da freqüência, a
um aumento na largura de faixa. Além disso, as margens de ganho e de fase são melhoradas,
contudo o erro de estado estacionário não é afetado.

|     |         |        | U(s)         | K(s+z) | Kz        | (s/z+1) |        |                |     |     |
| --- | ------- | ------ | ------------ | ------ | --------- | ------- | ------ | -------------- | --- | --- |
|     |         | G (s)= |              | =      | =         |         | p > z  |                |     |     |
| c   |
|     |         |        | E(s)         | (s+p)  | p         | (s/p+1) |        |                |     |     |
| --- | ------- | ------ | ------------ | -----  | --------- | ------- | ------ | -------------- | --- | --- |
|     |         | τs+1   |              |        | 1         | 1       |        |                |     |     |
|     | G (s)=K |        | , em que: z= |        | ; p=      |         | ; K    | =Kα ; 0<α<1    |     |     |
|     | c       | cατs+1 |              |        |           |         | c      |                |     |     |
|     |         |        |              |        | τ         | ατ      |        |                |     |     |

Resumo
• Introduz um zero e um pólo
• Melhora o transitório, a exemplo do controlador PD
• Sempre adianta a fase

| Sistemas de Controle |     |     |     |     |     |     |     |     |     | 23  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

• Controlador Atraso de Fase(Lag)
Uma compensação em atraso melhora o erro em regime permanente, no entanto, diminui
a largura de faixa, o que implica, em termos de domínio do tempo, numa resposta mais lenta,
com maiores tempos de subida e acomodação. Em alguns casos é preciso reduzir a largura de
faixa de um dado sistema com o intuito de torná-lo menos susceptível a sinais de ruído

|     |     |        | U(s) | K(s+z) | Kz (s/z+1) |     |       |     |
| --- | --- | ------ | ---- | ------ | ---------- | --- | ----- | --- |
|     |     | G (s)= |      | =      | =          |     | z > p |     |
|     |     | c      | E(s) | (s+p)  | p (s/p+1)  |     |       |     |

|     |         | τs+1    |              |     | 1    | 1   |               |     |
| --- | ------- | ------- | ------------ | --- | ---- | --- | ------------- | --- |
|     | G (s)=K |         | , em que: z= |     | ; p= |     | ; K =Kβ ; β>1 |     |
|     | c       | c βτs+1 |              |     | τ    | βτ  | c             |     |

Resumo
• Introduz um zero e um pólo
• Melhora o regime, a exemplo do controlador PI
• Sempre atrasa a fase
• Não zera o erro, mas o reduz bastante

• Controlador Avanço-Atraso de Fase(Lead-Lag)
Em casos onde se deseja uma resposta rápida, característica de sistema com
compensação em avanço, porém com diminuição do erro em regime estacionário, que é
garantida por uma compensação em atraso, é possível usar um controlador que una ambas as
características, que é o caso do controlador em avanço–atraso.

|     |     |     |       |      | (     | )(     | )   |     |
| --- | --- | --- | ----- | ---- | ----- | ------ | --- | --- |
|     |     |     |       | U(s) | K s+z | s+z    |     |     |
| 1 2 |
|     |     |     | G (s) | =    | =     |        |     |     |
| --- | --- | --- | ----- | ---- | ----- | ------ | --- | --- |
|     |     |     | c     | E(s) | ( s+p | )( s+p | )   |     |
| 1 2 |

|                                                                | τs+1        | τs+1 |           |     | 1 1   |                  |     |                      |
| -------------------------------------------------------------- | ----------- | ---- | --------- | --- | ----- | ---------------- | --- | -------------------- |
| G (s)=K                                                        |             | 1 2  | ; em que: |     | < ; K | >0 ; β>1 ; 0<α<1 |     |                      |
| c                                                              | cατs+1βτs+1 |      |           |     |       | c                |     |                      |
|                                                                |             |      |           |     | τ τ   |                  |     |                      |
|                                                                |             | 1    | 2         |     | 2 1   |                  |     |                      |
| Características                                                |
| • Introduz dois zeros e dois pólos                             |
| • É usado para melhorar o desempenho em regime e o transitório |
| • É análogo ao controlador PID                                 |
| 24                                                             |             |      |           |     |       |                  |     | Sistemas de Controle |
| ---                                                            | ---         | ---  | ---       | --- | ---   | ---              | --- | -------------------- |

3.4 Modificações das Ações de Controle PID
• PID Original
• Parte Derivativa -Filtro
T s
d , com: γ ≈0.1
1+γT s
d
• PI-D
Objetivo: Não derivar variações bruscas no sinal de referência
• I-PD
Objetivo: Não derivar, nem amplificar variações bruscas no sinal de referência.
Sistemas de Controle 25

3.5 Exercícios

1. Dados os seguintes sistemas e seus respectivos controladores, traçar o LGR do
   sistema sem o controlador, e, testar se o ponto dado pertence ao LGR do sistema. Em seguida
   traçar o LGR com sistema em série com o controlador e testar se agora o ponto pertence ao
   LGR:
   | 1                    |        | 1         |                      |     |
   | -------------------- | ------ | --------- | -------------------- | --- |
   | a) G(s)=             | ; H(s) | = ; s     | = -0,2968 + 4,3290i, |     |
   | s+3,6                |        | s2 i      |                      |     |
   | Controlador PD com K |        | = 0,4 e K | = 1.                 |     |
   |                      |        | p         | d                    |     |

| 26  |     |     |     | Sistemas de Controle |
| --- | --- | --- | --- | -------------------- |

4 PROJETO DE CONTROLADORES PELO MÉTODO DO LGR
4.1 Especificações de Desempenho
Normalmente, as especificações de desempenho transitório são dadas em termos de
sistemas de 2a ordem, ou seja, em termos de fator de amortecimento (ξ) e freqüência natural.
Para um sistema de segunda ordem, temos:
C(s) ω2
= n ; Pólos ⇒ s = −ξω ±ω ξ2 −1 ( 4.1 )
R(s) s2 +2ξω s+ω2 n n
n n
Se as especificações forem: M (%)≤ M e t ≤ T, temos ξ≥ξ e ξω ≥ ( ξω ) .
p s min n n min
Im
-1
θ= cos ξ
min
θ
Re
(ξω )
n min
Região Viável para os pólos de malha fechada
O projeto de controladores é basicamente um método educado de tentativa-e-erro, onde
se tenta satisfazer todas as especificações de desempenho. Uma vez projetado o controlador, o
projetista deve verificar se o sistema em malha fechada satisfaz todas as especificações de
desempenho. Se não for este o caso, repete o processo de projeto por modificação de
parâmetros ajustáveis, ou modifica a configuração do sistema, até atingir as especificações
requeridas.
Quando desejamos alterar o desempenho transitório de um sistema, o controlador deve
contribuir com singularidades de modo que o LGR do sistema passe no ponto especificado,
calculado a partir das especificações de desempenho. Quando desejamos alterar o
desempenho em regime, o controlador deve contribuir com o ganho necessário, sem alterar
muito o LGR do sistema original.
Sistemas de Controle 27

4.2 Projeto de Controladores PD
A função de transferência de um PD é:

|                                                                              |     |         |        |  K     |            |     |         |
| ---------------------------------------------------------------------------- | --- | ------- | ------ | ------- | ----------- | --- | ------- |
|                                                                              | G   | (s) = K | +K s = | K s+ p |  = K (s+z) |     |         |
|                                                                              |     |         |        | d      |            |     | ( 4.2 ) |
|                                                                              | c   | p       | d      | K       | c           |     |         |
|                                                                              |     |         |        |        |            |     |         |
| d                                                                            |
| É utilizado quando o sistema tem um transitório insatisfatório e regime bom. |

• Passos para o projeto de controladores PD

1. Traduzir as especificações de desempenho em termos de uma localização desejada dos
   pólos dominantes de malha fechada
2. Verificar se o objetivo não pode ser atingido com um controlador Proporcional
3. Se o PD é necessário, localizar o zero de modo que a condição de ângulo seja
   satisfeita
4. Calcular o ganho total requerido, aplicando a condição de módulo.
5. Calcular a constante de erro estacionário
6. Se a constante não for adequada, tentar um outro controlador.
7. Simular o sistema com o controlador e observar o comportamento da resposta. Caso
   não seja satisfatório, tentar um ajuste fino dos parâmetros do controlador (K e z)
   c

K s
d

|       | OBS: PD prático ⇒ G |     |     | (s) = K | + 3≤a | ≤10 |     |
| ----- | ------------------- | --- | --- | ------- | ----- | --- | --- |
|       |                     |     |     | c p     | s    |     |     |
|      |
| 1+  |
|  a  |

EXEMPLO:

|      |     | R(s)+ |     | 2   | C(s) |     |     |
| ---- | --- | ----- | --- | --- | ---- | --- | --- |
| G(s) |
|      |     |       | c   | s2  |      |     |     |
| ---  | --- | ---   | --- | --- | ---  | --- | --- |

-

| Projetar um controlador G                                             |     | c (s) para que: t |      | ≤ 4s ; M | ≤ 20%. |                      |     |
| --------------------------------------------------------------------- | --- | ----------------- | ---- | -------- | ------ | -------------------- | --- |
|                                                                       |     |                   |      | s        | p      |                      |     |
| ζπ                                                                    |
| −                                                                     |
| 1−ζ2                                                                  |
| Da equação do máximo pico: M =e = 20%, obtemos: ζ =0,46; e da equação |
|                                                                       |     |                   | P    |          |        | min                  |     |
| ---                                                                   | --- | ---               | ---  | ---      | ---    | ---                  | --- |
| 4                                                                     |
| do tempo de acomodação (para 2%): t = = 4; obtemos: ( ζω ) =1.        |
|                                                                       |     |                   | s ζω |          | n min  |                      |     |
| ---                                                                   | --- | ---               | ---- | ---      | -----  | ---                  | --- |
| n                                                                     |
| 28                                                                    |     |                   |      |          |        | Sistemas de Controle |     |
| ---                                                                   | --- | ---               | ---  | ---      | ---    | -------------------- | --- |

1−ζ2
Sendo ainda: ω =ω , para os valores de ζ e ω encontrados, temos: ω =1,95.

|                                                                                              |             |     | d          | n         |       |                |             |     | n   |     |          | d      |     |
| -------------------------------------------------------------------------------------------- | ----------- | --- | ---------- | --------- | ----- | -------------- | ----------- | --- | --- | --- | -------- | ------ | --- |
| Logo os pólos dominantes de malha fechada devem estar em -1 ± 1,95i.                         |
| Como é imprescindível a introdução de um controlador PD para a obtenção dos pólos            |
| dominantes desejados, determinam-se o zero e o ganho do controlador utilizando-se o critério |
| de ângulo e o critério do módulo, respectivamente.                                           |
|                                                                                              |             |     |            |           |       |  ω            |            |    |     |     |          |        |     |
| ---                                                                                          | ---         | --- | ---------- | ---       | ---   | -------        | ----------- | --- | --- | --- | -----    | ------ | --- |
|                                                                                              | θ=θ         | =θ  | =180−ATAN |           |       | d              |  =117,13° |     |     |     |          |        |     |
|                                                                                              |             | 1   | 2          |           |       | ( )           |            |     |     |     |          |        |     |
|                                                                                              |             |     |            |           |       | ζω             |             |     |    |     | ω        |        |     |
|                                                                                              |             |     |            |           |       |  n min        |            |    | z   | = − | d +      | ( ζω ) |     |
|                                                                                              |             |     |            |           |       |                |             |     |    |     | ( )      |        |     |
|                                                                                              |             |     |            |           |       |                |             |    |     | tan | 180−φ    | n min  |     |
|                                                                                              |             |     |            |          | ω     |               |             |     |    |     |          |        |     |
|                                                                                             |
|                                                                                              | φ=180−ATAN |     |            |           | d     |               |             | ⇒  |    |     | ⇓        |        | ;   |
| ---                                                                                          | ----------- | --- | ---        | -------   | ----- | ------         | -------     | --- | --- | --- | -------- | ---    | --- |
|                                                                                              |             |     |            | (        | )     |               |             |     |     |     |          |        |     |
|                                                                                              |             |     |            | ζω        |       | −z             |             |     |     |     |          |        |     |
|                                                                                              |             |     |            |          | n min |               |             |    |    |     |          |        |     |
|                                                                                              |             |     |            |           |       |                |             |     |     |     | z = 2,41 |        |     |
|                                                                                              |             |     |            |           |       |                |             |    |    |     |          |        |     |
|                                                                                              | −θ          | −θ  | +φ=        | −180⇒φ=   |       | 2θ−180         | =54,25°     |     |     |     |          |        |     |
|                                                                                              |             | 1 2 |            |           |       |                |             |    |    |     |          |        |     |
|                                                                                             |
|                                                                                             |
|                                                                                              |             |     |            |           |       |                | (           | ) 2 |     |     |          |        |     |
| ---                                                                                          | ---         | --- | ---        | ---       | ---   | ---            | --------    | --- | --- | --- | ---      | ---    | --- |
|                                                                                              |             |     |            |           |       |                | ω2 +12      |     |     |     |          |        |     |
|                                                                                              |             |     |            |           |       | K =            | d           | =   | 2   |     |          |        |     |
|                                                                                              |             |     |            |           |       | t              | (           | )2  |     |     |          |        |     |
|                                                                                              |             |     |            |           |       |                | ω2 + z−1    |     |     |     |          |        |     |
| d                                                                                            |
| Como o sistema originalmente já tem um ganho K = 2,0, temos que: K = K K =1,0                |
|                                                                                              |             |     |            |           |       |                |             |     |     |     | c        | t      |     |
| ---                                                                                          | ---         | --- | ---        | ---       | ---   | ---            | ---         | --- | --- | --- | ---      | ---    | --- |
| Resposta no Tempo                                                                            |
| 2                                                                                            |
| 1.8                                                                                          |
| Sem Controlador                                                                              |
| 1.6                                                                                          |
|                                                                                              |             | 1.4 | M          | = 31.87%  |       |                |             |     |     |     |          |        |     |
| ---                                                                                          | ---         | --- | ---        | --------- | ---   | ---            | ---         | --- | --- | --- | ---      | ---    | --- |
| P                                                                                            |
| 1.2                                                                                          |
| atsopseR                                                                                     |
| Com Controlador                                                                              |
| 1                                                                                            |
|                                                                                              |             | 0.8 |            |           |       | t = 3.64seg.   |             |     |     |     |          |        |     |
| ---                                                                                          | ---         | --- | ---        | ---       | ---   | -------------- | ---         | --- | --- | --- | ---      | ---    | --- |
| s                                                                                            |
| 0.6                                                                                          |
| 0.4                                                                                          |
| 0.2                                                                                          |
| 0                                                                                            |
|                                                                                              |             | 0   | 1          | 2         |       | 3 4            | 5           | 6   |     | 7   | 8 9      | 10     |     |
| ---                                                                                          | ---         | --- | ---        | ---       | ---   | ---            | ---         | --- | --- | --- | ---      | ---    | --- |
| Tempo                                                                                        |

A simulação mostra que a especificação de desempenho com relação ao máximo sobre-
sinal não foi cumprida, sendo necessário realizar um ajuste fino nos parâmetros do
controlador. Neste caso, usar um ganho K ≥ 2,5 resolve esse problema.
c

| Sistemas de Controle |     |     |     |     |     |     |     |     |     |     |     |     | 29  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

4.3 Projeto de Controladores PI
A função de transferência de um PI é:
K sK +K s+K /K K (s+ z)
G (s) = K + i = p i = K i p = c ( 4.3 )
c p s s p s s
É usado quando o sistema é Tipo N e se deseja que o mesmo apresente erro zero para
uma entrada de complexidade N, ou seja, quando desejamos melhorar o regime.
• Passos para o projeto de controladores PI

1. Localizar o pólo na origem;
2. Determinar o zero de modo que a condição de ângulo seja satisfeita;
3. Calcular o ganho total requerido, aplicando a condição de módulo;
4. Simular o sistema em malha fechada com o controlador
5. Caso o desempenho não seja satisfatório, tentar fazer um ajuste fino dos parâmetros do
   controlador (K e z)
   c
   2
   EXEMPLO: Dado G(s) = ; H(s) =1 . Projetar um controlador para que o sistema
   s(s+2)
   tenha erro zero para entrada rampa, alterando o mínimo possível o transitório.
   10
   9
   8
   7
   6
   5
   4
   3
   2
   1
   0
   0 1 2 3 4 5 6 7 8 9 10
   Tempo
   30 Sistemas de Controle
   atsopseR
   Resposta `a Rampa
   Com Controlador
   Sem Controlador

1.4
1.2
1
0.8
0.6
0.4
0.2
0
0 1 2 3 4 5 6 7 8 9 10
Tempo
Sistemas de Controle 31
atsopseR
Resposta no Tempo
M = 4.32%
P
t = 4.36seg.
s
Testa-se valores para o módulo do zero do controlador tão pequenos quanto possível. As
respostas apresentadas, foram obtidas com K =1 e z = 0,25. Quanto menor for o valor de z,
c
menos o transitório será alterado, porém, o seguimento da referência se dará mais lentamente.
10
9
8
7
6
5
4
3
2
1
0
0 1 2 3 4 5 6 7 8 9 10
Tempo
atsopseR
Resposta `a Rampa
Referencia
Sem Controlador
z = 0.10
z = 0.25
z = 0.50

4.4 Projeto de Controladores PID
São muito freqüentemente utilizados em sistemas de controle industriais. De uma
maneira geral, a função de transferência de um PID, considerando zeros reais é da seguinte
forma:

|                                              |       |     |        |     | s2K +sK | +K  |       |            |     |         |
| -------------------------------------------- | ----- | --- | ------ | --- | ------- | --- | ----- | ---------- | --- | ------- |
|                                              |       |     | K      |     |         |     |       | (s+ z )(s+ | z ) |         |
|                                              | G (s) | = K | + i +K | s = | d       | p   | i = K | 1          | 2   | ( 4.4 ) |
|                                              | c     |     | p s    | d   |         | s   | c     | s          |     |         |
| • Passos para o projeto de controladores PID |

1. Traduzir as especificações de desempenho em termos de uma localização desejada de
   pólos dominantes de malha fechada;
2. Verificar se o objetivo não pode ser atingido com um controlador mais simples;
3. Se o PID é necessário, localizar o pólo na origem e os zeros de modo que a condição
   de ângulo seja satisfeita;
4. Calcular o ganho total requerido, aplicando a condição de módulo;
5. Simular o sistema com o controlador e observar o comportamento da resposta. Caso
   não seja satisfatório, tentar um ajuste fino dos parâmetros do controlador (K , z e z ).
   |                                                                                           |             |     |            |                |         |      |         |           | c 1 2                |     |
   | ----------------------------------------------------------------------------------------- | ----------- | --- | ---------- | -------------- | ------- | ---- | ------- | --------- | -------------------- | --- |
   | 1                                                                                         |
   | EXEMPLO: Dado o sistema G(s) = ; H(s). Projetar um controlador PID para que               |
   | s2 +1                                                                                     |
   | os pólos de malha fechada estejam em s                                                    |             |     |            |                | = −1±   | 3 i  |         |           |                      |     |
   | --------------------------------------                                                    | ---         | --- | ---        | ---            | -----   | ---- | ---     | ---       | ---                  | --- |
   | Uma rápida análise do problema nos mostra que o número de parâmetros (K , z e z )         |
   |                                                                                           |             |     |            |                |         |      |         |           | c                    | 1 2 |
   | ---                                                                                       | ---         | --- | ---        | ---            | ---     | ---  | ---     | ---       | ---                  | --- |
   | que precisam ser calculados é maior do que o número de equações que descrevem o problema  |
   | (critério de ângulo e critério de módulo). Uma alternativa para contornar este problema é |
   | considerar que os zeros do controlador são idênticos.                                     |
   | Neste caso, tem-se:                                                                       |
   |                                                                                          |
   |                                                                                           |             |     |            |               | 3      |      |         |           |                      |     |
   | ---                                                                                       | ---         | --- | ---------- | ---            | ---     | ---  | ---     | ---       | ---                  | --- |
   |                                                                                           | φ=φ         | =φ  | =180−ATAN |                |        |      |         |           |                      |     |
   |                                                                                          |
   |                                                                                           |             | 1 2 |            |               | 1− z   |      |         |           |                      |     |
   | ---                                                                                       | ---         | --- | ---        | ---            | ------  | ---  | ---     | ---       | ---                  | --- |
   |                                                                                           |             |     |            |               |        |     |         |           |                      |     |
   |                                                                                           |             |     | (          | )              |         |     |         |           |                      |     |
   | φ=96,95°⇒                                                                                 |
   |                                                                                           | θ =180−ATAN |     |            | 3−1 =143,79°   |         |      |         |           |                      |     |
   | ---                                                                                       | ----------- | --- | ---        | ------------   | ---     | ---  | ---     | ---       | ---                  | --- |
   |                                                                                           | 1           |     |            |                |         |     |         |           |                      |     |
   |                                                                                           |             |     | (          | )              |         |      |         | 3         |                      |     |
   |                                                                                          |
   |                                                                                           | θ =180−ATAN |     |            | 3+1 =110,10°⇒ |         | z    | = z = − |           | +1⇒                  |     |
   | ---                                                                                       | ----------- | --- | ---        | -------------- | ---     | ---  | ------- | --------- | ----                 | --- |
   |                                                                                           | 2           |     |            |                |         | 1    | 2       | (         | )                    |     |
   |                                                                                           |             |     |            |                |         |      |         | tan 180−φ |                      |     |
   |                                                                                           |             |     | (          | )              |         |     |         |           |                      |     |
   |                                                                                           | θ =180−ATAN |     |            | 3 =120,00°     |         |      |         |           |                      |     |
   |                                                                                           | 3           |     |            |                |         |     |         |           |                      |     |
   |                                                                                          |
   |                                                                                           | −θ −θ       | −θ  | +2φ=       | −180           |         |      | ⇒ z     | = z =     | 0,79                 |     |
   | ---                                                                                       | -----       | --- | ----       | ----           | ---     | ---  | ---     | -----     | ----                 | --- |
   |                                                                                           | 1           | 2   | 3          |                |         |      |         |           |                      |     |
   |                                                                                           |             |     |            |                |         |     | 1       | 2         |                      |     |
   |                                                                                          |
   |                                                                                          |
   |                                                                                           |             |    | ( )2       |              | (       | )2   |  ( )2 |          |                      |     |
   | ---                                                                                       | ---         | --- | ----       | ---            | ---     | ---  | ------- | ---       | -----                | --- |
   |                                                                                           |             |     | 3−1        | +12            | 3+1     | +12  | 3       | +12       |                      |     |
   |                                                                                           |             |    |            |              |         |      |       |          |                      |     |
   |                                                                                           |             |    |            |              |         |      |       |          |                      |     |
   |                                                                                           | K           | =   |            |                |         |      |         | =         | 2,37                 |     |
   |                                                                                           |             | c   |            |                |         |      | 2       |           |                      |     |
   |                                                                                           |             |     |            |  (            | )2      |     |         |           |                      |     |
   | ( )2                                                                                      |
   |                                                                                           |             |     |            |               | 3 + 1−z |     |         |           |                      |     |
   | ---                                                                                       | ---         | --- | ---        | ---            | ------- | ---  | ---     | ---       | -------------------- | --- |
   |                                                                                           |             |     |            |               |         |     |         |           |                      |     |
   | 32                                                                                        |             |     |            |                |         |      |         |           | Sistemas de Controle |     |

1.4
1.2
1
0.8
0.6
0.4
0.2
0
0 1 2 3 4 5 6 7 8 9 10
Tempo
Sistemas de Controle 33
atsopseR
Resposta no Tempo
M = 13.96%
P
Com Controlador
t = 7.65seg.
s
Sem Controlador
4.4.1 Regras de Zigler-Nichols para o Ajuste dos Parâmetros do PID
Conforme apresentado anteriormente, o problema de controle consiste em determinar
uma forma, normalmente, mediante o projeto de controladores, de afetar um dado sistema
físico de modo a satisfazer certas especificações de desempenho.
Também sabemos que, apesar de todo o avanço tecnológico dos últimos anos, com o
surgimento de soluções avançadas, tanto em termos de algoritmos de controle quanto de
hardware, os controladores PID, e suas variações, ainda são, com larga vantagem, os mais
usados na indústria. Os argumentos, para essa massiva predominância do PID, vão desde a
simplicidade, à facilidade de implementação e manutenção. A maioria desses argumentos se
justifica pelo número reduzido de parâmetros sintonizáveis existentes nos PIDs. Embora,
algumas versões de PIDs, trazidas em CLPs e instrumentos de redes industriais, apresentem
um número elevado de parâmetros a serem ajustados, a estrutura básica de um PID contém
apenas três parâmetros: O ganho proporcional – k , a constante de tempo integrativo τ (ou o
P i
ganho integrativo k), e, a constante de tempo derivativo τ (ou o ganho derivativo k ).
i d d
O ajuste dos parâmetros de um controlador é chamado de sintonia (tuning). Quando se
tem um modelo matemático, representativo, do sistema, a escolha dos parâmetros do
controlador recai no desenvolvimento de um projeto, que pode ser feito com base mo método
do lugar geométrico das raízes, dentre outros. Como, nem sempre é possível se obter um
modelo, que represente, adequadamente, a dinâmica que se deseja controlar, se fez necessário
o surgimento de técnicas, que não dependessem de modelo, para sintonia do controlador.
Zigler e Nichols propuseram dois métodos para sintonia de controladores PID baseadas em
experimentação e, conseqüentemente, independentes da existência de um modelo matemático
do sistema. Ambas visam, basicamente, a obtenção de 25% de sobre-sinal máximo, na
resposta ao degrau.

• Primeiro Método de Ziegler-Nichols
Plantas que não envolvam integrador(es), ou, pólos complexos conjugados dominantes,
tendem a apresentar uma curva de resposta ao degrau em forma de S.

y
Reta tangente no
ponto de inflexão
K
Tempo

|     | L   | T   |     |     |
| --- | --- | --- | --- | --- |

Este tipo de curva pode ser caracterizado por duas constantes: tempo de retardo (L) e
constante de tempo (T). Essas constantes são determinadas traçando-se uma reta, tangente ao
ponto de inflexão da curva de resposta, e encontrando-se os pontos de interseção dessa reta
com o eixo dos tempos e com uma reta dada por y(t) = K. Uma vez determinadas estas
constantes, elas são usadas para determinação dos parâmetros do controlador, de acordo com
a seguinte tabela:

Tipo de

|     |             | K     | τ   | τ   |
| --- | ----------- | ----- | --- | --- |
|     | Controlador | P     | i   | d   |
| T   |
|     | P           |       | ∞   | 0   |
| --- | ---         | ---   | --- | --- |
| L   |
|     |             | T     | L   |     |
| --- | ----        | ----- | --- | --- |
|     | PI          | 0,9   |     | 0   |
|     |             | L     | 0,3 |     |
|     |             | T     |     | L   |
|     | PID         | 1,2   | 2L  |     |
|     |             | L     |     | 2   |

EXEMPLO: Considere uma planta com modelo matemático desconhecido. Uma entrada,
tipo degrau unitário foi imposta a essa planta e amostras, de sua saída, foram colhidas,
experimentalmente, a cada 0,1 segundos. O resultado desse ensaio pode ser visto na curva de
resposta apresentada na figura a seguir.

| 34  |     |     |     | Sistemas de Controle |
| --- | --- | --- | --- | -------------------- |

Resposta ao Degrau
1
0.9
0.8
0.7
0.6
0.5
0.4
0.3
0.2
0.1
0
0 1 2 3 4 5 6 7 8 9 10
Tempo
Sistemas de Controle 35
edutilpmA
Referencia
Resposta
Utilizando-se métodos numéricos (Diferenciação Numérica por Diferenças Finitas
Centrais) determinou-se que o ponto de inflexão da curva ocorre aos 0,7 segundos, com
amplitude de 0,1270. Determinou-se, então, tomando um ponto anterior e um ponto posterior
a este, a reta tangente ao ponto de inflexão (y = 0,2495t – 0,0477).
Resposta ao Degrau: L = 0.19104 e T = 2.0041
0.5
0.45
0.4
0.35
0.3
0.25
0.2
0.15
0.1
0.05
0
0 1 2 3 4 5 6 7 8 9 10
Tempo
edutilpmA
Uma vez determinada a reta tangente, determinou-se: L ≈ 0,2 e T ≈ 2,0.

De posse desses valores, fazendo-se uma breve consulta à tabela proposta por Ziegler e
Nichols, tem-se os seguintes parâmetros para um controlador PID: k = 12,5886, τ = 0,3821 e

|                                                                                             |     |           |             |     | P   | i   |
| ------------------------------------------------------------------------------------------- | --- | --------- | ----------- | --- | --- | --- |
| τ = 0,0955. Com esta sintonia, a planta com o controlador apresentaram a seguinte resposta: |
| d                                                                                           |
| Resposta ao Degrau: Kp = 12,5886, Ti = 0,3821 e Td = 0,0955                                 |
| 1.8                                                                                         |
|                                                                                             | M   | = 66.19%  |             |     |     |     |
| ---                                                                                         | --- | --------- | ---         | --- | --- | --- |
| P                                                                                           |
| 1.6                                                                                         |
| 1.4                                                                                         |
| 1.2                                                                                         |
| atsopseR                                                                                    | 1   |           |             |     |     |     |
| --------                                                                                    | --- | ---       | ----------- | --- | --- | --- |
|                                                                                             |     |           | t = 5seg.   |     |     |     |
| 0.8                                                                                         |
| s                                                                                           |
| 0.6                                                                                         |
| 0.4                                                                                         |
| 0.2                                                                                         |
| 0                                                                                           |
|                                                                                             | 0 1 | 2 3       | 4 5         | 6 7 | 8 9 | 10  |
| ---                                                                                         | --- | ---       | ---         | --- | --- | --- |
| Tempo                                                                                       |

Os métodos de Ziegler-Nichols fornecem uma estimativa inicial para os parâmetros do
controlador. Caso a resposta do sistema controlado não seja satisfatória, com os parâmetros
fornecidos pelo método de Ziegler-Nichols, o projetista deverá determinar alterações nestes
parâmetros para as quais o sistema funcione satisfatoriamente.
Resposta ao Degrau: Kp = 8,57, Ti = 1,40 e Td = 0,35
1.4
M = 17.81%

|             | 1.2 | P   |     |     |     |     |
| ----------- | --- | --- | --- | --- | --- | --- |
| 1           |
| t = 3.9seg. |
| 0.8         |
| atsopseR    |     |     | s   |     |     |     |
| --------    | --- | --- | --- | --- | --- | --- |
| 0.6         |
| 0.4         |
| 0.2         |
| 0           |
|             | 0 1 | 2 3 | 4 5 | 6 7 | 8 9 | 10  |
| ---         | --- | --- | --- | --- | --- | --- |
| Tempo       |

| 36  |     |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | --- | -------------------- | --- |

• Segundo Método de Ziegler-Nichols
Este método consiste em determinar o valor de ganho proporcional, que torna o sistema
marginalmete estável, com sua saída apresentando oscilações mantidas. Esse valor de ganho é
chamado de ganho crítico, K .
cr
y
P
cr
Tempo
Como os métodos de Ziegler e Nichols são, essencialmente, experimentais, aplicados a
sistemas para os quais não se dispõe de modelos matemáticos, a obtenção, na prática, do
ganho crítico, consiste em, uma vez implementado um controlador PID, ele é configurado
para funcionar como um controlador P (τ = ∞ e τ = 0). O ganho proporcional é aumentado
i d
até que a saída do sistema apresente oscilações mantidas. Tal valor de ganho será o ganho
crítico, K , e o período de tais oscilações será chamado de período crítico, P . Uma vez
cr cr
determinadas estas constantes, elas são usadas para determinação dos parâmetros do
controlador, de acordo com a seguinte tabela:
Tipo de
K τ τ
Controlador P i d
P 0,5K ∞ 0
cr
0,5P
PI 0,45K cr 0
cr 1,2
PID 0,6K 0,5P 0,125P
cr cr cr
Os métodos de Ziegler-Nichols, para determinação dos parâmetros de controladores
PIDs, têm sido amplamente utilizados e sua importância é indiscutível. Porém, é importantes
notarmos que:

1. Em sistemas cuja resposta ao degrau não tem forma de S, não é possível
   aplicar o primeiro método de Ziegler-Nichols;
2. Em sistemas que não se tornam marginalmente estável para nenhum ganho,
   não é possível aplicar o segundo método de Ziegler-Nichols; e,
3. Os métodos de Ziegler-Nichols fornecem, apenas, uma estimativa inicial para
   os parâmetros do controlador, sendo necessário, em muitos casos, um ajuste
   fino desses parâmetros, por parte do projetista.
   Sistemas de Controle 37

EXEMPLO: Considere uma planta com modelo matemático desconhecido. Uma entrada,
tipo degrau unitário foi imposta a essa planta e amostras, de sua saída, foram colhidas,
experimentalmente, a cada 0,1 segundos. O resultado desse ensaio pode ser visto na curva de
resposta apresentada na figura a seguir.
Resposta ao Degrau
1
0.9
0.8
0.7
0.6
0.5
0.4
0.3
0.2
0.1
0
0 5 10 15 20 25 30 35 40 45 50
Tempo
38 Sistemas de Controle
edutilpmA
Referencia
Resposta
Como a curva de resposta não tem forma de S, o primeiro método de Ziegler-Nichols não
se aplica. É introduzido um ganho ajustável na malha do sistema e, após algumas tentativas,
determina-se o ganho que faz com que o sistema tenha oscilações mantidas, K = 4,00. e o
cr
período dessas oscilações, P = 6,3s.
cr
Resposta ao Degrau com Ganho Crítico, K = 4
cr
1.6
1.4
1.2
1
0.8
0.6
0.4
0.2
0
0 5 10 15 20 25 30 35 40 45 50
Tempo
edutilpmA
P = 6.3s cr

De posse desses valores, fazendo-se uma breve consulta à tabela proposta por Ziegler e
Nichols, tem-se os seguintes parâmetros para um controlador PID: k = 2,4000, τ = 3,1500 e

|                                                                                               |     |               |       |       | P     | i   |
| --------------------------------------------------------------------------------------------- | --- | ------------- | ----- | ----- | ----- | --- |
| τ = 0,7875. Com esta sintonia, a planta, com o controlador, apresentaram a seguinte resposta: |
| d                                                                                             |
| Resposta ao Degrau: Kp = 2,40, Ti = 3,15 e Td = 0,79                                          |
|                                                                                               | M   | = 26.64%      |       |       |       |     |
| ---                                                                                           | --- | ---------     | ---   | ---   | ---   | --- |
| P                                                                                             |
| 1.2                                                                                           |
| 1                                                                                             |
|                                                                                               | 0.8 | t = 8.6seg.   |       |       |       |     |
| ---------                                                                                     | --- | ------------- | ---   | ---   | ---   | --- |
| edutilpmA                                                                                     |     | s             |       |       |       |     |
| 0.6                                                                                           |
| 0.4                                                                                           |
| 0.2                                                                                           |
| 0                                                                                             |
|                                                                                               | 0 5 | 10 15         | 20 25 | 30 35 | 40 45 | 50  |
| ---                                                                                           | --- | -----         | ----- | ----- | ----- | --- |
| Tempo                                                                                         |

Sempre é possível, a partir dos valores fornecidos pelos métodos de Ziegler-Nichols,
buscar um ajuste melhor do controlador, de acordo com a experiência do projetista. Neste
caso, apenas aumentando, em 50%, o valor de k , obtém-se a seguinte resposta:
d
Resposta ao Degrau
M = 16.3%
1.2 P
1
t = 6.8seg.

|           | 0.8 | s     |       |       |       |     |
| --------- | --- | ----- | ----- | ----- | ----- | --- |
| edutilpmA |
| 0.6       |
| 0.4       |
| 0.2       |
| 0         |
|           | 0 5 | 10 15 | 20 25 | 30 35 | 40 45 | 50  |
| ---       | --- | ----- | ----- | ----- | ----- | --- |
| Tempo     |

| Sistemas de Controle |     |     |     |     |     | 39  |
| -------------------- | --- | --- | --- | --- | --- | --- |

4.5 Projeto de Controladores Avanço de Fase
A FT de um controlador avanço de fase é:
1
s+
T s+ z
G (s) = K = K , com: 0< α <1 ( 4.5 )
c c 1 c s+ p
s+
αT
É utilizado quando o sistema tem um transitório insatisfatório e regime bom.
• Passos para o projeto de controladores Avanço de Fase

1. Traduzir as especificações de desempenho em termos de uma localização desejada de
   pólos dominantes de malha fechada
2. Verificar se o objetivo não pode ser atingido com um controlador Proporcional
3. Se o controlador avanço de fase é necessário, posicionar o zero do controlador em um
   local adequado
4. Determinar a localização do pólo do controlador de modo que a condição de ângulo
   seja satisfeita
5. Calcular o ganho total requerido, aplicando a condição de módulo
6. Calcular a constante de erro estacionário
7. Se a constante não for adequada, tentar um outro controlador, voltando ao passo 3.
8. Simular o sistema com o controlador e observar o comportamento da resposta. Caso
   não seja satisfatório, tentar um ajuste fino dos parâmetros do controlador (K e z)
   c
   4
   EXEMPLO: Dado o sistema G(s) = . Projetar um controlador G (s) para que
   c
   s(s+2)
   ω = 4 rad/s sem modificar o fator de amortecimento.
   n
   Da FT de MF, temos: ω = 2,0 e ζ=0,5. Logo, para as especificações dadas, os pólos
   n
   dominantes de malha fechada devem estar em -2 ± 3,4641i.
   Fazendo-se uma breve análise do LGR do sistema original com relação aos pólos
   desejados, verifica-se que o zero do controlador deve está à esquerda dos pólos de MA do
   sistema original. Foi escolhido, empiricamente, z = 3,0. A partir daí, aplicando o critério do
   ângulo calculamos p = 5,6 e aplicando o critério do módulo obtemos que o ganho total do
   sistema será: K =19,2. Como o sistema originalmente já tem um ganho K = 4,0 o ganho do
   t
   controlador será: K = K K = 4,8.
   c t
   40 Sistemas de Controle

Resposta no Tempo
1.4

|                 | M   | = 21.13%         |     |     |     |     |
| --------------- | --- | ---------------- | --- | --- | --- | --- |
| P               |
|                 | 1.2 | Com Controlador  |     |     |     |     |
| ---             | --- | ---------------- | --- | --- | --- | --- |
| Sem Controlador |
| 1               |
|                 | 0.8 | t = 2.24seg.     |     |     |     |     |
| --------        | --- | --------------   | --- | --- | --- | --- |
| atsopseR        |     | s                |     |     |     |     |
| 0.6             |
| 0.4             |
| 0.2             |
| 0               |
|                 | 0 1 | 2 3              | 4 5 | 6 7 | 8 9 | 10  |
| ---             | --- | ---              | --- | --- | --- | --- |
| Tempo           |

Sinal de Controle no Tempo
5
4
3
elortnoC ed laniS
2
1
0
-1

|       | 0 1 | 2 3 | 4 5 | 6 7 | 8 9 | 10  |
| ----- | --- | --- | --- | --- | --- | --- |
| Tempo |

| Sistemas de Controle |     |     |     |     |     | 41  |
| -------------------- | --- | --- | --- | --- | --- | --- |

4.6 Projeto de Controladores Atraso de Fase
A FT de um controlador atraso de fase é:
1
s+

|                                                                                       |        |         |       | K    |        | s+  | z         |      |     |         |
| ------------------------------------------------------------------------------------- | ------ | ------- | ----- | ---- | ------ | --- | --------- | ---- | --- | ------- |
|                                                                                       |        |         |       | c    | T      |     |           |      |     |         |
|                                                                                       |        | G       | (s) = |      | =      | K   | , com β>1 |      |     | ( 4.6 ) |
|                                                                                       |        |         | c     |      | 1      | c   |           |      |     |         |
|                                                                                       |        |         |       | β    |        | s+  | p         |      |     |         |
| s+                                                                                    |
| βT                                                                                    |
| O objetivo do controlador é melhorar o regime, sem alterar significativamente o       |
| transitório.                                                                          |
| Sabemos que: K =limsG(s). Logo, com o controlador em série com a planta, temos        |
| v                                                                                     |
| s→0                                                                                   |
| que: Kv                                                                               | =limsG | (s)G(s) | =limG | (s)K |        |     |           |      |     |         |
| -------                                                                               | ------ | ------- | ----- | ---- | ---    | --- | ---       | ---  | --- | ---     |
|                                                                                       | comp   | c       |       | c    | v      |     |           |      |     |         |
|                                                                                       | s→0    |         | s→0   |      |        |     |           |      |     |         |
|  1                                                                                  |
|                                                                                     |
| K                                                                                     |
| c  T                                                                                |
| onde: Kv                                                                              | =      |         | K = K | K    |        |     |           |      |     |         |
| --------                                                                              | ----   | -----   | ----- | ---  | ---    | --- | ---       | ---  | --- | ---     |
|                                                                                       | comp   |  1    | v     | c v  |        |     |           |      |     |         |
| β                                                                                     |
|                                                                                     |
| βT                                                                                  |
| Aplicando a condição de módulo para o sistema com o controlador e considerando que os |
| pólos de malha fechada não terão grandes alterações, temos:                           |
| 1                                                                                     |
| s+                                                                                    |
| K                                                                                     |
| c T                                                                                   |
|                                                                                       |        |         |       | G(s) | =1 ⇒ K |     | ≅β ⇒ Kv   | ≅βK  |     |         |
| ---                                                                                   | ---    | ---     | ---   | ---- | ------ | --- | -------   | ---- | --- | ---     |
|                                                                                       |        |         | 1     | s    |        | c   |           | comp | v   |         |
|                                                                                       |        | β       |       | 1    |        |     |           |      |     |         |
| s+                                                                                    |
| βT                                                                                    |
| s                                                                                     |
| 1                                                                                     |
|                                                                                       | Logo:  |         |       |      |        | 1   |           |      |     |         |
| ---                                                                                   | ------ | ---     | ---   | ---  | ---    | --- | ---       | ---  | --- | ---     |
| s+                                                                                    |
| T                                                                                     |
|                                                                                       |        |         |       | G    | (s) ≅  |     |           |      |     |         |
| ---                                                                                   | ---    | ---     | ---   | ---  | -----  | --- | ---       | ---  | --- | ---     |
| ( 4.7 )                                                                               |
|                                                                                       |        |         |       |      | c      | 1   |           |      |     |         |
| ---                                                                                   | ---    | ---     | ---   | ---  | ---    | --- | ---       | ---  | --- | ---     |
| s+                                                                                    |
| βT                                                                                    |
| • Passos para o projeto de controladores Atraso de Fase                               |

1. Determine o ganho de malha aberta utilizando a condição de módulo
2. Calcule o coeficiente de erro particular especificado para o problema
3. Determine a quantidade de aumento no coeficiente de erro necessária para atender as
   especificações
4. Determine o pólo e o zero do controlador que produz o aumento necessário, sem
   alterar significativamente o LGR original (próximos entre si e próximos da origem).
5. Simular o comportamento do sistema com o controlador, voltando ao passo 4, caso
   necessário
   | 42  |     |     |     |     |     |     |     |     | Sistemas de Controle |     |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | --- |

5
EXEMPLO: Dado G(s) = ; H(s) =1 . Projetar um controlador para que o sistema
s(s+2)
tenha um erro de regime para entrada rampa unitária igual a 1/20, sem alterar
significativamente o transitório.
Calculando, com relação ao sistema original, a constante de erro estacionário para uma
entrada tipo rampa, temos K = 2,5. Dos requisitos de projeto, temos que Kv = 20. Logo,

|                                                                                            |            | V   |     |     | comp |     |
| ------------------------------------------------------------------------------------------ | ---------- | --- | --- | --- | ---- | --- |
| Kv ≅βK ⇒β≅8. Uma boa escolha para o zero do controlador costuma ser z =0,1, que            |
| comp                                                                                       | v          |     |     |     |      |     |
| ----                                                                                       | ---        | --- | --- | --- | ---  | --- |
| corresponde a T =10. Com esses valores de z e β, temos que a FT do controlador é dada por: |
| (s+0,1)                                                                                    |
| G (s) =                                                                                    |            |     |     |     |      |     |
| -------                                                                                    | ---------- | --- | --- | --- | ---  | --- |
| C                                                                                          | (s+0,0125) |     |     |     |      |     |
| Resposta `a Rampa                                                                          |
| 10                                                                                         |
| Referencia                                                                                 |
| Sem Controlador                                                                            |
| Com Controlador                                                                            |
| atsopseR                                                                                   |
| 5                                                                                          |
| 0                                                                                          |
|                                                                                            | 0 1        | 2 3 | 4 5 | 6 7 | 8 9  | 10  |
| ---                                                                                        | ---        | --- | --- | --- | ---  | --- |
| Tempo                                                                                      |

| 1    |         |         |     | 1       |         |     |
| ---- | ------- | ------- | --- | ------- | ------- | --- |
| 0.5  |         |         |     | 0.5     |         |     |
| 0    |         |         |     | 0       |         |     |
| -0.5 |
| -0.5 |
| -1   |         |         |     | -1      |         |     |
| ---  | ------- | ------- | --- | ------- | ------- | --- |
|      | -2 -1.5 | -1 -0.5 | 0   | -2 -1.5 | -1 -0.5 | 0   |

| Sistemas de Controle |     |     |     |     |     | 43  |
| -------------------- | --- | --- | --- | --- | --- | --- |

Quanto maior for o valor de T, menor serão as alterações causados pelo controlador com
relação ao comportamento transitório do sistema original. Contudo, valores muito grandes de
T tendem a não ser implementáveis na prática.
Resposta no Tempo
1.4

|                 | 1.2 | M = 20.58% |     |     |     |     |
| --------------- | --- | ---------- | --- | --- | --- | --- |
| P               |
| Com Controlador |
| 1               |
| Sem Controlador |
| t = 3.84seg.    |
| 0.8             |
| atsopseR        |     |            | s   |     |     |     |
| --------        | --- | ---        | --- | --- | --- | --- |
| 0.6             |
| 0.4             |
| 0.2             |
| 0               |
|                 | 0 1 | 2 3        | 4 5 | 6 7 | 8 9 | 10  |
| ---             | --- | ---        | --- | --- | --- | --- |
| Tempo           |

4.7 Projeto de Controladores Atraso-Avanço de Fase
De uma maneira geral, a FT de um controlador atraso-avanço de fase é:

|                                                                    |     |           | 1         | 1   |     |         |
| ------------------------------------------------------------------ | --- | --------- | --------- | --- | --- | ------- |
|                                                                    |     |           |        |    |     |         |
|                                                                    |     |           | s+  s+ |    |     |         |
|                                                                    |     |           |  T     | T  |     |         |
|                                                                    |     | G (s) = K | 1         | 2   |     |         |
|                                                                    |     |           |           |     |     | ( 4.8 ) |
|                                                                    |     | c         | c γ    | 1  |     |         |
| s+ s+                                                           |
|                                                                   |
|                                                                    |     |           | T         | βT  |     |         |
| ---                                                                | --- | ---       | ----      | --- | --- | ---     |
|                                                                    |     |           |        |    |     |         |
|                                                                    |     |           | 1         | 2   |     |         |
| É utilizado quando o transitório e o regime estão insatisfatórios. |
| • Passos para o projeto de controladores atraso-avanço             |

1. Traduzir as especificações de desempenho em termos de uma localização desejada de
   pólos dominantes de malha fechada.
2. Determine a contribuição angular necessária φ para a rede em avanço
   | 3) Determine T | e γ através da condições de ângulo |     |     |     |                      |     |
   | -------------- | ---------------------------------- | --- | --- | --- | -------------------- | --- |
   | 1              |
   | 44             |                                    |     |     |     | Sistemas de Controle |     |
   | ---            | ---                                | --- | --- | --- | -------------------- | --- |

1
s +
T

|                |           |                                 |       | 1        | =φ               |       |     |
| -------------- | --------- | ------------------------------- | ----- | -------- | ---------------- | ----- | --- |
| γ              |
| s +            |
| T              |
| 1              |
| 4) Determine K |           | através da condição de módulo   |       |          |                  |       |     |
| -------------- | ---       | ------------------------------- | ---   | ---      | ---              | ---   | --- |
| c              |
|                |           |                                 | 1     | 1        |                  | 1     |     |
| ---            | --------- | ---                             | ----- | -------- | ---------------- | ----- | --- |
|                |           |                                 | s+ s+ |          |                  | s+    |     |
|                |           |                                 | T     | T        |                  | T     |     |
|                | G (s)G(s) | =1=                             | 1     | 2 K G(s) | ; considerando:  | 2 ≅1  |     |
|                | c         |                                 |       | c        |                  |       |     |
|                |           | s 1                             | γ     | 1        | s 1              | 1     |     |
|                |           |                                 | s+ s+ |          | s+               |       |     |
|                |           |                                 | T     | βT       |                  | βT    |     |
|                |           |                                 | 1     | 2        |                  | 2     |     |
|                |           |                                 | s 1   | s 1      |                  | s 1   |     |

5. Determine β a partir das exigências de erro: Kv =limsG (s)G(s) =
   comp c
   s→0
   |                                                                                            | β   | β   |     |     |     |     |     |
   | ------------------------------------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
   | = limsK G(s) = K K , e, escolha T de modo que a contribuição angular da parte em           |
   |                                                                                            | c   | c   | V   | 2   |     |     |     |
   | ---                                                                                        | --- | --- | --- | --- | --- | --- | --- |
   | s→0                                                                                        | γ   | γ   |     |     |     |     |     |
   | atraso esteja entre -5o e 0 o, e o módulo desta parte em s seja aproximadamente a unidade. |
   | 1                                                                                          |
6. Simular o sistema com o controlador e observar o comportamento da resposta. Caso
   não seja satisfatório, tentar um ajuste fino dos parâmetros do controlador.

4
EXEMPLO: Dado o sistema G(s) = ; H(s). Projetar um controlador atraso-
s(s+0.5)
avanço para que os pólos de malha fechada tenham ξ=0.5, ω =5 rad/s e para que o
n

| sistema tenha um Kv                                                                   |                  | =80. |     |     |               |     |     |
| ------------------------------------------------------------------------------------- | ---------------- | ---- | --- | --- | ------------- | --- | --- |
| comp                                                                                  |
| 4                                                                                     |
| Determinando a FT de MF da planta não controlada G (s) = , é fácil notar              |
|                                                                                       |                  |      |     |     | mf s2 +0,5s+4 |     |     |
| ---                                                                                   | ---              | ---  | --- | --- | ------------- | --- | --- |
| que: ξ=0,125, ω = 2 rad /s. Além disso podemos observar que os pólos de MF do sistema |
| n                                                                                     |
| se localizam em: s =-0,25 ± 1,98i. De G(s) temos ainda que K = limsG(s) =8.           |
|                                                                                       |                  | 1,2  |     |     | v s→0         |     |     |
| ---                                                                                   | ---              | ---  | --- | --- | -----         | --- | --- |
| Das especificações de projeto, temos que os pólos dominantes de malha fechada devem   |
| estar em s                                                                            | =-2,50 ± 4,33i.  |      |     |     |               |     |     |
| ----------                                                                            | ---------------- | ---  | --- | --- | ---           | --- | --- |
| 1,2                                                                                   |
| 1                                                                                     |
| s+                                                                                    |
| T                                                                                     |
| 1                                                                                     |
| A partir dos pólos de MF da planta não controlada, temos: =180°.                      |
| γ                                                                                     |
| s+                                                                                    |
| T                                                                                     |
| 1                                                                                     |
| s=−0,25+1,98i                                                                         |
| Sistemas de Controle                                                                  |                  |      |     |     |               |     | 45  |
| ---------------------                                                                 | ---              | ---  | --- | --- | ---           | --- | --- |

1
s+
T

| A partir dos pólos desejados, temos:                                    |               |             |         |         | 1   | ≅ 235°. |     |
| ----------------------------------------------------------------------- | ------------- | ----------- | ------- | ------- | --- | ------- | --- |
| γ                                                                       |
| s+                                                                      |
| T                                                                       |
| 1                                                                       |
| s=-2,50 + 4,33i                                                         |
| Logo a contribuição de fase da rede em avanço é de: φ= −180°+θ +θ ≅55°. |
|                                                                         |               |             |         |         |     |         | 1 2 |
| ---                                                                     | ------------- | ------      | ------- | ---     | --- | ---     | --- |
|                                                                        |               | 4,33      |         |         |     |         |     |
|                                                                         | θ =180°−ATAN |             |  ≅120° |         |     |         |     |
|  1                                                                     |
|                                                                        |               | 2,50      |         |         |     |         |     |
| ------                                                                  | ------------- | ----------- | ----    | ------- | --- | ---     | --- |
| onde:                                                                  |               |             |         |         |     |         |     |
|                                                                        |               |            | 4,33    |        |     |         |     |
|                                                                         | θ =180°−ATAN |             |         |  ≅115° |     |         |     |
|                                                                        | 1             | 2,50−0,50 |         |         |     |         |     |
|                                                                        |
| 3                                                                       |
| s=-2,50+4,33i                                                           |
| (cid:0)                                                                 |
| 2                                                                       |
| 1                                                                       |
| 0                                                                       |
| -1                                                                      |
| -2                                                                      |
| -3                                                                      |
|                                                                         |               |             | -4      | -3      | -2  | -1      | 0   |
| ---                                                                     | ---           | ---         | ---     | ---     | --- | ---     | --- |

É fácil notar que infinitas combinações de T e γ podem gerar a contribuição de fase
1
desejada. Sendo assim, é necessário fixar, aleatoriamente, algum dos parâmetros. Neste caso,
o zero da rede em avanço pode ser posicionado em s = -0,5, acarretando em um cancelamento
matemático um dos pólos da planta. A partir daí, com a posição do zero e a contribuição de
fase, a posição do pólo é determinada como sendo aproximadamente em s = -5,0, ou seja,
T = 2 e γ=10
1
Agora, do critério de módulo, temos:

|                                                                                     | s+0,5 | 4        |               |     | s(s+5) |               | 25                   |
| ----------------------------------------------------------------------------------- | ----- | -------- | ------------- | --- | ------ | ------------- | -------------------- |
|                                                                                     | K     |          |               | =1⇒ | K =    |               | = =6,25              |
|                                                                                     | c s+5 | s(s+0,5) |               |     | c 4    |               | 4                    |
|                                                                                     |       |          | s=−2,50+4,33i |     |        | s=−2,50+4,33i |                      |
| A partir do erro de velocidade estático desejado Kv =80 e dos valores anteriormente |
| comp                                                                                |
| γKv                                                                                 |
| calculados, temos: β=                                                               |       | comp     | =16           |     |        |               |                      |
| ---------------------                                                               | ---   | ----     | ----          | --- | ---    | ---           | ---                  |
| K K                                                                                 |
| V c                                                                                 |
| Como qualquer valor de T ≥5 satisfaz a condição de ângulo, é assumido que T =5.     |
| 2 2                                                                                 |
| Conclui-se assim o projeto do controlador.                                          |
| 46                                                                                  |       |          |               |     |        |               | Sistemas de Controle |
| ---                                                                                 | ---   | ---      | ---           | --- | ---    | ---           | -------------------- |

Resposta no Tempo
1.8

|                 | 1.6 | Sem Controlador |     |     |     |     |
| --------------- | --- | --------------- | --- | --- | --- | --- |
| 1.4             |
|                 | M   | = 19.88%        |     |     |     |     |
| ---             | --- | ---------       | --- | --- | --- | --- |
| 1.2 P           |
| Com Controlador |
| atsopseR        | 1   |                 |     |     |     |     |
| --------        | --- | --------------  | --- | --- | --- | --- |
|                 | 0.8 | t = 1.26seg.    |     |     |     |     |
| s               |
| 0.6             |
| 0.4             |
| 0.2             |
| 0               |
|                 | 0 1 | 2 3             | 4 5 | 6 7 | 8 9 | 10  |
| ---             | --- | ---             | --- | --- | --- | --- |
| Tempo           |

7
6
5
4
elortnoC ed laniS
3
2
1
0
-1
-2

|       | 0 1 | 2 3 | 4 5 | 6 7 | 8 9 | 10  |
| ----- | --- | --- | --- | --- | --- | --- |
| Tempo |

| Sistemas de Controle |     |     |     |     |     | 47  |
| -------------------- | --- | --- | --- | --- | --- | --- |

10
5
0
0 1 2 3 4 5 6 7 8 9 10
Tempo
48 Sistemas de Controle
atsopseR
Resposta no Tempo
Com Controlador
Sem Controlador

4.8 Exercícios

1. Considere o exemplo da seção 4.2. Verifique, através de simulação, a resposta do
   sistema com o controlador PD projetado: variando-se o ganho do controlador:
   a. Variando-se o ganho do controlador de 1 à 5, com incremento de 0,5;
   b. Variando-se o ganho do controlador de 1 à 2, com incremento de 0,1;
   c. Variando-se a posição do zero do controlador de 0,1 à 3,1, com incremento de
   0,5. Lembrar de recalcular o ganho;
   d. Variando-se a posição do zero do controlador de 0,4 à 0,8, com incremento de
   0,05. Lembrar de recalcular o ganho;
2. Para cada um dos sistemas dados a seguir, projetar o controlador indicado para
   satisfazer as especificações dadas:
   1
   a. G(s) = . Projetar um PD para que em MF ξ=0,7,
   10000(s2 −1,1772)
   ω =0,5 rad/s.
   n
   820
   b. G(s) = . Projetar um controlador em atraso para que o fator
   s(s+10)(s+20)
   de amortecimento dos pólos dominantes permaneça em ξ=0,6, mas, a
   constante de erro de velocidade estático aumente para Kv = 41s−1.
   comp
   1
   c. G(s) = . Projetar um controlador em atraso-avanço para que o
   s(s+1)(s+5)
   fator de amortecimento dos pólos dominantes seja ξ= 0,5, e, a constante de
   erro de velocidade estático seja Kv =50s−1 (escolher o zero da porção em
   comp
   avanço de forma a cancelar o pólo da planta em s = -1).
   2
3. Seja G(s) = , verifique através de simulação a resposta do sistema com um
   s2 +2s+1
   controlador PI, com os seguintes parâmetros:
   a. Kc = 1,00; z = 0.01;
   b. Kc = 1,00; z = 0.05;
   c. Kc = 1,00; z = 0.10;
   d. Kc = 1,00; z = 0.25;
   e. Kc = 1,00; z = 0.50;
   f. Kc = 2,50; z = 0.25;
   g. Kc = 5,00; z = 0.25;
   Sistemas de Controle 49

5 APROXIMAÇÃO DISCRETA DE FUNÇÕES DE TRANSF. CONTÍNUAS
5.1 Introdução
Muitas vezes um sistema analógico de controle é substituído por um sistema de controle
digital devido às vantagens deste último sistema, particularmente no que toca à comunicação
e flexibilidade. Nestes casos, é natural pensarmos em métodos que convertem um sistema
analógico (contínuo) para um sistema digital (discreto) com características semelhantes. Um
caminho para isto é usar um curto período de amostragem e fazer algumas aproximações
discretas a partir do controlador contínuo.
H(z) ≈ G(s)
u(t) u(kT) y(kT) y(t)
A / D Algoritmo D / A
Relógio
5.2 Aproximações por Integração Numérica
Uma função de transferência representa uma equação diferencial. Assim sendo, é natural
obter uma equação de diferenças cuja solução é a aproximação para a equação diferencial.
Existem três formas básicas de fazer esta aproximação: método Forward (ou método de
Euler), método Backward e método Tustin (ou método de trapezoidal).
Supondo que os valores dos sinais de entrada e saída de um sistema contínuo são
medidos a cada T segundos e que este período T é suficientemente pequeno, podemos obter
uma equação de diferenças que modela aproximadamente a relação entre um sinal de entrada
t
u(t) e sua integral y(t)= ∫u(τ)dτ, ou seja:
o
Y(s) 1
G(s)= = ( 5.1 )
U(s) s
• Método de Euler ou Forward
Baseia-se na seguinte equação de diferenças, resultado do método de integração
numérica de Euler; y = y +Tu ; ou seja:
k k−1 k−1
Y(z) T
H(z)= = ( 5.2 )
U(z) z−1
Comparando as equações ( 5.1 ) e ( 5.2 ), concluímos que nesta aproximação:
50 Sistemas de Controle

z−1

|                                                                                                |     | s=      |             |          |
| ---------------------------------------------------------------------------------------------- | --- | ------- | ----------- | -------- |
|                                                                                                |     |         |             | ( 5.3 )  |
| T                                                                                              |
| Neste caso, podemos mostrar que o semi-plano esquerdo do plano s é mapeado para a              |
| região mostrada na figura abaixo, a qual inclui o círculo unitário. Assim sendo, neste tipo de |
| aproximação é possível que um sistema contínuo estável (pólos em s no semi-plano esquerdo)     |
| seja transformado em um sistema discreto instável (pólos em z fora do círculo unitário).       |
| Plano s Plano z                                                                                |
| Método Forward                                                                                 |
| Im Im                                                                                          |
| Semi-plano Esquerdo                                                                            |
|                                                                                                |     | Re      |             | Re       |
| ---                                                                                            | --- | ---     | ---         | ---      |
| Círculo Unitário                                                                               |
| • Método Backward                                                                              |
| Baseia-se na seguinte equação de diferenças, resultado do método de integração                 |
| numérica semelhante ao de Euler; y                                                             |     | = y +Tu | ; ou seja,  |          |
| ----------------------------------                                                             | --- | ------- | ----------- | -------- |
|                                                                                                |     | k k−1   | k           |          |
|                                                                                                |     | Y(z)    | Tz          |          |
|                                                                                                |     | H(z)=   | =           | ( 5.4 )  |
|                                                                                                |     | U(z)    | z−1         |          |
| Comparando as equações ( 5.1 ) e ( 5.4 ), concluímos que nesta aproximação:                    |
| z−1                                                                                            |
|                                                                                                |     | s=      |             | ( 5.5 )  |
| ---                                                                                            | --- | ---     | ---         | -------- |
| Tz                                                                                             |
| Neste caso, podemos mostrar que o semi-plano esquerdo do plano s é mapeado para a              |
| região mostrada na figura abaixo, a qual está contido no círculo unitário. Assim sendo, neste  |
| tipo de aproximação, um sistema contínuo estável sempre será transformado em um sistema        |
| discreto estável. Porém, podemos ter sistemas contínuos instáveis transformados em sistemas    |
| discretos estáveis.                                                                            |
| Plano s Plano z                                                                                |
| Método Backward                                                                                |
| Im Im                                                                                          |
| Semi-plano Esquerdo                                                                            |
|                                                                                                |     | Re      |             | Re       |
| ---                                                                                            | --- | ---     | ---         | ---      |
| Círculo Unitário                                                                               |
| Sistemas de Controle                                                                           |     |         |             | 51       |
| ---------------------                                                                          | --- | ---     | ---         | ---      |

• Método Trapezoidal, Tustim ou Aproximação Bilinear
Esta aproximação corresponde ao método dos trapézios para integração numérica, que
u +u

|                                                                                            |       |              | k k−1            |         |          |
| ------------------------------------------------------------------------------------------ | ----- | ------------ | ---------------- | ------- | -------- |
| corresponde à seguinte equação de diferenças; y = y +T ; ou seja:                          |
|                                                                                            |       | k            | k−1 2            |         |          |
| ---                                                                                        | ----- | ------------ | -----            | ---     | -------- |
|                                                                                            |       | Y(z) T (z+1) |                  |         |          |
|                                                                                            | H(z)= | =            |                  |         |          |
|                                                                                            |       |              |                  |         | ( 5.6 )  |
|                                                                                            |       | U(z) 2 (z−1) |                  |         |          |
| Comparando as equações ( 5.1 ) e ( 5.6 ), concluímos que nesta aproximação:                |
| 2 z−1                                                                                      |
|                                                                                            |       | s=           |                  |         |          |
| ---                                                                                        | ---   | ----         | ---              | ---     | -------- |
|                                                                                            |       |              |                  |         | ( 5.7 )  |
| T z+1                                                                                      |
| Neste caso, podemos mostrar que o semi-plano esquerdo do plano s é transformado no         |
| círculo unitário, como mostra a figura abaixo. Neste caso, sistemas contínuos estáveis são |
| transformados em sistemas discretos estáveis e sistemas contínuos instáveis são            |
| transformados em sistemas discretos instáveis.                                             |
| Plano s                                                                                    |       |              |                  | Plano z |          |
| -------                                                                                    | ---   | ---          | ---              | ------- | ---      |
| Método Tustin                                                                              |
| Im Im                                                                                      |
| Semi-plano Esquerdo                                                                        |
|                                                                                            |       | Re           |                  |         | Re       |
| ---                                                                                        | ---   | ---          | ---------------- | ---     | ---      |
|                                                                                            |       |              | Círculo Unitário |         |          |
| 5.3 Invariância ao Degrau                                                                  |
| A idéia é utilizar uma equivalência de ordem zero de sistema G(s), considerando-o          |
| precedido por um Segurador de Ordem Zero (SOZ)                                             |
| H(z) ≈ G(s)                                                                                |
|                                                                                            | SOZ   | G(s)         |                  |         |          |
| ---                                                                                        | ---   | ----         | ---              | ---     | ---      |

Desta forma, a função de transferência discreta H(z), pode ser obtida a partir de G(s),
através da seguinte equação,

|     |       | z−1 G(s) |     |     |         |
| --- | ----- | ------------ | --- | --- | ------- |
|     | H(z)= | Z            |     |     |         |
|     |       |           |    |     | ( 5.8 ) |
|     |       |  z        | s  |     |         |

| 52  |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | -------------------- | --- |

5.4 Exercícios

1. Fazer as aproximações Forward, Backward, Tustin e Invariante ao Degrau para:
   1
   a) G(s) =
   s
   1
   b) G(s) =
   s2
   1
   c) G(s) =
   s+a
   s
   d) G(s) =
   s+a
   s
   e) G(s) = K
   s+a
   s
   f) G(s) =
   (
   s+a
   )2
   ω s
   g) G(s) =
   (s+a)2 +ω2
    1 
2. Um controlador PI continuo é descrito por K1+ .
    
   τs
    
   i
   a) Use a aproximação de Tustin para encontrar a representação discreta do
   controlador PI;
   b) Determine as relações entre os parâmetros contínuos K e τ e seus
   i
   correspondentes discretos.
   Sistemas de Controle 53

6 IMPLEMENTAÇÃO DE CONTROLADORES DIGITAIS
6.1 Introdução
O principal problema tratado neste capítulo é a implementação de algoritmos de controle
em computadores digitais. Uma vez escolhida uma lei de controle e obtida sua representação
discreta, é necessário implementá-la. Normalmente, não basta colocar a lei de controle na
forma de um código de computador, existem importantes considerações que não podem ser
desprezadas. É preciso, por exemplo, estabelecer comunicação com os sensores e atuadores e
criar interfaces homem-máquina (IHM).
Os detalhes da implementação dependem dos hardware e software usados. Supondo uma
implementação em um computador digital com relógio (RTC – Real Time Clock) e
conversores A/D e D/A, um esquema geral poderia ser representado da seguinte forma:
Computador Digital
r(t) + e(t) e(kT) u(kT) u(t) Planta y(t)
A / D Algoritmo D / A Atuadores ou
Processo
-

Relógio
Sensores
A lei de controle implementada no algoritmo computacional opera em ciclos, com
duração equivalente ao período de amostragem determinado para o sistema.
Relógio
Código Computacional:
Ler dados (A/D);
Calcular variável de controle;
Escrever dados (D/A);
6.2 Pré-Filtragem e Atraso Computacional
• Pré-Filtragem
Para evitar aliasing1 é necessário usar um pré-filtro analógico, antes de amostrar os sinais
dos sensores analógicos, visando eliminar distúrbios e ruídos com freqüências superiores a
freqüência de Nyquist. A pré-filtragem é fundamentalmente importante, quando existem
componentes de alta freqüência que podem contaminar o sinal amostrado.
1 Aliasing é um fenômeno que ocorre quando o sinal amostrado contém harmônicas maiores que a metade
da freqüência de amostragem.
54 Sistemas de Controle

Em alguns casos a solução mais simples é introduzir um filtro analógico na frente do
amostrador:
Relógio
y(t)

|     | r(t) + |        |     |     |      |     |     |     |     |      |     |     |
| --- | ------ | ------ | --- | --- | ---- | --- | --- | --- | --- | ---- | --- | --- |
|     |        | Filtro |     |     | C(z) |     |     | SOZ |     | G(s) |     |     |

-

Sensores
,
Um circuito analógico típico para um filtro de segunda ordem é:

|     | R   |     |     | R   |     |     |              |                |          |              |                |       |
| --- | --- | --- | --- | --- | --- | --- | ------------ | -------------- | -------- | ------------ | -------------- | ----- |
|     |     |     |     |     |     |     |              | Implementação, |          |              | através        | de    |
|     |     |     |     |     |     |     | amplificador |                |          | operacional, |                | de um |
| 2ζC |
|     |     |     |     |     |     |     | filtro       | de             | segunda  |              | ordem,         | com   |
| --- | --- | --- | --- | --- | --- | --- | -------      | ---            | -------- | ---          | -------        | ----  |
| R   |
| 3   |
| 1   |
|     |     |     |     |     |     |     | freqüência:  |                | ω=       |              | , e, função    | de    |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---            | ---      | ---          | -------------- | ---   |
| RC  |

-

transferência dada por ( 6.1 ), onde:
3C
ω é a largura de banda selecionada
B

|                | 2ζ  |     |     | +   |     |     |     |     |     |     |     |     |
| -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| para o filtro. |

ω2

|                                                                                            |         |       | G (s)         | =      |     |                      |         |         |       |         |               |         |
| ------------------------------------------------------------------------------------------ | ------- | ----- | ------------- | ------ | --- | -------------------- | ------- | ------- | ----- | ------- | ------------- | ------- |
|                                                                                            |         |       | f             |        | 2   |                      |         |         |       |         |               |         |
|                                                                                            |         |       |               |       | s  |                      |  s     |        |       |         |               | ( 6.1 ) |
|                                                                                            |         |       |               |       |    | +2ζω                |         |  +ω2   |       |         |               |         |
|                                                                                            |         |       |               |        | ω   |                      | ω       |         |       |         |               |         |
|                                                                                            |         |       |               |       |    |                      |        |        |       |         |               |         |
|                                                                                            |         |       |               |        | B   |                      |         | B       |       |         |               |         |
| Filtros de ordem superior podem ser obtidos pelo arranjo, em cascata, de vários filtros de |
| primeira e segunda ordem.                                                                  |
| • Atraso Computacional                                                                     |
| Tanto os conversores (A/D – D/A) quanto os cálculos computacionais requerem tempo,         |
| por isso, sempre existirá atraso quando uma lei de controle for implementada               |
| computacionalmente. Este atraso é chamado de atraso computacional, e, afeta o desempenho   |
| global do sistema controlado.                                                              |
|                                                                                            | y       |       |               |        |     |                      | y       |         |       |         |               |         |
| ---------------------                                                                      | ------- | ----- | ------------- | ------ | --- | -------------------- | ------- | ------- | ----- | ------- | ------------- | ---     |
| ossecorP ed leváiraV                                                                       |         |       |               |        |     | ossecorP ed leváiraV |         |         |       |         |               |         |
|                                                                                            |         |       | y(Tk+1)       |        |     |                      |         |         |       | y(Tk+1) |               |         |
|                                                                                            | y(Tk)   |       |               |        |     |                      |         |         | y(Tk) |         |               |         |
|                                                                                            | y(Tk-1) |       |               |        |     |                      | y(Tk-1) |         |       |         |               |         |
|                                                                                            |         |       |               | Tempo  |     |                      |         |         |       |         | Tempo         |         |
|                                                                                            | u       |       |               |        |     |                      | u       |         |       |         |               |         |
| elortnoC ed leváiraV                                                                       |         |       | u(Tk+1)       |        |     | elortnoC ed leváiraV |         |         |       |         | u(Tk+1)       |         |
|                                                                                            |         | u(Tk) |               |        |     |                      |         |         |       | u(Tk)   |               |         |
|                                                                                            |         |       |               | Atraso |     |                      |         | u(Tk-1) |       |         | Atraso        |         |
|                                                                                            |         |       | Computacional |        |     |                      |         |         |       |         | Computacional |         |
|                                                                                            |         |       |               | Tempo  |     |                      |         |         |       |         | Tempo         |         |
|                                                                                            | Tk-1 Tk |       | Tk+1          |        |     |                      | Tk-1    |         | Tk    | Tk+1    |               |         |
| Sistemas de Controle                                                                       |         |       |               |        |     |                      |         |         |       |         |               | 55      |

Existem basicamente duas possibilidades: A variável de processo medida no instante k
pode ser usada para calcular a ação de controle para o instante k+1, ou a variável de processo
medida no instante k é usada imediatamente no calculo da ação de controle, que, por sua vez,
deve ser enviada ao conversor D/A tão rápido quanto possível.
No primeiro caso, o atraso computacional é constante, o que é uma vantagem, porém é
igual ao período de amostragem, o que pode ser demasiado grande para alguns sistemas. Já no
segundo caso, o atraso normalmente será menor, porém dependerá de aspectos da
programação, e, para leis de controle não lineares poderá variar a cada ciclo.
6.3 Atuadores Não-Lineares
Grande parte dos métodos para o projeto de controladores baseia-se na teoria de sistemas
lineares, ou seja, partem do pressuposto de que o processo a ser controlado é linear. No
entanto, a maioria dos sistemas físicos reais apresentam algum tipo de não-linearidade. No
caso dos sistemas de controle, isso acontece, mas tipicamente, com os atuadores. Uma das
principais não-linearidades apresentadas por atuadores é a saturação.
Planta ou Processo
Atuador Dinâmica Linear
u(t) u (t) y(t)
p
Um dos principais atuadores encontrados em processos industriais são as válvulas.
Durante a abertura e fechamento as válvulas são aproximadamente lineares, porém, as
situações de totalmente aberta e totalmente fechada são exemplos típicos de não-linearidade
por saturação de atuador.
Existem, fundamentalmente, dois caminhos para lidar com essa realidade: Um é utilizar
técnicas de projeto que levem em conta as não-linearidades. Estes métodos costumam
envolver cálculos complexos, gerando assim, leis de controle também complexas. Outro
caminho é utilizar métodos heurísticos simples.
6.4 Aspectos Operacionais
Neste ponto será discutida a interface entre o sistema de controle e o operador. Isto inclui
a apresentação de dados e a alteração, por parte do operador, dos parâmetros do controlador.
Apresentação de Dados
Valores numéricos;
Gráficos;
Imágems;
Animações ...
Ajuste de Parâmetros
Referência;
Ganhos;
Tempo integrativo;
Tempo derivativo;
Modo de operação ...
56 Sistemas de Controle
rodarepO
rodalortnoC
Interface

No caso do controle regulatório de processos, é comum exibir informações sobre os
valores de referência (SP – Set-point), sobre as saídas medidas (PV – Process Variable), e
sinais de controle. Além disso, a interface também deve possibilitar ao operador a alteração
dos ganhos, do tempo integrativo e do tempo derivativo. Também costuma ser desejado que
haja a possibilidade de alternar entre os modos de operação automático e manual. Uma forma
simples de realizar o controle manual é através de botões para aumentar e diminuir o valor do
sinal de controle. Porém, como o controlador é um sistema dinâmico, precauções devem ser
tomadas no chaveamento do modo de operação manual para o automático, para que a
transição seja suave evitando que surjam transitórios devido ao chaveamento.
6.5 Mudanças de Parâmetros
Nos controladores convencionais o operador, normalmente, tem flexibilidade para alterar
valores como: referência e parâmetros básicos dos controladores (ganhos e tempos). Nos
controladores implementados computacionalmente essa flexibilidade é ainda maior.
Devido a grande facilidade para realizar cálculos é possível utilizar uma parametrização
no algoritmo de controle e mostrar outra ao operador através da interface. Por exemplo, o
algoritmo pode trabalhar sempre com os tempos derivativo e integrativo, mas, a interface
pode possibilitar que o operador entre ou com estes tempos ou com os respectivos ganhos. No
segundo caso, a partir dos ganhos fornecidos pelo operador, os tempos seriam calculados e
então usados no algoritmo de controle.
Porém, existem dois problemas com a alteração de parâmetros em tempo real. Um
problema está relacionado com a programação em tempo real. Se mais de um programa,
rodando simultaneamente, estiver utilizando os mesmos dados é possível que haja problemas.
É necessário ter certeza de que a alteração será aceita e processada por todos os programas
que estejam usando o parâmetro em questão.
O outro problema é algorítmico. A alteração de parâmetros em tempo real pode acarretar
em efeitos similares ao de perturbações. Esses efeitos são chamados de transientes de
chaveamento. Tal problema, muitas vezes, pode ser contornado com alterações simples no
código do programa. Considere, por exemplo, os dois códigos a seguir para implementação do
algoritmo de um controlador PI.
Algoritmo #1 Algoritmo #2
e(k) = r - y(k); e(k) = r - y(k);
I(k) = I(k-1) + e(k) _T; I(k) = I(k-1) + Kp_ e(k) _T / ti;
u(k) = Kp_ (e(k) + I(k)/ti); u(k) = Kp * e(k) + I(k);
Considere também o modelo discreto de um sistema de tanques acoplados de segunda
ordem:
9,687z+9,645
G(z) =10−5 ( 6.2 )
z2 −1,987z+0,987
Sistemas de Controle 57

Considerando-se os parâmetros do controlador como sendo: k = 2 e τ = 100, temos que,
P i
se esses parâmetros permanecerem inalterados, ambos os algoritmos geram sinais de controle
idênticos. Conseqüentemente, a resposta do sistema em ambos os casos é também idêntica.
Sistema de Segunda Ordem com Controlador PI – Parâmetros Constantes
Algoritmo #1
25 40
30
20
20
15
10
10
0
5
-10
0 -20
0 500 1000 1500 2000 0 500 1000 1500 2000
Algoritmo #2
25 40
30
20
20
15
10
10
0
5
-10
0 -20
0 500 1000 1500 2000 0 500 1000 1500 2000
Porém, se em algum instante o tempo integrativo for alterado, no sistema com o
controlador PI implementado de acordo com o algoritmo #1 surgirá um transiente de
chaveamento, enquanto que com o algoritmo #1 o sistema fica livre desse transiente.
Considere o caso onde o sistema apresentado anteriormente sofre uma redução de 10
vezes no tempo integrativo, a partir do milésimo instante. Note como surgimento do
transiente de chaveamento perturba o sistema no primeiro caso, enquanto que com o segundo
algoritmo o sistema apenas tende a acomodar-se mais rapidamente, o que é exatamente o
efeito desejado ao reduzir-se o tempo integrativo.
58 Sistemas de Controle

Sistema de Segunda Ordem com Controlador PI – Variação de Parâmetros
Algoritmo #1
25 40
30
20
20
15
10
10
0
5
-10
0 -20
0 500 1000 1500 2000 0 500 1000 1500 2000
Algoritmo #2
25 40
30
20
20
15
10
10
0
5
-10
0 -20
0 500 1000 1500 2000 0 500 1000 1500 2000
6.6 Aspectos Numéricos
Sistemas de Controle 59

6.7 Projeto de Controladores Digitais
Considere um sistema discreto descrito pelo seguinte diagrama de blocos:
R(z)+ E(z) U(z) Y(z)
D(z) G(z)
-

[ ]
A partir do mesmo podemos escrever que, Y(z) =G(z)D(z) R(z)−Y(z)
Y(z) 1 Y(z)/R(z)
Se for especificado , temos que: D(z) =
R(z) G(z)1−Y(z)/R(z)
6.7.1 Controladores Deadbeat
Um controlador deadbeat ou de resposta mínima é aquele que satisfaz as seguintes
condições:
• O tempo de subida deve ser mínimo;
• O erro de regime deve ser zero.
Para um planta de ordem n o tempo mínimo é igual a nT, o problema a ser resolvido é
obter D(z), tal que, para uma entrada degrau, ou seja, R(z) = (1 - z -1)-1 a resposta seja: y(k) =
r(k) = 1 para k ≥ n, com: u(k) = u(n) para k ≥ n.
Aplicando a transformada Z temos:
{ }
Y(z)= y z−1 + y z−2 +...+1z−n + z−(n+1) +...
1 2
{ }
U(z)=u +u z−1 +u z−2 +...+u z−n + z−(n+1) +...
0 1 2 N
Y(z) [{ }](<>)
= y z−1 + y z−2 +...+1z−n + z−(n+1) +... 1−z−1 = y z−1 − y z−2 + y z−2 +...+ z−n
R(z) 1 2 1 1 2
Y(z)
= y z−1 −(y − y )z−2 +...+(1− y )z−n
R(z) 1 2 1 n−1
Y(z)
= p z−1 + p z−2 +...+ p z−n, com ∑ p =1 ( 6.3 )
R(z) 1 2 n i
Por analogía:
U(z) q =u ;q =u −u ;q =u −u
=q +q z−1 +q z−2 +...+q z−n, com:  0 0 1 1 0 n n n−1 ( 6.4 )
R(z) 0 1 2 n ∑q =u
 i n
Então,
60 Sistemas de Controle

|                                               |     |     |     |              | Y(z)   | D(z)G(z)   |            |        |       |     |          |
| --------------------------------------------- | --- | --- | --- | ------------ | ------ | ---------- | ---------- | ------ | ----- | --- | -------- |
| P(z)                                          |
|                                               |     |     |     |              |        | =          |            | =      |       |     | ( 6.5 )  |
| ---                                           | --- | --- | --- | ---          | ----   | ---------- | ---        | ---    | ---   | --- | -------- |
|                                               |     |     |     |              | R(z)   | 1+D(z)G(z) |            |        |       |     |          |
| ou:                                           |
|                                               |     |     |     | Y(z)         |        |            | Y(z)       | R(z)   | P(z)  |     |          |
| ---                                           | --- | --- | --- | ----         | -----  | ---        | --------   | ----   | ----  | --- | -------- |
|                                               |     |     |     |              | =G(z)  | =          |            |        | =     |     | ( 6.6 )  |
|                                               |     |     |     | U(z)         |        |            | R(z)U(z)   |        | Q(z)  |     |          |
| Usando as equações ( 6.6 ) em ( 6.5 ), temos: |
|                                               |     |     |     |              |        |            |            | z−1    |       | z−n |          |
| ---                                           | --- | --- | --- | ----         | ------ | ---        | ----       | -----  | ----  | --- | ---      |
|                                               |     |     |     |              | Q(z)   |            | q +q       | +      | K +q  |     |          |
|                                               |     |     |     | D(z)         | =      | =          | 0          | 1      | n     |     |          |
|                                               |     |     |     |              |        |            | (          |        |       | )   |          |
|                                               |     |     |     |              | 1−P(z) |            | 1− p       | z−1 +  | + p   | z−n |          |
| K                                             |
|                                               |     |     |     |              |        |            |            | 1      | n     |     |          |
| ---                                           | --- | --- | --- | ---          | ---    | ---        | ---        | ---    | ---   | --- | ---      |
| Seja ainda:                                   |
|                                               |     |     |     |              | b z−1  | +b         | z−2 +...+b |        | z−n   | q   |          |
| ---                                           | --- | --- | --- | ----         | -----  | ---        | ---------- | ---    | ---   | --- | ---      |
|                                               |     |     |     | G(z)         | = 1    |            | 2          |        | n ×   | 0   |          |
| ( 6.7 )                                       |
|                                               |     |     |     |              | 1+a    | z−1 +a     | z−2        | +...+a | z−n   | q   |          |
| ---                                           | --- | --- | --- | ---          | ---    | ------     | ---        | ------ | ---   | --- | ---      |
|                                               |     |     |     |              |        | 1          | 2          |        | n     | 0   |          |
| Da equação ( 6.6 ), temos:                    |
|                                               |     |     |     |              | p      | z−1 +      | p z−2      | +...+  | p z−n |     |          |
| ---                                           | --- | --- | --- | -----        | ---    | -----      | -----      | ------ | ----- | --- | -------- |
|                                               |     |     |     | G(z)=        |        | 1          | 2          |        | n     |     | ( 6.8 )  |
|                                               |     |     |     |              |        | z−1        |            | z−2    | z−n   |     |          |
|                                               |     |     |     |              | q      | +q         | +q         | +...+q |       |     |          |
|                                               |     |     |     |              | 0      | 1          | 2          |        | n     |     |          |
| Comparando ( 6.7 ) e ( 6.8 ), temos que:      |
|                                               |     |     |     |              | q      | =a q       | p          | = b    | q     |     |          |
| ---                                           | --- | --- | --- | ---          | ---    | ----       | ---        | ---    | ---   | --- | ---      |
|                                               |     |     |     |              | 1      | 1          | 0          | 1 1    | 0     |     |          |
|                                               |     |     |     |              |        |            | e          |        |       |     |          |
|                                               |     |     |     |              | M      |            | M          |        |       |     |          |
|                                               |     |     |     |              | q      | =a q       | p          | = b    | q     |     |          |
|                                               |     |     |     |              | n      | n          | o          | n n    | o     |     |          |
| 1                                             |
| Como: ∑p                                      |     | =q  | ∑b  | =1, então: q |        |            | =          | .      |       |     |          |
| --------                                      | --- | --- | --- | ------------ | ---    | ---        | ---        | ---    | ---   | --- | ---      |
|                                               |     | i   | 0   | i            |        | 0          | ∑b         |        |       |     |          |
| i                                             |

EXEMPLO:
0.368z+0.265
Projetar um controlador deadbeat para o seguinte sistema: G(z) = .
z2 −1.368z+0.368
SOLUÇÃO:

|                      |     | (     |          | )     |              |           |           |          |     |              |     |
| -------------------- | --- | ----- | -------- | ----- | ------------ | --------- | --------- | -------- | --- | ------------ | --- |
|                      | q   | =1 b  | +b       | =1.58 |              |           |           |          | p   | =q b =0.581  |     |
|                      | 0   |       | 1 2      |       |              |           |           |          |     | 1 0 1        |     |
|                      | q   | =a q  | = −2.160 |       |              |           |           |          | p   | = q b =0.418 |     |
|                      |     | 1 1   | 0        |       |              |           |           |          |     | 2 0 2        |     |
|                      |     | q = a | q =0.581 |       |              |           |           |          |     |              |     |
|                      |     | 2     | 2 0      |       |              |           |           |          |     |              |     |
|                      |     |       |          |       | 1.58−2.16z−1 |           |           | +0.58z−2 |     |              |     |
| Logo:                |     |       |          | D(z)  | =            |           |           |          |     |              |     |
|                      |     |       |          |       |              | 1−0.58z−1 | −0.418z−2 |          |     |              |     |
| Sistemas de Controle |     |       |          |       |              |           |           |          |     |              | 61  |

As figuras a seguir mostram a saída da planta e o sinal de controle com o controlador
deadbeat projetado:
Resposta ao Degrau com o Deadbeat Sinal de Controle do Deadbeat
2
1
1.5
0.8
elortnoC ed laniS
1
adíaS 0.6
0.5
0.4
0
0.2
-0.5

| 0   |          |      | -1  |                      |      |     |
| --- | -------- | ---- | --- | -------------------- | ---- | --- |
| 0 2 | 4 6      | 8 10 | 0 2 | 4 6                  | 8 10 |     |
|     | Instante |      |     | Instante             |      |     |
| 62  |          |      |     | Sistemas de Controle |      |     |

7 PROJETO DE SISTEMAS DE CONTROLE USANDO O ESPAÇO DE ESTADOS
7.1 Descrição por Variáveis de Estado
É aplicável a sistemas de múltiplas entradas e múltiplas saídas, que podem ser lineares ou
não-lineares, invariantes ou variantes no tempo e com condições iniciais não-nulas.
O estado de um sistema no instante t é a quantidade de informação em t , que, junto com

|                                                                                      |                     |         |                |                           | 0                                        |         |       |                         | 0    |          |
| ------------------------------------------------------------------------------------ | ------------------- | ------- | -------------- | ------------------------- | ---------------------------------------- | ------- | ----- | ----------------------- | ---- | -------- |
| a entrada u(t) em t ≥t , determina univocamente o comportamento do sistema para todo |
| 0                                                                                    |
| t ≥t .                                                                               |
| 0                                                                                    |
| Considere os vetores:                                                                |
|                                                                                      |                     | x (t) |                |                           |                                          | u (t) |       |                         | y   | (t)     |
| ---                                                                                  | -----               | ------- | ---            | ---                       | ----                                     | ------- | ----- | ----                    | ---- | -----    |
|                                                                                      |                     | 1       |                |                           |                                          | 1       |       |                         | 1    |          |
|                                                                                      |                     |        |               |                           |                                          |        |      |                         |     |         |
|                                                                                      |                     | x       | (t)            |                           |                                          | u       | (t)   |                         | y    | (t)      |
|                                                                                      |                     |  2     |               |                           |                                          |  2     |      |                         |  2  |         |
|                                                                                      | x(t)=               |         |                |                           | u(t)                                     | =       |       | y(t)                    | =    |          |
|                                                                                      |                     |  :     |               |                           |                                          |  :     |      |                         |  :  |         |
|                                                                                      |                     |         |                |                           |                                          |        |      |                         |     |         |
|                                                                                      |                     |        |               |                           |                                          |         |       |                         |      |          |
|                                                                                      |                     | x       | (t)            |                           |                                          |  u    | (t) |                         |  y | (t)    |
|                                                                                      |                     |  n     |               |                           |                                          | p       |       |                         | q    |          |
| x(t) → vetor de estados.                                                             |
|                                                                                      |                     |         |                | u(t) → vetor de entrada.  |                                          |         |       | y(t) → vetor de saída.  |      |          |
| ---                                                                                  | ---                 | ---     | ---            | ------------------------- | ---                                      | ---     | ---   | ----------------------- | ---  | ---      |
| x(t) → variável de estado.                                                           |
| i                                                                                    |
|                                                                                      | E as matrizes; A(t) |         |                | ; B(t) ; C(t)             | ; D(t)                                   |         | .     |                         |      |          |
| ---                                                                                  | ------------------- | ---     | ---            | -------------             | ------                                   | ---     | ---   | ---                     | ---  | ---      |
|                                                                                      |                     |         | nxn            | nxp                       | qxn                                      | qxp     |       |                         |      |          |
| Na representação por variáveis de estado, temos:                                     |
| x&(t) = A(t)x(t)+B(t)u(t) Equação de Estado (dinâmica do sistema)                    |
|                                                                                      |                     |         |                |                           |                                          |         |       |                         |      | ( 7.1 )  |
| ---                                                                                  | ---                 | ---     | ---            | ---                       | ---                                      | ---     | ---   | ---                     | ---  | -------- |
| y(t) =C(t)x(t)+D(t)u(t) Equação de Saída (observação do sistema)                     |
| Ou ainda, no caso invariante no tempo, temos:                                        |
|                                                                                      |                     | x&(t)   | = Ax(t)+Bu(t)  |                           | Equação de Estado (dinâmica do sistema)  |         |       |                         |      |          |
| ---                                                                                  | ---                 | -----   | -------------- | ---                       | ---------------------------------------- | ---     | ---   | ---                     | ---  | ---      |

( 7.2 )

|                                                                                    |     | y(t) | =Cx(t)+Du(t) Equação de Saída (observação do sistema) |             |              |                                 |            |     |     |          |
| ---------------------------------------------------------------------------------- | --- | ---- | ----------------------------------------------------- | ----------- | ------------ | ------------------------------- | ---------- | --- | --- | -------- |
| Aplicando Transformada de Laplace temos:                                           |
|                                                                                    |     |      |                                                       | (sI−A)X(s)  | = BU(s)+X(0) |                                 |            |     |     |          |
| ---                                                                                | --- | ---  | ---                                                   | ----------- | ------------ | ---                             | ---------  | --- | --- | -------- |
|                                                                                    |     |      |                                                       |             |              |                                 |            |     |     | ( 7.3 )  |
|                                                                                    |     |      |                                                       | (           | )−1BU(s)+    |                                 | ( )−1X(0)  |     |     |          |
|                                                                                    |     |      |                                                       | X(s) = sI−A |              |                                 | sI−A       |     |     |          |
| Para condições iniciais nulas ( X(0) = 0 ):                                        |
|                                                                                    |     |      |                                                       | [           |              |                                 | ]          |     |     |          |
| ---                                                                                | --- | ---  | ---                                                   | --------    | ----------   | ---                             | ---------- | --- | --- | -------- |
|                                                                                    |     |      |                                                       | (           | )−1B+DU(s)   |                                 |            |     |     |          |
|                                                                                    |     |      |                                                       | Y(s) = C    | sI−A         |                                 | =G(s)U(s)  |     |     | ( 7.4 )  |
| De onde, conclui-se:                                                               |
|                                                                                    |     | G(s) | =C ( sI−A                                             | )−1B+D      |              | Matriz Função de Transferência  |            |     |     |          |
| ---                                                                                | --- | ---- | ---------                                             | -------     | ---          | ------------------------------- | ---        | --- | --- | ---      |
| ( 7.5 )                                                                            |
| Como ( sI−A ) corresponde ao polinômio característico de G(s), os autovalores de A |
| correspondem às raízes do polinômio característico, ou seja, aos pólos de G(s).    |
| Sistemas de Controle                                                               |     |      |                                                       |             |              |                                 |            |     |     | 63       |
| ---------------------                                                              | --- | ---  | ---                                                   | ---         | ---          | ---                             | ---        | --- | --- | ---      |

7.2 Solução da Equação de Estado
• Caso Escalar

|                                                       |                              |                 | ( )−1x(0)+                 | ( )−1bU(s) |     |
| ----------------------------------------------------- | ---------------------------- | --------------- | -------------------------- | ---------- | --- |
| x&(t)                                                 | = ax(t)+bu(t)Laplace→X(s) |                 | = s−a                      | s−a        |     |
| Aplicando a Transformada inversa de Laplace, obtemos: |
| { }                                                   |
| x(t)                                                  | = L−1{ X(s)                  | } =eatx(0)+bL−1 | ( s−a )−1 *L−1{            | U(s) } ⇒   |     |
| ----                                                  | -----------                  | --------------- | ---------------            | ---------  | --- |
| t                                                     |
|                                                       |                              | x(t)            | = eatx(0)+∫ea(t−τ)bu(τ)dτ  |            |     |
| ---                                                   | ---                          | ----            | -------------------------- | ---        | --- |
| ( 7.6 )                                               |
| 0                                                     |

• Caso Vetorial

| x&(t)                                                                         | = Ax(t)+Bu(t) |           |                            |     |     |
| ----------------------------------------------------------------------------- | ------------- | --------- | -------------------------- | --- | --- |
| t                                                                             |
|                                                                               |               | x(t)      | = eAtx(0)+∫eA(t−τ)BU(τ)dτ  |     |     |
| ---                                                                           | ---           | ----      | -------------------------- | --- | --- |
| ( 7.7 )                                                                       |
| 0                                                                             |
|                                                                               | {             | }         |                            |     |     |
| ---------                                                                     | ------        | ---       | ---                        | --- | --- |
| onde: eAt                                                                     | L−1 (         | )−1       |                            |     |     |
|                                                                               | = sI−A        | .         |                            |     |     |
| A exponencial matricial; eAt, pode ser calculada através da série:            |
|                                                                               |               | A2t2 Aktk |                            |     |     |
| ---                                                                           | ---           | --------- | ---                        | --- | --- |
| eAt =I+At+ + . . . + + . . .; que converge para todo t finito e para todo A.  |
|                                                                               |               | 2! k!     |                            |     |     |
| ---                                                                           | ---           | -----     | ---                        | --- | --- |
| 7.3 Estabilidade                                                              |
| Considere uma representação em variáveis de estado de um sistema SISO:        |
| x&(t) = Ax(t)+Bu(t)                                                           |
| ( 7.8 )                                                                       |
| y(t) =Cx(t)+du(t)                                                             |
| Teorema: Um sistema é estável, se, quando u(t) = 0, para todo x(0), temos que |
| limx(t)                                                                       | = 0           |           |                            |     |     |
| -------                                                                       | ----          | ---       | ---                        | --- | --- |
| t→∞                                                                           |
| eAtx(0)                                                                       |
| OBS: se u(t) = 0 ⇒                                                            |               | x(t)      | =                          |     |     |
| -------------------                                                           | ---           | -----     | ---                        | --- | --- |

Corolário: Um sistema é estável, se, todos os autovalores da matriz A apresentam parte
real negativa.
( )
OBS: Os autovalores de A são as raízes da equação característica:∆(s) =det sI−A =0.

| 64  |     |     |     |     | Sistemas de Controle |
| --- | --- | --- | --- | --- | -------------------- |

EXEMPLO:
−1 1 3 0 s+1 −1 −3 
     
x& = 0 −3 4 x+ 0 u ⇒det(sI−A) = 0 s+3 −4 =(s+1)(s+3)(s−2)
     
 0 0 2 1  0 0 S −2
     
Logo, o sistema é instável.
7.4 Controlabilidade
Definição: O sistema (A,B,C,d) é controlável se, quaisquer que sejam x(0) e x(T), existe
u(t) 0≤t ≤T que transfere o estado x(0) para o estado x(T) em um tempo finito.
Teorema: O sistema (A,B,C,d) é controlável se e somente se, o posto da matriz de
controlabilidade U associada é igual a n.
nxnp
[ ]
U = B AB A2B ... An−1B ( 7.9 )
OBS: Uma matriz R é dita possuir posto (rank), ρ(R), igual a m, se existir uma submatriz
M de modo que o determinante de M é não nulo, e o determinante de todas as submatrizes
mxm
rxr (onde r > m) de R é zero.
EXEMPLO1:
1 2 2
 
1 −1 1 3 2
R = ρ(R ) =1 R =   ρ(R ) = 2
 
1 1 −1 1 2 0 0 0 2
 
0 0 0
EXEMPLO2:
u = x& + x

- 1F x 1F x
  1 1
  1 2 u = x& + x
  ~ 2 2
  u

- −1 0  1
  1Ω 1Ω x& =
   
  x+
   
  u
   0 −1 1
  1 −1
  [ ]
  U = B AB = ρ(U) =1< 2 (Não-Controlável)
   
  1 −1
  Justificativa: Se x (0) = x (0) ⇒ x (t) = x (t); ∇t ≥0.
  1 2 1 2
  Sistemas de Controle 65

7.5 Observabilidade
Definição: O sistema (A,B,C,d) é observável, se, para todo x(0), o conhecimento da
entrada u(t) e da saída y(t) em um tempo finito é suficiente para determinar x(0).

Teorema: O sistema (A,B,C,d) é observável, se e somente se, o posto da matriz de

| observabilidade V |     | associada é igual a n. |          |     |     |     |     |     |     |           |
| ----------------- | --- | ---------------------- | -------- | --- | --- | --- | --- | --- | --- | --------- |
| nqxn              |
|                   |     |                        | C       |    |     |     |     |     |     |           |
| ---               | --- | ---                    | ---      | --- | --- | --- | --- | --- | --- | ---       |
|                   |     |                        |         |    |     |     |     |     |     |           |
| CA                |
|                   |     |                        |         |    |     |     |     |     |     |           |
| ---               | --- | ---                    | -------- | --- | --- | --- | --- | --- | --- | --------- |
|                   |     |                        | V = CA2 |    |     |     |     |     |     | ( 7.10 )  |
|                   |     |                        |         |    |     |     |     |     |     |           |
| :                 |
|                   |     |                        |         |    |     |     |     |     |     |           |
| ---               | --- | ---                    | ---      | --- | --- | --- | --- | --- | --- | ---       |
|  CAn−1         |
|                  |
| EXEMPLO:          |
| 1F                |
|                   |     |                        |          |     |     | −1 | 0 0 |    | 1 |           |
| ---               | --- | ---                    | ---      | --- | --- | --- | --- | --- | --- | ---       |
|                   |     |                        |          |     |     |    |     |    |   |           |

-

|     |     |     |     |     | x& = | 0   | 0 −1  | x+    | 1 u  |     |
| --- | --- | --- | --- | --- | ---- | --- | ----- | ----- | ---- | --- |
|     |     |     |     |     |      |    |       |      |    |     |
|     |     | 1Ω  |     |     |      |  0 | 1 −1 |       |  0 |     |
|     | 1Ω  |     |     |     |      |    |       |      |    |     |
| u   |     | 1F  | y   |     |      |     |       |       |      |     |
|     |     |     |     |     |      | y = | [ 0 1 | 0 ] x |      |     |
| 1H  |

-

|                                                                         | C  0 | 1 0    |                  |        |        |     |                      |     |     |     |
| ------------------------------------------------------------------------ | ------ | ------- | ---------------- | ------ | ------ | --- | -------------------- | --- | --- | --- |
|                                                                         |      |        |                  |        |        |     |                      |     |     |     |
| V = CA = 0 0 −1 ⇒ ρ(V) = 2; Logo, o sistema é Não-observável.            |
|                                                                         |      |        |                  |        |        |     |                      |     |     |     |
| -----                                                                    | ---    | -----   | ---              | ---    | ---    | --- | ---                  | --- | --- | --- |
| CA2                                                                    | 0     | −1 1   |                  |        |        |     |                      |     |     |     |
|                                                                         |      |        |                  |        |        |     |                      |     |     |     |
| 7.6 Realizações de Funções de Transferência                              |
| Dada a seguinte representação em variáveis de estado de um sistema SISO: |
| x&(t) = Ax(t)+Bu(t)                                                      |        |         |                  |        |        |     |                      |     |     |     |
| --------------------                                                     | ---    | ---     | ---              | ---    | ---    | --- | ---                  | --- | --- | --- |
| y(t) =Cx(t)+du(t)                                                        |        |         |                  |        |        |     |                      |     |     |     |
| (A,B,C,d) é uma realização de G(s) se:                                   |
|                                                                          |        |         | ( )−1B+d         |        |        |     |                      |     |     |     |
| ---                                                                      | ---    | ---     | --------         | ---    | ------ | --- | ---                  | --- | --- | --- |
|                                                                          |        |         | C sI−A           |        | =G(s)  |     |                      |     |     |     |
| com:                                                                     |
|                                                                          | Y(s)   |         | βsn−1 +βsn−2     | +...+β |        |     | N(s)                 |     |     |     |
| ---                                                                      | ----   | ------- | ---------------- | ------ | ------ | --- | -------------------- | --- | --- | --- |
|                                                                          |        |         | 1 2              |        | n      |     |                      |     |     |     |
|                                                                          |        | =G(s) = |                  |        |        | +d  | =                    | +d  |     |     |
|                                                                          |        |         | sn +αsn−1 +αsn−2 |        |        |     |                      |     |     |     |
|                                                                          | U(s)   |         |                  |        | +...+α |     | D(s)                 |     |     |     |
|                                                                          |        |         | 1                | 2      |        | n   |                      |     |     |     |
| 66                                                                       |        |         |                  |        |        |     | Sistemas de Controle |     |     |     |

7.6.1 Realização na Forma Canônica Observável

|          |     | 0  | 0 ... | 0 −α     |    | β  |          |           |       |     |     |
| -------- | --- | --- | ----- | -------- | --- | --- | --------- | --------- | ----- | --- | --- |
|          |     |     |       | n        |     |     | n         |           |       |     |     |
|          |     |    |       |          |    |    |          |           |       |     |     |
|          |     | 1   | 0 ... | 0 -α     |     | β   |           |           |       |     |     |
|          | A   | =  |       | n-1 ; B |     | =  | n−1 ; C= | [ 0 0 ... | 0 1 ] |     |     |
| ( 7.11 ) |
|          |     | 0  | 0 ... | 0 -α     |    |    | β        |           |       |     |     |
| ---      | --- | --- | ----- | ----     | --- | --- | ---       | ---       | ---   | --- | --- |
|          |     |     |       | 2        |     |     | 2         |           |       |     |     |
|          |     |    |       |          |    |    |          |           |       |     |     |
|          |     |  0 | 0 ... | 1 -α     |    |    | β        |           |       |     |     |
|          |     |     |       | 1        |     |     | 1         |           |       |     |     |

7.6.2 Realização na Forma Canônica Controlável

|     | 0  | 1 ... |     | 0 0   |    |     | 0      |       |       |     |          |
| --- | --- | ----- | --- | ----- | --- | --- | -------- | ----- | ----- | --- | -------- |
|     |    |       |     |       |    |     |        |       |       |     |          |
|     | 0   | 0 ... |     | 0 0   |     |     | 0        |       |       |     |          |
|     |    |       |     |       |    |     |   ; C= | [     |       | ]   |          |
| A   | =   |       |     |       | ; B |     | =        | β β   | ... β | β   | ( 7.12 ) |
|     |     |       |     |       |     |     |          | n n−1 | 2     | 1   |          |
|     | 0  | 0 ... |     | 0 1   |    |     | 0      |       |       |     |          |
|     |    |       |     |       |    |     |        |       |       |     |          |
|     | −α  | −α    | ... | −α −α |     |     | 1      |       |       |     |          |
|     |    |       |     |       |    |     |          |       |       |     |          |
|     |     | n     | n−1 | 2     | 1   |     |          |       |       |     |          |

| Sistemas de Controle |     |     |     |     |     |     |     |     |     |     | 67  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

7.7 Realimentação de Estado
A idéia básica da realimentação de estados consiste em alocar os pólos de malha fechada
(autovalores da matriz dinâmica), modificando, assim, a dinâmica do sistema.
x&(t) = Ax(t)+Bu(t)
Dada uma representação em variáveis de estado de um sistema;  :
y(t) =Cx(t)+du(t)
D
. +

|     |      |     | x(t) |     | y(t) |     |
| --- | ---- | --- | ---- | --- | ---- | --- |
|     | u(t) |     | +    | +   |      |     |
|     |      | B   | ∫    | C   |      |     |

-

x(t)
A

Usando realimentação de estado, cada variável de estado é multiplicada por um ganho e
realimentada para o terminal de entrada, ou seja:

|                                                        |        |                                             | u(t) =Kx(t)+r(t)             |            |      | ( 7.13 )  |
| ------------------------------------------------------ | ------ | ------------------------------------------- | ---------------------------- | ---------- | ---- | --------- |
|                                                        | [      | ]                                           |                              |            |      |           |
| onde: K                                                | = k k  | ... k é o vetor de ganhos de realimentação. |                              |            |      |           |
|                                                        | 1 2    | n                                           |                              |            |      |           |
| Assim, temos:                                          |
|                                                        | x&(t) | = Ax(t)+Bu(t)                               |                              |            |      |           |
| ---                                                    | ------ | -------------                               | ---------------------------- | ---------- | ---  | --------- |
|                                                        |        |                                             |                              | (          | )    |           |
|                                                        |       |                                             | ⇒ x&(t) = Ax(t)+B            | Kx(t)+r(t) | ⇒    |           |
|                                                        | u(t)  | =Kx(t)+r(t)                                 |                              |            |      |           |
|                                                        |        | ⇒                                           | x&(t) = ( A+BK ) x(t)+Br(t)  |            |      |           |
|                                                        |        |                                             |                              |            |      | ( 7.14 )  |
| OBS: Devemos ter acesso a todos os estados do sistema. |
| D                                                      |
| .                                                      |
|                                                        |        |                                             |                              | +          | y(t) |           |
| ---                                                    | ----   | ---                                         | ----                         | ---        | ---- | ---       |
|                                                        | u(t)   |                                             | x(t)                         |            |      |           |
|                                                        |        |                                             | +                            | +          |      |           |
| ∫                                                      |
|                                                        |        | B                                           |                              | C          |      |           |
| ---                                                    | ---    | ---                                         | ---                          | ---        | ---  | ---       |

-

x(t)
A
K

Teorema: Se (A,B,C,d) for controlável, usando u(t) =Kx(t)+r(t) podemos escolher

| arbitrariamente os autovalores de |     |     | ( A+BK ) . |     |     |     |
| --------------------------------- | --- | --- | ---------- | --- | --- | --- |

| 68  |     |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | --- | -------------------- | --- |

• Fórmula de Ackermann para Determinação da Matriz de Ganhos K
1- Formar ∆(s) = sn +a sn−1 +...+a s+a com os pólos desejados.

|                                 |         |         |               | 1      |     | n−1 n           |      |     |     |           |
| ------------------------------- | ------- | ------- | ------------- | ------ | --- | --------------- | ---- | --- | --- | --------- |
| 2- Calcular K da seguinte forma |
|                                 |         |         |               |        |     | [ ]             |      |     |     |           |
| ---                             | ---     | ---     | ---           | ---    | --- | --------------- | ---- | --- | --- | --------- |
|                                 |         |         |               | K      | = − | 0 0 ... 1 U−1q  | (A)  |     |     | ( 7.15 )  |
| c                               |
|                                 | [       |         |               |        | ]   |                 |      |     |     |           |
| -------                         | ------- | ------- | ------------- | ------ | --- | ---             | ---  | --- | --- | ---       |
|                                 | U = B | AB      | A2B ... An−1B |        |     |                 |      |     |     |           |
| onde:                          |         |         |               |        |     | .               |      |     |     |           |
|                                 | q (A)  | = An +a | An−1          | +...+a | I   |                 |      |     |     |           |
|                                |
|                                 | c       |         | 1             |        | n   |                 |      |     |     |           |
| ---                             | ---     | ---     | ---           | ---    | --- | ---             | ---  | --- | --- | ---       |

EXEMPLO:

|                                                                     |    | 1    | 0   | 1  |     |     |     |     |     |     |
| ------------------------------------------------------------------- | --- | ----- | ---- | ---- | --- | --- | --- | --- | --- | --- |
|                                                                     | x& | =    |     | x+  |  u |     |     |     |     |     |
| Dado; 0 −2 1 , usando;u(t) =Kx(t)+r(t). Determine K para que os |
|                                                                    |
|                                                                    |
|                                                                     | y  | = [ 1 | 1x ] |      |     |     |     |     |     |     |
| ---                                                                 | --- | ----- | ---- | ---  | --- | --- | --- | --- | --- | --- |
| autovalores do sistema sejam -1 e -2.                               |

SOLUÇÃO:
=s2

|                       |     |     |          | ∆(s) | =     | (s+1)(s+2)  | +3s+2 |            |     |     |
| --------------------- | --- | --- | -------- | ---- | ----- | ----------- | ----- | ---------- | --- | --- |
|                       |     |     |          |      | 1    | 1          |       | 1−2       | −1 |     |
|                       |     | U   | = [ B AB | ] =  |       | U−1         |       | = −        |     |     |
|                       |     |     |          |      |      |            |       |           |    |     |
|                       |     |     |          |      | 1    | −2         |       | 3−1       | 1  |     |
| 6 0                 |
|                       |     |     |          | q    | (A)   | = A2 +3A+2I | =     |            |     |     |
| ---                   | --- | --- | ---      | ---  | ---   | ----------- | ---   | ---        | --- | --- |
|                       |     |     |          |      | c     |             |      |           |     |     |
| 0 0                 |
|                       |     |     |          | 1    |       | −2 −16   | 0    |            |     |     |
| --------------------- | --- | --- | ---      | ---  | ----- | ---------   | ---   | ---------- | --- | --- |
|                       |     |     |          | K =  | [ 0 1 | ]           | =     | [ −2 0 ]   |     |     |
|                       |     |     |          |      |       |          |      |            |     |     |
|                       |     |     |          | 3    |       | −1 10    | 0    |            |     |     |
| Sistemas de Controle  |     |     |          |      |       |             |       |            |     | 69  |

SIMULAÇÃO:

|     |     | x&(t) = ( A+BK ) x(t)+Br(t) |     |     |     |
| --- | --- | --------------------------- | --- | --- | --- |

y(t) =Cx(t)
Rotina Matlab:
% Programa para Realimentação de Estado

clear all;
A=[1 0;0 -2];B=[1 1]';C=[1 1];d=0; % Sistema Original

| K=[-2 0];                                  |     | % Matriz de Ganhos         |     |     |     |
| ------------------------------------------ | --- | -------------------------- | --- | --- | --- |
| Aa=[A+B*K]; % Matriz Dinamica realimentada |
| t=0:0.01:5;                                |     | % Tempo da simulaçao       |     |     |     |
| -------------------------------------      | --- | -------------------------- | --- | --- | --- |
| u=0*t;                                     |     | % Sinal de entrada (nulo)  |     |     |     |
| x0=[1 1]';                                 |     | % Condiçoes iniciais       |     |     |     |

[Y1,X1]= LSIM(A,B,C,d,u,t,x0); % Simula o sistema, sem realimentaçao
% para uma entrada e cond. iniciais dadas
[Y,X] = LSIM(Aa,B,C,d,u,t,x0); % Simula o sistema, com realimentaçao
% para uma entrada e cond. iniciais dadas

figure;plot(t,Y1,'r','linewidth',2)
title('Saída sem realimentação de estado')
figure;plot(t,Y,'b','linewidth',2)
title('Saída com realimentação de estado')

Saída sem realimentação de estado Saída com realimentação de estado

| 150 |     |     | 2    |     |     |
| --- | --- | --- | ---- | --- | --- |
| 1.5 |
| 100 |
| 1   |
| 0.5 |
| 50  |
| 0   |
| 0   |     |     | -0.5 |     |     |
| --- | --- | --- | ---- | --- | --- |
| 0 1 | 2 3 | 4 5 | 0 1  | 2 3 | 4 5 |

| 70  |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | -------------------- | --- |

7.8 Observadores de Estado
O observador de estados consiste em um mecanismo (algoritmo) para estimação dos
estados da planta. É uma solução útil quando os estados reais da planta não estão accessíveis,
situação muito comum na prática .
x&(t) = Ax(t)+Bu(t)
Seja: , conhecendo-se A, B e C, e a medição de y(t) e u(t),

y(t) =Cx(t)
constrói-se o estimador:

|          | x&ˆ(t) |         | Axˆ(t)+L | (   |       | yˆ(t) ) |                           |     |      |     |
| -------- | ------- | ------- | -------- | --- | ----- | ------- | ------------------------- | --- | ---- | --- |
|          |         | =       |          |     | y(t)− | +Bu(t)  |                           |     |      |     |
|          |        |         |          |     |       |         | ; (Estimador Assintótico) |     |      |     |
| ( 7.16 ) |
|          | yˆ(t)  | =Cxˆ(t) |          |     |       |         |                           |     |      |     |
| -------  | ------  | ------- | ---      | --- | ---   | ---     | ---                       | --- | ---  | --- |
|          | [       |         | ]T       |     |       |         |                           |     |      |     |
| onde: L  | = l l   | ...     | l        |     |       |         |                           |     |      |     |
|          | 1 2     |         | n        |     |       |         |                           |     |      |     |
| .        |
| x(t)     |
|          |         |         | u(t)     |     |       | +       |                           |     | y(t) |     |
| ---      | ---     | ---     | ----     | --- | ---   | ---     | ---                       | --- | ---- | --- |
|          |         |         |          |     | B     |         | ∫                         | C   |      |     |

-

x(t)
A +
L
.

|     |     |     |     |     |     | ^x(t) |     |     | -   |     |
| --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |

-

|       |     |     |     |     | B   |     | ∫   |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C     |
| ^y(t) |

-

^x(t)
A

• Erro de Estimação
O erro entre x e xˆ , conhecido como erro de estimação (ou erro de observação), é dado

| por; x(t) ~                                                        | = x(t)−xˆ(t), derivando-se, temos: |     |     |     |     |     |     |     |     |     |
| ------------------------------------------------------------------ | ---------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|                                                                    | ~                                  |     |     | [   |     |     | ] [ | (   | ) ] |     |
| x&(t) = x&(t)−x&ˆ(t) = Ax(t)+Bu(t) − Axˆ(t)+L y(t)− yˆ(t) +Bu(t) ⇒ |

~

|                                                                                    |     |     | ⇒   | x&(t) | = A ( | x(t)−xˆ(t) | ) −LC | ( x(t)−xˆ(t) | )      |           |
| ---------------------------------------------------------------------------------- | --- | --- | --- | ----- | ----- | ---------- | ----- | ------------ | ------ | --------- |
| ou, simplesmente:                                                                  |
|                                                                                    |     |     |     |       | ~     | (          | )~    |              |        |           |
| ---                                                                                | --- | --- | --- | ---   | ----- | ------     | ----- | ---          | ------ | --------- |
|                                                                                    |     |     |     |       | x&(t) | = A−LC     | x(t)  |              |        | ( 7.17 )  |
|                                                                                    |     | ~   |     |       |       |            |       |              | (A−LC) |           |
| Para que lim x(t) =0 é necessário que os autovalores de sejam estáveis, ou         |
| t→∞                                                                                |
| seja, tenham parte real negativa.                                                  |
| Teorema: Se (A,B,C,d) for observável, então um estimador de estado assintótico com |
| quaisquer autovalores pode ser construído.                                         |

| Sistemas de Controle |     |     |     |     |     |     |     |     |     | 71  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

• Fórmula de Ackermann para Determinação da Matriz de Ganhos do Observador L
1- Formar ∆(s) = sn +a sn−1 +...+a s+a com os pólos desejados para o observador.

|                                 |            |     |     | 1      |       | n−1 n   |     |       |     |     |           |
| ------------------------------- | ---------- | --- | --- | ------ | ----- | ------- | --- | ----- | --- | --- | --------- |
| 2- Calcular L da seguinte forma |
|                                 |            |     |     |        |       | (A)V−1[ |     | ]T    |     |     |           |
| ---                             | ---        | --- | --- | ---    | ----  | ------- | --- | ----- | --- | --- | --------- |
|                                 |            |     |     |        | L =q  | 0       | 0   | ... 1 |     |     | ( 7.18 )  |
| L                               |
|                                 | [          |     |     |        |       | ]T      |     |       |     |     |           |
| -------                         | -------    | --- | --- | ---    | ----- | ---     | --- | ---   | --- | --- | ---       |
|                                 |           |     | CA2 |        | CAn−1 |         |     |       |     |     |           |
|                                 |  V = C    | CA  |     | K      |       |         |     |       |     |     |           |
| onde:                          |            |     |     |        |       | .       |     |       |     |     |           |
| An An−1                         |
|                                 | q  (A) = | +a  |     | +...+a | I     |         |     |       |     |     |           |
| ---                             | ---------- | --- | --- | ------ | ---   | ---     | --- | ---   | --- | --- | ---       |
|                                 | L          |     | 1   |        | n     |         |     |       |     |     |           |

EXEMPLO:

|                                                                                |      | 1  | 0  | 1 |     |     |     |     |     |     |     |
| ------------------------------------------------------------------------------ | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|                                                                                | x& = |     | x+  |     | u   |     |     |     |     |     |     |
|                                                                                |       |    |    |   |     |     |     |     |     |     |     |
| Dado;  0 −2 1 . Projetar um observador de estados com autovalores -3, -3. |
|                                                                                |      | [   | ]   |     |     |     |     |     |     |     |     |
| ---                                                                            | ---   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|                                                                                | y    | = 1 | 1x  |     |     |     |     |     |     |     |     |

SOLUÇÃO:

|     |     |     |      | ∆(s) | = (s+3)(s+3) |        | = s2   | +6s+9 |      |                      |     |
| --- | --- | --- | ---- | ---- | ------------ | ------ | ------ | ----- | ---- | -------------------- | --- |
|     |     |     |  C  |     | 1 1        |        |        |       | 1−2 | −1                  |     |
|     |     | V   | =    | =    |              | V−1    |        | =     | −    |                      |     |
|     |     |     |     |     |             |       |        |       |     |                     |     |
|     |     |     | CA |      | 1 −2       |        |        |       | 3−1 | 1                   |     |
|     |     |     |      |      |              |        |        | 16   | 0   |                      |     |
| A2  |
|     |     |     |      | q    | (A) =        | +6A+9I | =      |      |     |                      |     |
| --- | --- | --- | ---  | ---  | -----        | ------ | ------ | ----- | ---  | -------------------- | --- |
|     |     |     |      |      | L            |        |        | 0    | 1   |                      |     |
|     |     |     |      |      | 116         | 0−2  | −10 | 116 |      |                      |     |
|     |     |     |      | L =  | −            |        |        | =     |      |                      |     |
|     |     |     |      |      |             |      |      |      |    |                      |     |
|     |     |     |      |      | 30          | 1−1  | 11  | 3−1 |      |                      |     |
| 72  |     |     |      |      |              |        |        |       |      | Sistemas de Controle |     |

SIMULAÇÃO:

|     | x&(t)  |  A 0            | x(t) | B  |     |
| --- | -------- | ---------------- | ------- | ---- | --- |
|     |          | =                | +       | u(t) |     |
|     |        |                 |      |    |     |
|     | x&ˆ(t) | LC A−LCxˆ(t) |         | B  |     |

x(t)
[ ]

|                                        | y(t) = | C 0 |     |     |     |
| -------------------------------------- | ------ | --- | --- | --- | --- |
|                                      |
| xˆ(t)                                |
| Rotina Matlab:                         |
| % Programa para Observadores de Estado |

clear all;close all;clc

A=[1 0;0 -2];B=[1 1]';C=[1 1];d=0; % Sistema Original
L=1/3*[16 -1]'; % Matriz de Ganhos do Observador

| I=eye(2); |     | % Matriz identidade 2x2 |     |     |     |
| --------- | --- | ----------------------- | --- | --- | --- |

Aa=[A 0*I;L*C (A-L*C)];
Ba=[B;B]; % Matrizes aumentadas do Observador
Ca=[C zeros(size(C))];

| t=0:0.01:5;    |     | % Tempo da simulaçao      |     |     |     |
| -------------- | --- | ------------------------- | --- | --- | --- |
| u=0*t;         |     | % Sinal de entrada (nulo) |     |     |     |
| x0=[1 1 0 0]'; |     | % Condiçoes iniciais      |     |     |     |

[Y,X] = LSIM(Aa,Ba,Ca,d,u,t,x0); % Simula o sistema aumentado
% para entrada e cond. iniciais dadas

| E = [X(:,1)-X(:,3) X(:,2)-X(:,4)]; |     | % Erro de estimativa |     |     |     |
| ---------------------------------- | --- | -------------------- | --- | --- | --- |

figure;plot(t,X(:,1),'b','linewidth',2);hold on; plot(t,X(:,3),'r','linewidth',2)
set(1,'Position',[10 258 380 280]);title('Estado X_1 e sua estimativa')
legend('X_1','X_1 Estimado'); hold off

figure;plot(t,X(:,2),'b','linewidth',2);hold on; plot(t,X(:,4),'r','linewidth',2)
set(2,'Position',[232 258 380 280]);title('Estado X_2 e sua estimativa')
legend('X_2','X_2 Estimado'); hold off

figure;plot(t,E(:,1),'b','linewidth',2);hold on; plot(t,E(:,2),'r','linewidth',2)
set(3,'Position',[482 258 380 280]);title('Erro de estimativa')
legend('Erro de estimativa de X_1','Erro de estimativa de X_2');hold off

| Sistemas de Controle |     |     |     |     | 73  |
| -------------------- | --- | --- | --- | --- | --- |

|      |     | Estado X e sua estimativa |     |     |              |     |      | Estado X e sua estimativa |                         |              |
| ---- | --- | ------------------------- | --- | --- | ------------ | --- | ---- | ------------------------- | ----------------------- | ------------ |
|      | 150 |                           | 1   |     |              |     | 1.2  |                           | 2                       |              |
|      |     |                           |     |     | X            |     |      |                           |                         | X            |
|      |     |                           |     |     | 1            |     |      |                           |                         | 2            |
| 1    |
|      |     |                           |     |     | X Estimado 1 |     |      |                           |                         | X Estimado 2 |
| ---  | --- | ---                       | --- | --- | ------------ | --- | ---  | ---                       | ---                     | ------------ |
| 0.8  |
| 100  |
| 0.6  |
| 0.4  |
| 50   |
| 0.2  |
| 0    |
|      | 0   |                           |     |     |              |     | -0.2 |                           |                         |              |
| ---  | --- | ------------------------- | --- | --- | ---          | --- | ---- | ------------------        | ----------------------- | ---          |
|      | 0   | 1                         | 2   | 3   | 4            | 5   | 0 1  | 2                         | 3                       | 4 5          |
|      |     | Estado X e sua estimativa |     |     |              |     |      | Erro de estimativa        |                         |              |
|      | 5   |                           | 1   |     |              |     | 1    |                           |                         |              |
|      |     | X                         |     |     |              |     |      |                           | Erro de estimativa de X |              |
|      |     | 1                         |     |     |              |     | 0.8  |                           |                         | 1            |
|      | 4   | X Estimado 1              |     |     |              |     |      |                           | Erro de estimativa de X | 2            |
| 0.6  |
| 0.4  |
| 3    |
| 0.2  |
| 2    |
| 0    |
| -0.2 |
| 1    |
| -0.4 |
|      | 0   |                           |     |     |              |     | -0.6 |                           |                         |              |
| ---  | --- | ---                       | --- | --- | ---          | --- | ---- | ---                       | ---                     | ---          |
|      | 0   |                           | 0.5 | 1   |              | 1.5 | 0 1  | 2                         | 3                       | 4 5          |

7.9 Realimentação de Estados Observados
Para a realimentação de estados é necessário que todos os estados reais da planta, x(t),
sejam mensuráveis. Quando isto não ocorre, há a necessidade de construir um observador de
estados. Neste caso a realimentação é feita a partir dos estados estimados, xˆ(t):
.
x(t)

|     |     |     |     | u(t) |     | +   |     | y(t) |     |     |
| --- | --- | --- | --- | ---- | --- | --- | --- | ---- | --- | --- |
|     |     |     |     |      | B   |     | ∫ C |      |     |     |

-

x(t)
A +
L
.
-

^x(t) +

|       |     |     |     |     | B   |     | ∫ C |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ^y(t) |

-

^x(t)
A
K

| 74  |     |     |     |     |     |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | --- |

x&(t) = Ax(t)+Bu(t)
Seja:  . Se xˆ(t) é uma estimativa de x(t), então, na realimentação
y(t) =Cx(t)
de estados utiliza-se:

|                                                                                           |          | u(t) =Kxˆ(t)+r(t)   |         |      |           |
| ----------------------------------------------------------------------------------------- | -------- | ------------------- | ------- | ---- | --------- |
| ( 7.19 )                                                                                  |
| Porém, se a realimentação é feita a partir dos estados estimados, a dinâmica do estimador |
| precisa ser considerada. Desta forma, tem-se:                                             |
|                                                                                           | x&(t)  |  A BK              | x(t) | B  |           |
| ---                                                                                       | -------- | ------------------- | ------- | ---- | --------- |
|                                                                                           |          | =                   | +       | u(t) |           |
|                                                                                           |        |                    |      |    |           |
|                                                                                           | x&ˆ(t) | LC A−LC+BKxˆ(t) |         | B  |           |
|                                                                                           |          |                     |         |      | ( 7.20 )  |
| x(t)                                                                                    |
|                                                                                           | y(t) =   | [ C 0 ]             |         |      |           |
| ---                                                                                       | ------   | -------             | ---     | ---  | ---       |
|                                                                                         |
| xˆ(t)                                                                                   |
| EXEMPLO:                                                                                  |
|  1 0  1                                                                              |
| x& =                                                                                     | x+       | u                   |         |      |           |
| -----                                                                                     | ---      | ---                 | ---     | ---  | ---       |
|                                                                                       |
| Dado; 0 −2 1 . Utilizar a realimentação de estados em conjunto com o                  |
|                                                                                          |
|  [ ]                                                                                     |
| y = 1 1x                                                                                 |
| observador de estados projetados anteriormente.                                           |
| SIMULAÇÃO:                                                                                |
|                                                                                           | x&(t)  |  A BK              | x(t) | B  |           |
| ---                                                                                       | -------- | ------------------- | ------- | ---- | ---       |
|                                                                                           |          | =                   | +       | u(t) |           |
|                                                                                           |        |                    |      |    |           |
|                                                                                           | x&ˆ(t) | LC A−LC+BKxˆ(t) |         | B  |           |

x(t)

|                                                                  |        | [ ]     |     |     |     |
| ---------------------------------------------------------------- | ------ | ------- | --- | --- | --- |
|                                                                  | y(t) = | C 0   |     |     |     |
| xˆ(t)                                                          |
| Rotina Matlab:                                                   |
| % Programa para Observadores de Estado + Realimentação de Estado |

clear all;close all;clc

A=[1 0;0 -2];B=[1 1]';C=[1 1];d=0; % Sistema Original
L=1/3*[16 -1]'; % Matriz de Ganhos do Observador
K=[-2 0]; % Matriz de Ganhos de Realimentaçao

| I=eye(2);                                     |     | % Matriz identidade 2x2    |     |     |     |
| --------------------------------------------- | --- | -------------------------- | --- | --- | --- |
| Aa=[A B*K;L*C (A-L*C+B*K)];                   |
| Ba=[B;B]; % Matrizes aumentadas do Observador |
| Ca=[C zeros(size(C))];                        |
| t=0:0.01:5;                                   |     | % Tempo da simulaçao       |     |     |     |
| -------------------------------------         | --- | -------------------------- | --- | --- | --- |
| u=0*t;                                        |     | % Sinal de entrada (nulo)  |     |     |     |
| x0=[1 1 0 0]';                                |     | % Condiçoes iniciais       |     |     |     |

| Sistemas de Controle |     |     |     |     | 75  |
| -------------------- | --- | --- | --- | --- | --- |

[Y,X] = LSIM(Aa,Ba,Ca,d,u,t,x0); % Simula o sistema aumentado
% para entrada e cond. iniciais dadas

| E = [X(:,1)-X(:,3) X(:,2)-X(:,4)]; |     | % Erro de estimativa |     |     |     |
| ---------------------------------- | --- | -------------------- | --- | --- | --- |

Figure;plot(t,X(:,1),'b','linewidth',2);hold on; plot(t,X(:,3),'r','linewidth',2)
set(1,'Position',[10 258 380 280]);title('Estado X_1 e sua estimativa')
legend('X_1','X_1 Estimado'); hold off

figure;plot(t,X(:,2),'b','linewidth',2);hold on; plot(t,X(:,4),'r','linewidth',2)
set(2,'Position',[232 258 380 280]);title('Estado X_2 e sua estimativa')
legend('X_2','X_2 Estimado'); hold off

figure;plot(t,E(:,1),'b','linewidth',2);hold on; plot(t,E(:,2),'r','linewidth',2)
set(3,'Position',[482 258 380 280]);title('Erro de estimativa')
legend('Erro de estimativa de X_1','Erro de estimativa de X_2');hold off

figure;plot(t,Y,'b','linewidth',2);set(4,'Position',[602 258 380 280])
title('Resposta do Sistema')

| Estado X e sua estimativa | 1                       |            | Estado X e sua estimativa |                     |            |
| ------------------------- | ----------------------- | ---------- | ------------------------- | ------------------- | ---------- |
| 1.2                       |                         |            | 1                         | 2                   |            |
|                           |                         | X          |                           |                     | X          |
|                           |                         | 1          |                           |                     | 2          |
| 1                         |                         | X Estimado |                           |                     | X Estimado |
|                           |                         | 1          |                           |                     | 2          |
| 0.5                       |
| 0.8                       |
| 0.6                       |
| 0                         |
| 0.4                       |
| 0.2                       |
| -0.5                      |
| 0                         |
| -1                        |
| -0.2                      |
| 0 1                       | 2                       | 3 4 5      | 0 1                       | 2                   | 3 4 5      |
| ---                       | ------------------      | -----      | ---                       | ------------------- | -----      |
|                           | Erro de estimativa      |            |                           | Resposta do Sistema |            |
| 2                         |
| 1                         |
|                           | Erro de estimativa de X | 1          |                           |                     |            |
| ---                       | ----------------------- | ---        | ---                       | ---                 | ---        |
| 0.8                       |
| Erro de estimativa de X   |
|                           |                         | 2          | 1.5                       |                     |            |
| ---                       | ---                     | ---        | ---                       | ---                 | ---        |
| 0.6                       |
| 0.4                       |
| 1                         |
| 0.2                       |
| 0.5                       |
| 0                         |
| -0.2                      |
| 0                         |
| -0.4                      |
| -0.6                      |                         |            | -0.5                      |                     |            |
| ----                      | ---                     | -----      | ----                      | ---                 | -----      |
| 0 1                       | 2                       | 3 4 5      | 0 1                       | 2                   | 3 4 5      |

| 76  |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | -------------------- | --- |

7.10 Seguidores de Referência (ou servosistemas)
Para que um sistema descrito por variáveis de estado possa, além de possuir a dinâmica
desejada (garantida pela alocação de pólos por realimentação de estado), seguir uma
determinada entrada, com erro zero, usamos o princípio do modelo interno.
Considere entradas de referência descritas por equações do tipo:

|                                                                                            |              |            |                     |         | x& =        | A x           |        |           |
| ------------------------------------------------------------------------------------------ | ------------ | ---------- | ------------------- | ------- | ------------ | ------------- | ------ | --------- |
|                                                                                            |              |            |                     |         | r            | r r           |        |           |
|                                                                                            |              |            |                     |         |             |               |        | ( 7.21 )  |
|                                                                                            |              |            |                     |         | r =C         | x             |        |           |
|                                                                                            |              |            |                     |         |             | r r           |        |           |
| com condições iniciais desconhecidas. Um modelo equivalente para entradas de referência é: |
|                                                                                            |              |            | r(n)                | r(n−1)  |              |               |        |           |
| ---                                                                                        | ---          | ---        | ----                | ------  | ------------ | ---           | ---    | --------- |
|                                                                                            |              |            | +α                  |         | +....+αr&+αr |               | =0     | ( 7.22 )  |
|                                                                                            |              |            |                     | n−1     |              | 1             | 0      |           |
| onde r(n) é a n-ésima derivada de r(t).                                                    |
| Exemplos:                                                                                  |
| a) Degrau unitário:                                                                        |              |            | r(t) = 1; t ≥ 0; r& |         | =0:          |               |        |           |
| --------------------                                                                       | ---          | ---        | ------------------- | ---     | ----         | ---           | ---    | ---       |
|                                                                                            |              |            | x&                 | =0x     |              |               |        |           |
| r r                                                                                        |
| Escolhendo x                                                                               | = r, temos: |            |                     |         |              |               |        |           |
| ------------                                                                               | ------------ | ---        | ---                 | ---     | ---          | ---           | ---    | ---       |
| r                                                                                          |
|                                                                                            |              |            |  r =1x             |         |              |               |        |           |
| ---                                                                                        | ---          | ---        | -------             | ---     | ---          | ---           | ---    | ---       |
| r                                                                                          |
| r& =1                                                                                     |
| b) Rampa unitária:                                                                         |              |            | r(t) = t, t ≥ 0;   |         |              | :             |        |           |
| -------------------                                                                        | ---          | ---        | ------------------  | ---     | ---          | ---           | ---    | ---       |
| &r&=0                                                                                     |
|                                                                                            |              |            |                     | x&   | 0           | 1x         |        |           |
| ------------                                                                               | ---          | ---------- | ---                 | ------- | ---          | ------        | ---    | ---       |
|                                                                                            |              |            |                     | r1      |              | r1            |        |           |
|                                                                                            |              |            |                     |      | =           |            |        |           |
|                                                                                            |              |            |                     | x&      | 0           | 0 x         |        |           |
|                                                                                            | x           | = r        |                     |      |              |              |        |           |
| Escolhendo                                                                                | r1           | , temos:  |                     | r2      |              | r2            |        |           |
|                                                                                            | x            | = r&       |                     |         | x           |               |        |           |
|                                                                                            |             |            |                     |        |              |              |        |           |
|                                                                                            | r2           |            |                     | r = [ 1 | 0 ]          | r1            |        |           |
|                                                                                            |              |            |                     |        |             |              |        |           |
| x                                                                                          |
|                                                                                            |              |            |                     |        |             | r2           |        |           |
| ---                                                                                        | ---          | ---        | ---                 | ---     | ---          | ----          | ---    | ---       |
| • Princípio do modelo interno para referência do tipo degrau unitário                      |
|                                                                                            |              | x&(t)     | = Ax(t)+Bu(t)       |         |              |               |        |           |
| ----------------------                                                                     | ---          | ------     | -------------       | ---     | ---          | ---           | ---    | ---       |
| Considere o sistema:                                                                      |              |            |                     |         |              | .             |        |           |
| y(t) =Cx(t)                                                                               |
| Definimos o erro de rastreamento como: e(t)                                                |              |            |                     |         |              | = y(t)−r(t).  |        |           |
| -------------------------------------------                                                | ---          | ---        | ---                 | ---     | ---          | ------------- | ---    | ---       |
| Das características do sinal de referência, temos: e&(t) = y&(t)−r&(t) = y&(t) =Cx&(t).    |
|                                                                                            |              |            |                     |         |              | z = x&       | e& =Cz |           |
| ---                                                                                        | ---          | ---        | ---                 | ---     | ---          | -------       | ------ | ---       |
| Definimos novas variáveis de estado como: , então temos: , ou, na                          |
|                                                                                           |
| w=u& z& = Az+Bw                                                                           |
| forma matricial:                                                                           |
|                                                                                            |              |            | e&                | 0      | Ce        | 0           |        |           |
| ---------------------                                                                      | ---          | ---        | ----                | ---     | -----        | --------      | ---    | --------- |
|                                                                                            |              |            |                     | =       |              | +             | w      | ( 7.23 )  |
|                                                                                            |              |            |                    |       |              |          |        |           |
|                                                                                            |              |            | z&                | 0      | Az        | B           |        |           |
| Sistemas de Controle                                                                       |              |            |                     |         |              |               |        | 77        |

Se o sistema for controlável, então, existe uma lei de controle por realimentação de
estado, da forma; w= k e+k z, tal que os pólos do sistema aumentado podem ser

|                                                                                               |     |     | 1          | 2           |             |              |            |        |     |           |
| --------------------------------------------------------------------------------------------- | --- | --- | ---------- | ----------- | ----------- | ------------ | ---------- | ------ | --- | --------- |
| posicionados arbitrariamente.                                                                 |
| Desde que os pólos do sistema aumentado sejam alocados na região de estabilidade, o           |
| erro de rastreamento será estável. Assim, o objetivo de rastreamento assintótico com erro em  |
| regime nulo será alcançado. Ou seja, a resposta do sistema abaixo é assintóticamente estável. |
|                                                                                               |     |     |            | e&        |  0         | C            | e       |        |     |           |
| ---                                                                                           | --- | --- | ---        | ----        | ----        | ----         | ----       | ---    | --- | --------- |
|                                                                                               |     |     |            | =           |             |              |            |        |     | ( 7.24 )  |
|                                                                                               |     |     |            |           |            |              |         |        |     |           |
|                                                                                               |     |     |            | z&        |  Bk        | A+Bk         | z       |        |     |           |
|                                                                                               |     |     |            |             | 1           |              | 2          |        |     |           |
| A entrada de controle u(t) é obtida da expressão:                                             |
|                                                                                               |     |     |            | t           |             | t            |            |        |     |           |
| ---                                                                                           | --- | --- | ----       | ----------- | ---         | ------------ | ---        | -----  | --- | --------- |
|                                                                                               |     |     | u(t)       | = ∫ w(τ)dτ= |             | k ∫ e(τ)dτ+k |            | x(t)   |     | ( 7.25 )  |
|                                                                                               |     |     |            | 0           |             | 1 0          |            | 2      |     |           |
| Logo:                                                                                         |
|                                                                                               |     |     |            |             |             |             | t          |        |    |           |
| ---                                                                                           | --- | --- | ---------- | ---         | ----------- | ---          | ---------- | ---    | --- | ---       |
|                                                                                               |     |     | x& = Ax+Bu | ⇒           | x& = Ax+Bk |              | ∫ e(τ)dτ+k | x     |     |           |
| ( 7.26 )                                                                                      |
|                                                                                               |     |     |            |             |             |  1          | 0          | 2      |    |           |
| ---                                                                                           | --- | --- | ---        | ---         | ---         | ---          | ---        | ---    | --- | ---       |
| Definindo: x (t) = ∫e(τ)dτ, temos: x& (t) =e(t) = y(t)−r(t) =Cx(t)−r(t);                      |
|                                                                                               |     | n+1 |            |             | n+1         |              |            |        |     |           |
| ---                                                                                           | --- | --- | ---        | ---         | ---         | ---          | ---        | ---    | --- | ---       |
| logo:                                                                                         |
|                                                                                               |     |     |  x&       |  A+Bk     |             | Bk         | x         |  0   |     |           |
| ---                                                                                           | --- | --- | ----       | -------     | ---         | -----        | ---        | ----   | --- | ---       |
| 2 1                                                                                           |
|                                                                                               |     |     |           |  =        |             |            |  +        |   r  |     | ( 7.27 )  |
| ---                                                                                           | --- | --- | ---        | -----       | ---         | ---          | ---        | ------ | --- | --------- |
|                                                                                               |     |     | x&         |             | C           | 0            | x          | −1   |     |           |
|                                                                                               |     |     |           |           |             |            |           |        |     |           |
|                                                                                               |     |     | n+1        |             |             |              | n+1        |        |     |           |

.

|      | r(t)+ |     |     |     | u(t) |     |     | x(t) |     | y(t) |
| ---- | ----- | --- | --- | --- | ---- | --- | --- | ---- | --- | ---- |
|      |       |     |     | +   |      |     | +   |      |     |      |
|      |       | k   |     | ∫   |      | B   |     | ∫    |     |      |
|      |       | 1   |     |     |      |     |     |      | C   |      |
|      | -     |     |     | +   |      |     | +   |      |     |      |
| x(t) |
| A    |
| k    |
| 2    |

EXEMPLO:

|                                                                              |     |     |     |     |    |  0   | 1  | 0 |     |     |
| ---------------------------------------------------------------------------- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |
|                                                                              |     |     |     |     | x& | =     | x+  | u   |     |     |
|                                                                              |     |     |     |     |     |      |    |   |     |     |
| Considerando o sistema descrito por:  −2 −2 1 . Projetar um controlador |
|                                                                              |     |     |     |     |    | [     | ]   |     |     |     |
| ---                                                                          | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |
|                                                                              |     |     |     |     | y  | = 1 0 | x   |     |     |     |
| para que o sistema tenha erro zero para entrada degrau.                      |

| 78  |     |     |     |     |     |     |     |     | Sistemas de Controle |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | --- |

SOLUÇÃO:
Sistema aumentado é dado por:

|                                                                                              |       |              | e&          | 0 1     | 0         | e        | 0            |     |        |        |
| -------------------------------------------------------------------------------------------- | ----- | ------------ | ----------- | -------- | --------- | -------- | -------------- | --- | ------ | ------ |
|                                                                                              |       |              |           |          |         |         |                |     |        |        |
|                                                                                              |       |              |           |         |         |         |              |     |        |        |
|                                                                                              |       |              | z& =        | 0 0      | 1         | z +      | 0 w .          |     |        |        |
|                                                                                              |       |              |  1        |         |         | 1       |              |     |        |        |
|                                                                                              |       |              |   z &   |   0 −2 | −2    | z      |   1        |     |        |        |
|                                                                                              |       |              | 2           |          |           | 2        |                |     |        |        |
| Logo, a matriz de controlabilidade do sistema aumentado, isto é, calculada levando-se        |
| em conta as matriz A e B do sistema aumentado é da por:                                      |
|                                                                                              |       |              |             |          |           | 0       | 0 1           |     |        |        |
| ---                                                                                          | ---   | ---          | -----       | ---      | ---       | -----    | -------        | --- | ---    | ---    |
|                                                                                              |       |              | [           |          | ]         |          |                |     |        |        |
|                                                                                              |       |              |             | A2B      |           |         |               |     |        |        |
|                                                                                              |       |              | U = B       | AB       | =         | 0        | 1 −2 .         |     |        |        |
|                                                                                              |       |              |             |          |           |         |               |     |        |        |
|                                                                                              |       |              |             |          |           | 1 −2    | 2             |     |        |        |
|                                                                                              |       |              |             |          |           |         |               |     |        |        |
| Como o posto da matriz de controlabilidade do sistema aumentado é igual à dimensão do        |
| sistema aumentado: ρ(U) = n = 3, o sistema é controlável. Logo, é possível alocar seus pólos |
| de maneira que o rastreamento da referência seja assintótico.                                |
| Escolhendo os pólos desejados em –10 e -1±j1, temos:                                         |
|                                                                                              | ∆(s)  | =(s+10)(s+1+ |             | j1)(s+1− | j1)       | = s3     | +12s2 +22s+20  |     |        |        |
| ---                                                                                          | ----  | ------------ | ---         | -------- | ---       | ----     | -------------- | --- | ---    | ---    |
| Aplicação da fórmula de Ackermann:                                                           |
|                                                                                              |       |              |             |         | 2        | 2        | 1             |     |        |        |
| ---                                                                                          | ---   | ---          | ---         | ---      | ---       | ---      | ---            | --- | ---    | ---    |
|                                                                                              |       |              |             |         |          |          |               |     |        |        |
|                                                                                              |       |              |             | U−1      | = 2       | 1        | 0              |     |        |        |
|                                                                                              |       |              |             |         |          |          |               |     |        |        |
|                                                                                              |       |              |             |         | 1        | 0        | 0             |     |        |        |
|                                                                                              |       |              |             |         |          |          |               |     |        |        |
| [ ] U−1q                                                                                     |
| K = − 0                                                                                      | 0 ... | 1            | (A); com:  |          |           |          |                |     |        |        |
| -------                                                                                      | ----- | ---          | ----------- | ---      | ---       | ---      | ---            | --- | ---    | ---    |
| c                                                                                            |
|                                                                                              |       |              |             |         |           |          |                |     | 20 20 | 10    |
| ---                                                                                          | ---   | ---          | ---         | ---      | -----     | -------- | ------         | --- | ------ | ---    |
|                                                                                              |       |              |             |          |           |          |                |     |       |       |
|                                                                                              |       |              |             |  q      | (A) =     | A3 +12A2 | +22A+I         | =   | 0      | 0 0    |
|                                                                                              |       |              |             |          |           |          |                |     |       |       |
|  c                                                                                          |
|                                                                                              |       |              |             |         |           |          |                |     |   0  | 0 0  |
| ---                                                                                          | ---   | ---          | ---         | ---      | ---       | ---      | ---            | --- | -----  | ------ |
|                                                                                             |
|                                                                                              | [     | ]            | [           | ] [      |           |          | ]              |     |        |        |
| -------                                                                                      | ---   | ---          | ----        | -------  | ---       | ---      | ------         | --- | ---    | ---    |
| Logo: K                                                                                      | = k   | k =          | k k         | k = −20  |           | −20      | −10 .          |     |        |        |
|                                                                                              | 1     | 2            | 1 21        | 21       |           |          |                |     |        |        |
| De onde concluímos que a lei de controle é dada por:                                         |
|                                                                                              | t     |              | t           |          |           |          | t [            |     | ]      |        |
| ---                                                                                          | ---   | ---          | ---         | ---      | ---       | ---      | ---            | --- | ---    | ---    |
| u(t) = ∫ w(τ)dτ= k ∫ e(τ)dτ+k x(t) = −20∫ e(τ)dτ+ −20 −10 x(t)                               |
|                                                                                              |       |              | 1           |          | 2         |          |                |     |        |        |
| ---                                                                                          | ---   | ---          | ---         | ---      | ---       | ---      | ---            | --- | ---    | ---    |
|                                                                                              | 0     |              | 0           |          |           |          | 0              |     |        |        |
| logo:                                                                                        |
|                                                                                              |       |              | x&        |  0      | 1         | 0x     |   0         |     |        |        |
| ---                                                                                          | ---   | ---          | ------      | -------  | ---       | ------   | -------        | --- | ---    | ---    |
|                                                                                              |       |              | 1           |          |           | 1        |                |     |        |        |
|                                                                                              |       |              |           |         |           |        |             |     |        |        |
|                                                                                              |       |              | x& =        | −22 −12  | −20       | x        | + 0 r          |     |        |        |
|                                                                                              |       |              |  2        |         |           |  2    |              |     |        |        |
|                                                                                              |       |              |  x&       |  1      | 0         | 0  x   |   −1        |     |        |        |
|                                                                                              |       |              |           |         |           |        |             |     |        |        |
|                                                                                              |       |              | 3           |          |           | 3        |                |     |        |        |

| Sistemas de Controle |     |     |     |     |     |     |     |     |     | 79  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

SIMULAÇÃO:

|                                                      |     |     |  x& |  A+Bk |         | Bk  |   | x  |  0 |     |     |
| ---------------------------------------------------- | --- | --- | ---- | ------- | ------- | --- | --- | --- | ---- | --- | --- |
|                                                      |     |     |      | =       |         | 2   | 1   | +   | r    |     |     |
|                                                      |     |     |     |       |         |     |   |    |    |     |     |
|                                                      |     |     | x&   |         | C       | 0   | x   |     | −1 |     |     |
|                                                      |     |     |     |       |         |     |   |    |      |     |     |
|                                                      |     |     | n+1  |         |         |     |     | n+1 |      |     |     |
|                                                      |     |     |      |         |  x    |     |     |     |      |     |     |
|                                                      |     |     |      | [       | ]       |     |     |     |      |     |     |
|                                                      |     |     | y =  | C 0     |         |     |     |     |      |     |     |
|                                                      |     |     |      |         |       |     |     |     |      |     |     |
| x                                                    |
|                                                      |     |     |      |         |  n+1  |     |     |     |      |     |     |
| ---                                                  | --- | --- | ---  | ---     | ------- | --- | --- | --- | ---  | --- | --- |
| Rotina Matlab:                                       |
| % Programa para Seguidor de Referêcia do tipo Degrau |

clear all;close all, clc

| A=[0 1;-2 -2];B=[0 1]';C=[1 0];d=0; |     |     |     |     |     | % Sistema Original |     |     |     |     |     |
| ----------------------------------- | --- | --- | --- | --- | --- | ------------------ | --- | --- | --- | --- | --- |
| K=[-20 -20 -10];                    |     |     |     |     |     | % Matriz de Ganhos |     |     |     |     |     |
| k1=K(1,1);k2=K(1,2:3);              |

Aa=[A+B*k2 B*k1;C 0];
Ba=[zeros(size(B));-1]; % Matrizes aumentadas do Observador
Ca=[C 0];
t=0:0.01:10; % Tempo da simulaçao
u=0*t+1; % Sinal de entrada (degrau)
x0=[0 0]';x0a=[0 0 0]'; % Condiçoes iniciais (nulas)

[Y1,X1]= LSIM(A,B,C,d,u,t,x0); % Simula o sistema, sem realimentaçao
% para uma entrada e cond. iniciais dadas
[Y,X] = LSIM(Aa,Ba,Ca,d,u,t,x0a); % Simula o sistema, com seguidor de referência
% para uma entrada e cond. iniciais dadas

figure; plot(t,Y1,'r','linewidth',2); set(1,'Position',[232 258 380 280])
title('Saída do Sistema Original'); axis([0 max(t) 0 1.2])
figure; plot(t,Y,'b','linewidth',2); set(2,'Position',[232 258 380 280])
title('Saída do Sistema com Seguidor de Referência'); axis([0 max(t) 0 1.2])
Saída do Sistema Original Saída do Sistema com Seguidor de Referência

|                                                                      | 1   |     |     |     |     |     | 1   |     |     |                      |      |
| -------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | ---- |
|                                                                      | 0.8 |     |     |     |     |     | 0.8 |     |     |                      |      |
|                                                                      | 0.6 |     |     |     |     |     | 0.6 |     |     |                      |      |
|                                                                      | 0.4 |     |     |     |     |     | 0.4 |     |     |                      |      |
|                                                                      | 0.2 |     |     |     |     |     | 0.2 |     |     |                      |      |
|                                                                      | 0   |     |     |     |     |     | 0   |     |     |                      |      |
|                                                                      | 0 2 | 4   | 6   | 8   | 10  |     | 0   |     | 2 4 | 6                    | 8 10 |
| • Princípio do modelo interno para referência do tipo rampa unitária |
| 80                                                                   |     |     |     |     |     |     |     |     |     | Sistemas de Controle |      |
| ---                                                                  | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | ---  |

|                                                                                         |     |      | x&(t) | = Ax(t)+Bu(t) |     |            |       |           |             |     |           |
| --------------------------------------------------------------------------------------- | --- | ---- | ------ | ------------- | --- | ---------- | ----- | --------- | ----------- | --- | --------- |
| Considere o sistema:                                                                   |     |      |        |               |     |            |       |           |             |     |           |
|                                                                                         |     |      | y(t)  | =Cx(t)        |     |            |       |           |             |     |           |
| Definimos o erro de rastreamento como: e(t) = y(t)−r(t); com: e&&(t) = &y&(t) =C&x&(t). |
| z =&x&                                                                                 |
| Definimos novas variáveis de estado como:                                              |     |      |        |               |     |            |       | , temos:  |             |     |           |
| -------------------------------------------                                             | --- | ---  | ---    | ---           | --- | ---        | ---   | --------- | ---         | --- | ---       |
| w=u&&                                                                                  |
|                                                                                         |     |      |        | e&          | 0  | 1 0e    |       | 0       |             |     |           |
| ---                                                                                     | --- | ---  | ---    | ----          | --- | -------    | ----  | ---       | ---         | --- | ---       |
|                                                                                         |     |      |        |             |    |            |    |         |             |     |           |
| w                                                                                       |
|                                                                                         |     |      |        | e&&          | = 0 | 0 C        | e& + | 0         |             |     | ( 7.28 )  |
| ---                                                                                     | --- | ---  | ---    | ------        | --- | ----       | ----- | ----      | ---         | --- | --------- |
|                                                                                         |     |      |        |              |    |            |     |         |             |     |           |
|                                                                                         |     |      |        |  z&         |  0 | 0 A       |  z  |  B      |             |     |           |
|                                                                                         |     |      |        |             |    |            |    |         |             |     |           |
| Se o sistema acima for controlável, então existe w = k e+k e&+k z, tal que o sistema    |
|                                                                                         |     |      |        |               |     |            |       |           | 1 2         | 3   |           |
| ---                                                                                     | --- | ---  | ---    | ---           | --- | ---        | ---   | ---       | ---         | --- | ---       |
| aumentado é assintóticamente estável e e(t) → 0 quando t → ∞.                           |
| A lei de controle será dada por:                                                        |
|                                                                                         |     |      | t      | sw(τ)dτdδ=∫   | t   | s(         |       |           | )           |     |           |
| ---                                                                                     | --- | ---- | -----  | -----------   | --- | ---------- | ---   | -------   | ----------- | --- | ---       |
|                                                                                         |     | u(t) | = ∫ ∫  |               |     | ∫ k e(τ)+k |       | e&(τ)+k   | &x&(t) dτdδ |     |           |
|                                                                                         |     |      | 0 0    |               | 0   | 0 1        |       | 2         | 3           |     |           |

|              |     | u(t)    | = k           | t se(τ)dτdδ+k |            | te(τ)dτ+k     |          | x(t)    |             |             |           |
| ------------ | --- | ------- | ------------- | ------------- | ---------- | ------------- | -------- | ------- | ----------- | ----------- | --------- |
|              |     |         | ∫             | ∫             |            | ∫             |          |         |             |             |           |
|              |     |         | 1             | 0 0           |            | 2 0           |          | 3       |             |             |           |
| Logo:        |
|              |     |         |               |               | (          |               |          |         |             | )           |           |
| ------------ | --- | ------- | ------------- | ---------     | ---------- | ------------- | -------- | -----   | ----------- | ----------- | --------- |
|              |     |         |               |               |            | t se(τ)dτdδ+k |          |         | te(τ)dτ+k   |             |           |
|              | x&  | = Ax+Bu | ⇒             | x& = Ax+B     | k          | ∫ ∫           |          |         | ∫           | x(t)        | ( 7.29 )  |
|              |     |         |               |               |            | 1 0 0         |          |         | 2 0         | 3           |           |
|              |     | x (t)  | = ∫e(τ)dτ     |               |            |               | x& (t)  | =e(t)   | = y(t)−r(t) | =Cx(t)−r(t) |           |
|              |     | n+1     |               |               |            |               | n+1      |         |             |             |           |
| Definindo:  |     |         |               |               | , temos:  |               |          |         |             |             | ;         |
|              |     |  x (t) | = ∫∫e(τ)dτ dδ |               |            |               |  x& (t) | = x     | (t)         |             |           |
|              |     | n+2     |               |               |            |               | n+2      |         | n+1         |             |           |
| logo:        |
|              |     |         |  x&          |  A+Bk       |            | Bk            | Bk       |  x    |   0      |             |           |
| ---          | --- | ---     | ------        | -------       | ---        | ---           | ---      | ------- | -------     | ---         | --------- |
|              |     |         |               |               | 3          | 2             | 1        |         |             |             |           |
|              |     |         |              |             |            |               |          |       |          |             |           |
|              |     |         | x&            | =             | C          | 0             | 0        | x       | + −1 r      |             | ( 7.30 )  |
|              |     |         |  n+1        |              |            |               |          |  n+1 |           |             |           |
|              |     |         |  x&          |             | 0          | 1             | 0        |   x   |   0      |             |           |
|              |     |         |              |             |            |               |          |       |          |             |           |
|              |     |         | n+2           |               |            |               |          | n+2     |             |             |           |

.

| r(t)+ |     |     |     |     |     | +   | u(t) |     | + x(t) |     | y(t) |
| ----- | --- | --- | --- | --- | --- | --- | ---- | --- | ------ | --- | ---- |

-

|      | k   |     | ∫   |     | ∫   |     |     | B   |     | ∫   | C   |
| ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1    |
| -    |     |     |     | +   |     | +   |     |     | +   |     |     |
| ---  | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| x(t) |
| k    |
|      |     | 2   |     |     |     |     |     |     |     | A   |     |
| ---  | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| k    |
| 3    |

7.11 Descrição por Variáveis de Estado de Sistemas Discretos no Tempo
A partir de agora serão considerados sistemas discretos no tempo.

| Sistemas de Controle |     |     |     |     |     |     |     |     |     |     | 81  |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Considere um sistema discreto linear e invariante no tempo descrito em variáveis de
estado:

|     |     | x(k +1) | =Gx(k)+Hu(k) |     |     |     |
| --- | --- | -------- | ------------ | --- | --- | --- |

|                    |     |    |     |     |     | ( 7.31 ) |
| ------------------ | --- | --- | --- | --- | --- | -------- |
| y(k) =Cx(k)+Du(k) |

Aplicando transformada Z, temos:

|     |     | zX(z)−zx(0) | =GX(z)+HU(z) | ⇔   |     |     |
| --- | --- | ----------- | ------------ | --- | --- | --- |

|                                                                                       |           | ⇔ ( zI−G )               | X(z) = zx(0)+HU(z) |               |                      |           |
| ------------------------------------------------------------------------------------- | --------- | ------------------------ | ------------------ | ------------- | -------------------- | --------- |
| Para condições iniciais nulas (x(0) = 0):                                             |
| ( )−1HU(z)                                                                            |
|                                                                                       |           | X(z)                     | = zI−G             |               |                      |           |
| ---                                                                                   | ---       | ----                     | ------             | ---           | ---                  | ---       |
| Logo;                                                                                 |
|                                                                                       |           | [                        |                    | ]             |                      |           |
| ---                                                                                   | ---       | --------                 | -----------------  | ---           | ---                  | --------- |
|                                                                                       |           | Y(z) = C                 | ( zI−G )−1H+DU(z)  |               |                      |           |
|                                                                                       |           |                          |                    |               |                      | ( 7.32 )  |
| Y(z) =G(z)U(z)                                                                        |
| onde:                                                                                 |
|                                                                                       |           |                          | [                  | ]             |                      |           |
| ---                                                                                   | ---       | ------                   | --------           | ---           | ---                  | --------- |
|                                                                                       |           |                          | ( )−1H+D           |               |                      |           |
|                                                                                       |           | G(z) =                   | C zI−G             |               |                      | ( 7.33 )  |
| 7.11.1 Discretização da Equação de Estado                                             |
| Considere um sistema linear e invariante no tempo, descrito pela seguinte equação     |
| diferencial: x&(t) = Ax(t)+Bu(t). A solução para esta equação diferencial é dada por: |
| t                                                                                     |
| eAtx(0)+eAt∫e−AτBu(τ)dτ                                                               |
| x(t) =                                                                                |
| 0                                                                                     |
| Supondo u(t) constante entre kT e (k + 1)T;                                           |
| (k+1)T                                                                                |
|                                                                                       | (         | ) =eA(k+1)Tx(0)+eA(k+1)T |                    | ∫e−AτBu(τ)dτ  |                      |           |
| ---                                                                                   | --------- | ------------------------ | ---                | ------------- | ---                  | --------- |
|                                                                                       | x (k +1)T |                          |                    |               |                      | ( 7.34 )  |
| 0                                                                                     |
| e;                                                                                    |
| kT                                                                                    |
|                                                                                       |           | ( )                      |                    |               |                      |           |
| ---                                                                                   | ---       | -----------------        | -------------      | ---           | ---                  | ---       |
|                                                                                       | x         | kT =eAkTx(0)+eAkT        | ∫e−AτBu(τ)dτ       |               |                      |           |
| 0                                                                                     |
| Multiplicando-se ambos os lados desta ultima equação por eAT, obtém-se:               |
| 82                                                                                    |           |                          |                    |               | Sistemas de Controle |           |
| ---                                                                                   | ---       | ---                      | ---                | ---           | -------------------- | ---       |

kT

|                                                                    |     |     |      | (            | )   |                       |                    |     |               |     |     |     |     |
| ------------------------------------------------------------------ | --- | --- | ---- | ------------ | --- | --------------------- | ------------------ | --- | ------------- | --- | --- | --- | --- |
|                                                                    |     |     | eATx | kT           | =   | eA(k+1)Tx(0)+eA(k+1)T |                    |     | ∫e−AτBu(τ)dτ  |     |     |     |     |
| ( 7.35 )                                                           |
| 0                                                                  |
| Agora, subtraindo a equação ( 7.34 ) da equação( 7.35 ), obtém-se: |
| (k+1)T                                                             |
|                                                                    |     |     | x    | ( (k +1)T    | )   | = eATx(kT)+eAT        |                    |     | ∫e−AτBu(τ)dτ= |     |     |     |     |
| ---                                                                | --- | --- | ---  | ---------    | --- | --------------        | ---                | --- | ------------- | --- | --- | --- | --- |
|                                                                    |     |     |      |              |     |                       |                    |     | kT            |     |     |     |     |
| (k+1)T                                                             |
|                                                                    |     |     | =    | eATx(kT)+eAT |     |                       | ∫e−A(kT−τ)Bu(kτ)dτ |     |               |     |     |     |     |
| ---                                                                | --- | --- | ---  | ------------ | --- | ---                   | ------------------ | --- | ---           | --- | --- | --- | --- |
| kT                                                                 |
| Assim;                                                             |
| T                                                                  |
|                                                                    |     |     |      | (            | )   |                       |                    |     |               |     |     |     |     |
| ---                                                                | --- | --- | ---  | -------      | --- | -------------         | ---                | --- | ------------- | --- | --- | --- | --- |
|                                                                    |     |     | x    | (k +1)T      |     | =eATx(kT)+eAT         |                    |     | ∫e−AtBu(kT)dt | ⇔   |     |     |     |
| 0                                                                  |

T

|       |     |     |     | (    |        | ) =eATx(kT)+∫eAλBu(kT)dλ |     |     |     |     |     |     |           |
| ----- | --- | --- | --- | ---- | ------ | ------------------------ | --- | --- | --- | --- | --- | --- | --------- |
|       |     |     | ⇔   | x (k | +1)T   |                          |     |     |     |     |     |     |           |
| 0     |
| Logo: |
|       |     |     |     | (    |        | )                        |     |     |     |     |     |     |           |
| ---   | --- | --- | --- | ---  | ------ | ---------------------    | --- | --- | --- | --- | --- | --- | --------- |
|       |     |     |     | x    | (k+1)T | =G(T)x(kT)+H(T)u(kT)     |     |     |     |     |     |     | ( 7.36 )  |

EXEMPLO:

|                                                               |                |      |       | 0        | 1      | 0                   |     |             |         |       |        |     |     |
| ------------------------------------------------------------- | -------------- | ---- | ----- | --------- | ------- | --------------------- | --- | ----------- | ------- | ----- | ------ | --- | --- |
| Dado o sistema: x& = x+ u, com T =1s. Obter a forma discreta: |
|                                                               |                |      |       |          |        |                     |     |             |         |       |        |     |     |
| ---                                                           | ---            | ---  | ---   | ---       | ------- | --------------------- | --- | ---         | ---     | ---   | ---    | --- | --- |
|                                                               |                |      |       | 0        | −2     | 1                   |     |             |         |       |        |     |     |
|                                                               |                |      |       | (         |         | )                     |     |             |         |       |        |     |     |
|                                                               |                |      |       | x         | (k +1)T | =G(T)x(kT)+H(T)u(kT)  |     |             |         |       |        |     |     |
| SOLUÇÃO:                                                      |
|                                                               |                |      | G(T) | =eAT      |         |                       |     |             |         |       |        |     |     |
| ---                                                           | ---            | ---  | ----- | ----      | ---     | ---                   | --- | ---         | ---     | ---   | ---    | --- | --- |
|                                                              |
|                                                               | Sabendo que:  |      |       | T         |         | T                    |     |  , temos:  |         |       |        |     |     |
| ---                                                           | -------------- | ---- | ----  | --------- | ---     | ----------            | --- | ----------- | ------- | ----- | ------ | --- | --- |
|                                                               |                |      |       | ∫eAtBdt   |         | =∫eAtdtB            |     |             |         |       |        |     |     |
|                                                               |                |      | H(T)  | =         |         |                       |     |             |         |       |        |     |     |
|                                                               |                |      |      |           |         |                      |     |            |         |       |        |     |     |
|                                                               |                |      |       |           |         |                      |     |            |         |       |        |     |     |
|                                                               |                |      |      | 0         |         | 0                     |     |             |         |       |        |     |     |
|                                                               |                |      |       |           |         |                       |     |             | 1      | 1    |        |     |     |
|                                                               |                |      |       |           |        |                       | −1  |            |         |      | 1 (    | )  |     |
|                                                               |                | [    |       | ]         |         | s −1                 |    |             |  (     | )  1 | 1−e−2T |     |     |
|                                                               | eAT =L−1       | (    |       | )−1 =L−1 |         |                       |     | =L−1        | s s s+2 |      |        |    |     |
|                                                               |                | sI−A |       |           |         |                      |    |            |        |  =   | 2      |     |     |
|                                                               |                |      |       |           |         | 0 s−2               |     |             |         | 1     |        |     |     |
|                                                               |                |      |       |           |        |                       |     |            | 0      |     | e−2T   |    |     |
|                                                               |                |      |       |           |        |                       |     |            |         | 0    |        |    |     |
|                                                               |                |      |       |           |         |                       |     |             |       |     |        |     |     |
| s+2                                                           |
| e;                                                            |
| Sistemas de Controle                                          |                |      |       |           |         |                       |     |             |         |       |        |     | 83  |
| ---------------------                                         | ---            | ---  | ---   | ---       | ---     | ---                   | --- | ---         | ---     | ---   | ---    | --- | --- |

|                                                                                           |                                          |                       |              |          |                               |           |                  | 1 | e−2T   | −1 |     |
| ----------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------- | ------------ | -------- | ----------------------------- | --------- | ---------------- | --- | ------ | ---- | --- |
|                                                                                           |                                          |                       |              |         |  1                           | (         | )              |     |  T +  |     |     |
|                                                                                           |                                          | T                    |             |         | T 1                           | 1−e−2T    |  0             |   |       |    |     |
|                                                                                           |                                          |                       |              |          | ∫                            |           |                 | 2   |        | 2    |     |
|                                                                                           |                                          |  ∫eAtdt              |  B          | =        | 2                             |           | dt               | =  |       |    |     |
|                                                                                           |                                          |                      |             |         |                               |           |                |    |        |      |     |
|                                                                                           |                                          |                      |             |         |                              |           |   1          |    | 1(     | )   |     |
|                                                                                           |                                          | 0                     |              | 0       | 0                            | e−2T      |                 |     | 1−e−2T |      |     |
|                                                                                           |                                          |                       |              |          |                               |           |                 |    |        |     |     |
|                                                                                           |                                          |                       |              |          |                               |           |                  |    | 2      |     |     |
|                                                                                           | Se T                                     | =1s, temos ainda que: |              |          |                               |           |                  |     |        |      |     |
|                                                                                           | x ( (k+1)T                              | )                     | 1           | 0,432x | ( kT                          | ) 0,284 |                  |     |        |      |     |
|                                                                                           |                                          |                      |              |          |                               |          |                  |     |        |      |     |
|                                                                                           | 1                                        | =                     |              |          | 1                             | +         | u(kT)            |     |        |      |     |
|                                                                                           |  (                                      | )                    |             |          |  (                          | )       |                 |     |        |      |     |
|                                                                                           | x (k+1)T                                 |                       | 0           | 0,135  | x kT                          | 0,432   |                  |     |        |      |     |
|                                                                                           |  2                                      |                      |              |          | 2                             |          |                  |     |        |      |     |
| 7.12 Solução da Equação de Estado de Sistemas Discretos no Tempo                          |
|                                                                                           |                                          |                       |              |          |                               | x(k      | +1) =Gx(k)+Hu(k) |     |        |      |     |
| ---                                                                                       | ---------------------------------------- | ---                   | ---          | ---      | ---                           | -----     | ---------------- | --- | ---    | ---  | --- |
|                                                                                           | Considere o seguinte sistema discreto:  |                       |              |          |                               |           |                  |     |        | .    |     |
|                                                                                           |                                          |                       |              |          |                               | y(k)     | =Cx(k)+Du(k)     |     |        |      |     |
| Conhecendo as condições iniciais e a entrada a partir do instante zero, podemos escrever, |
| x(1) =Gx(0)+Hu(0)                                                                         |
|                                                                                           |                                          | x(2)                  | =Gx(1)+Hu(1) |          | =G2x(0)+GHu(0)+Hu(1)          |           |                  |     |        |      |     |
| ---                                                                                       | ---                                      | ----                  | ------------ | ---      | ----------------------------- | ---       | ---              | --- | ---    | ---  | --- |
|                                                                                           |                                          | x(3)                  | =Gx(2)+Hu(2) |          | =G3x(0)+G2Hu(0)+GHu(1)+Hu(2)  |           |                  |     |        |      |     |
| M                                                                                         |
| k−1                                                                                       |
| x(k) =Gkx(0)+∑Gk−j−1Hu(j)                                                                 |
| j=0                                                                                       |

7.13 Estabilidade de Sistemas Discretos no Tempo

|                                                                                        | x(k    | +1)          | =Gx(k)+Hu(k) |     |       |     |       |     |     |                      |           |
| -------------------------------------------------------------------------------------- | ------- | ------------ | ------------ | --- | ----- | --- | ----- | --- | --- | -------------------- | --------- |
|                                                                                        | Dado:  |              |              |     | .     |     |       |     |     |                      |           |
|                                                                                        | y(k)   | =Cx(k)+Du(k) |              |     |       |     |       |     |     |                      |           |
| Um sistema discreto é estável se todos os autovalores de G estão dentro de círculo     |
| unitário.                                                                              |
| 7.14 Controlabilidade de Sistemas Discretos no Tempo                                   |
| O sistema (G,H,C,D) é controlável se o posto da matriz de controlabilidade W for igual |
| C                                                                                      |
| a n.                                                                                   |
|                                                                                        |         |              |              |     | [     |     |       |     | ]   |                      |           |
| ---                                                                                    | ---     | ---          | ---          | --- | ----- | --- | ----- | --- | --- | -------------------- | --------- |
|                                                                                        |         |              |              |     | W = H | GH  | Gn−1H |     |     |                      | ( 7.37 )  |
|                                                                                        |         |              |              |     | C     |     | K     |     |     |                      |           |
| 84                                                                                     |         |              |              |     |       |     |       |     |     | Sistemas de Controle |           |

7.15 Observabilidade de Sistemas Discretos no Tempo
O sistema (G,H,C,D) é observável se o posto da matriz de observabilidade W for igual
O
a n.
C

|         |     |     |     |     |    |    |     |     |           |
| ------- | --- | --- | --- | --- | --- | --- | --- | --- | --------- |
|         |     |     |     |     |    |    |     |     |           |
| CG      |
|         |     |     |     |     |    |    |     |     |           |
| ---     | --- | --- | --- | --- | --- | --- | --- | --- | --------- |
|         |     |     |     | W   | =   |     |     |     | ( 7.38 )  |
|         |     |     |     | O   |    |    |     |     |           |
| M       |
|         |     |     |     |     |    |    |     |     |           |
| ---     | --- | --- | --- | --- | --- | --- | --- | --- | ---       |
| Cn−1G |

7.16 Realimentação de Estados de Sistemas Discretos no Tempo

|                                                                                        |         |       |               |                     | x(k    | +1) =Gx(k)+Hu(k) |     |     |           |
| -------------------------------------------------------------------------------------- | ------- | ----- | ------------- | ------------------- | ------- | ---------------- | --- | --- | --------- |
| Dado o seguinte sistema na forma discreta:                                            |         |       |               |                     |         |                  |     |     |           |
|                                                                                        |         |       |               |                     | y(k)   | =Cx(k)+Du(k)     |     |     |           |
| Fazendo-se: u(k) =Kx(k)+r(k), tem-se: x(k +1) =Gx(k)+H ( Kx(k)+r(k) ), logo:           |
|                                                                                        |         |       | x(k +1)       | = (G+HK)x(k)+Hr(k)  |         |                  |     |     |           |
| ---                                                                                    | ---     | ---   | -------       | ------------------- | ---     | ---              | --- | --- | ---       |
| ( 7.39 )                                                                               |
| O problema de controle através da realimentação de estados consiste em projetar K para |
| que (G + HK) tenha pólos desejados.                                                    |
| Assim como no caso contínuo uma das ferramentas disponíveis para a determinação da     |
| matriz de ganhos da realimentação, K, é a formula de Ackermann.                        |
|                                                                                        |         |       | K =           | − [ 0 0             |         | 1 ] W−1q (G)     |     |     |           |
| ---                                                                                    | ---     | ---   | ---           | -------             | ---     | -------------    | --- | --- | --------- |
|                                                                                        |         |       |               |                     | L       |                  |     |     | ( 7.40 )  |
|                                                                                        |         |       |               |                     |         | C c              |     |     |           |
| 7.17 Observadores de Estado de Sistemas Discretos no Tempo                             |
| A dinâmica do observador de estados é dada por:                                        |
|                                                                                        |         | xˆ(k | +1) =Gxˆ(k)+L |                     | ( y(k)− | yˆ(k) ) +Hu(k)   |     |     |           |
| ---                                                                                    | ---     | ----- | ------------- | ---                 | ------- | --------------   | --- | --- | --------- |
|                                                                                        |         |      |               |                     |         |                  |     |     | ( 7.41 )  |
| yˆ(k) =Cxˆ(k)                                                                         |
| A dinâmica do erro e estimação dos estados é descrita então por:                       |
| ~                                                                                      |
|                                                                                        | x(k +1) | = x(k | +1)−xˆ(k      | +1)⇒                |         |                  |     |     |           |
| ---                                                                                    | ------- | ----- | --------      | ----                | ---     | ---              | --- | --- | ---       |

|                                                                                      | xˆ(k +1) | =Gx(k)+Hu(k)− |     |           | [ Gxˆ(k)+L | ( y(k)− yˆ(k) | ) +Hu(k) | ] ⇒ |           |
| ------------------------------------------------------------------------------------ | -------- | ------------- | --- | --------- | ---------- | ------------- | -------- | --- | --------- |
| )~                                                                                   |
|                                                                                      |          |               |     | xˆ(k +1)  | = ( G−LC   | x             |          |     |           |
| ---                                                                                  | ---      | ---           | --- | --------  | --------   | ---           | ---      | --- | ---       |
| ( 7.42 )                                                                             |
| O projeto de observadores de estado consiste em determinar L para que (G – LC) tenha |
| pólos desejados. Dessa forma, utilizando-se a formula de Ackermann, temos:           |
|                                                                                      |          |               | L = | q (G)W−1[ | 0          | 0 1 ]T        |          |     |           |
| ---------------------                                                                | ---      | ---           | --- | --------- | ---        | -------       | ---      | --- | --------- |
|                                                                                      |          |               |     |           |            | L             |          |     | ( 7.43 )  |
|                                                                                      |          |               |     | C         | O          |               |          |     |           |
| Sistemas de Controle                                                                 |          |               |     |           |            |               |          |     | 85        |

7.18 Seguidor de Referência para Sistemas Discretos no Tempo
• Entrada do Tipo Degrau

|                                                                         |                   |                         |                   | x(k +1) | =Gx(k)+Hu(k) |         |        |        |           |            |        |            |           |
| ----------------------------------------------------------------------- | ----------------- | ----------------------- | ----------------- | -------- | ------------ | ------- | ------ | ------ | --------- | ---------- | ------ | ---------- | --------- |
|                                                                         | Dado o sistema:  |                         |                   |          |              |         |        |        |           |            |        |            |           |
|                                                                         |                   |                         |                   | y(k)    | =Cx(k)       |         |        |        |           |            |        |            |           |
| e um sinal do tipo: v(k)                                                |                   |                         |                   | =v(k     | −1)+r(k)−    |         | y(k),  |        |           |            |        |            |           |
| 14243                                                                   |
| e(k)                                                                    |
|                                                                         | v(k               | +1)                     | =v(k)+r(k         | +1)−     |              | y(k +1) | =      |        |           |            |        |            |           |
| -------                                                                 | ---               | ----------------------- | ----------------- | ----     | ---          | ------- | ---    | ---    | ---       | ---        | ---    | ---        | ---       |
| onde: =                                                                 |                   | v(k)+r(k                | +1)+−CGx(k)+Hu(k) |          | [            |         | ]      | =      |           |            |        |            |           |
|                                                                         | =                 | −CGx(k)+v(k)−CHu(k)+r(k |                   |          |              |         | +1)    |        |           |            |        |            |           |
| A realimentação de estado para o seguidor de degraus é dada por:        |
|                                                                         |                   |                         |                   |          |              | u(k)=   | −k     | x(k)+k | v(k)      |            |        |            | ( 7.44 )  |
| ---                                                                     | ---               | ---                     | --------          | -----    | ---          | -----   | ---    | ------ | -----     | ---        | ---    | ---        | --------- |
|                                                                         |                   |                         |                   |          |              |         |        | 2      | 1         |            |        |            |           |
|                                                                         | u(k               | +1)                     | = −k x(k          | +1)+k    | v(k          | +1)⇒    |        |        |           |            |        |            |           |
|                                                                         |                   |                         | 2                 |          | 1            |         |        |        |           |            |        |            |           |
| u(k +1) = −k [ Gx(k)+Hu(k) ] +k [ −CGx(k)+v(k)−CHu(k)+r(k +1) ] ⇒       |
| logo:                                                                   |                   |                         | 2                 |          |              |         | 1      |        |           |            |        |            |           |
| ------                                                                  | ---               | ---                     | ----              | ---      | --------     | ---     | ------ | ---    | --------- | ---        | ------ | --------   | ---       |
|                                                                         |                   |                         | (                 |          | )            |         | (      |        | )         |            |        |            |           |
|                                                                         | u(k               | +1)                     | = −k              | G−k      | CG x(k)+     |         | −k H−k |        | CH u(k)+k |            | v(k)+k | r(k +1)⇒   |           |
|                                                                         |                   |                         |                   | 2 1      |              |         | 2      | 1      |           | 1          |        | 1          |           |
| u(k +1) = ( −k G−k CG ) x(k)+ ( −k H−k CH ) u(k)+u(k)+k x(k)+k r(k +1)⇒ |
|                                                                         |                   |                         |                   | 2 1      |              |         | 2      | 1      |           |            |        | 2 1        |           |
| ---                                                                     | ---               | ---                     | ---               | ---      | ---          | ---     | ---    | ---    | ---       | ---        | ---    | ---        | ---       |
| u(k +1) = ( k −k G−k CG ) x(k)+ ( 1−k H−k CH ) u(k)+k r(k +1)           |
|                                                                         |                   |                         |                   |          |              |         |        |        |           |            |        |            | ( 7.45 )  |
| ---                                                                     | ---               | ---                     | ---               | ---      | ---          | ---     | ---    | ---    | ---       | ---        | ---    | ---        | --------- |
|                                                                         |                   |                         |                   | 2        | 2            | 1       |        |        | 2         | 1          |        | 1          |           |
| Daí, temos:                                                             |
|                                                                         |                   | x(k                    | +1)              |         |              | G       |        |        | H         | x(k)    |        | 0        |           |
| ---                                                                     | ---               | ----                    | ----              | ---      | ------       | ---     | ---    | ---    | ---       | ---------- | ---    | ---------- | ---       |
|                                                                         |                   |                         |                   | =        |              |         |        |        |           |            |        | + r(k +1)  |           |
|                                                                         |                   |                        |                   |        |              |         |        |        |           |          |       |          |           |
|                                                                         |                   | u(k                    | +1)              | k        | −k G−k       | CG      |        | 1−k    | H−k       | CH u(k) |        | k          |           |
|                                                                         |                   |                         |                   |         |              |         |        |        |           |            |        |          |           |
|                                                                         |                   |                         |                   | 2        | 2            | 1       |        | 2      | 1         |            |        | 1          |           |

( 7.46 )
x(k)

|                                                                           |     |     |     |     |      |      | y(k)=        | [ C | 0 ] |     |     |     |     |
| ------------------------------------------------------------------------- | --- | --- | --- | --- | ---- | ---- | ------------ | --- | --- | --- | --- | --- | --- |
|                                                                           |     |     |     |     |      |      |              |     |    |    |     |     |     |
| u(k)                                                                    |
| Se os autovalores da matriz dinâmica da equação ( 7.46 ) forem “estáveis” |
|                                                                           |     |     |     |     | v(k) | =V(k | +1) quando k |     |     | →∞  |     |     |     |
| ---                                                                       | --- | --- | --- | --- | ---- | ---- | ------------ | --- | --- | --- | --- | --- | --- |

|                                                                             |                |     |     |         |       | v(∞−) | =v(∞)+r |     | y(∞) |         |       |                      |           |
| --------------------------------------------------------------------------- | -------------- | --- | --- | ------- | ----- | ----- | ------- | --- | ---- | ------- | ----- | -------------------- | --------- |
| Considerando a referência do tipo degrau, e, definindo:x (k) = x(k)− x(∞) e |
| e                                                                           |
| u (k) =u(k)−u(∞). Temos:                                                    |
| e                                                                           |
|                                                                             |                |     | x  | (k +1) |      |       | G       |     |      | H       | x   | (k)                 |           |
| ---                                                                         | -------------- | --- | --- | ------- | ----- | ---   | ---     | --- | ---  | ------- | ----- | -------              | --------- |
|                                                                             |                |     |     | e       | =     |       |         |     |      |         |       | e                    | ( 7.47 )  |
|                                                                             |                |     |    |         |     |       |         |     |      |         |     |                     |           |
|                                                                             |                |     |  u | (k +1)  |   k | −k    | G−k     | CG  | 1−k  | H−k     | CH  | u (k)               |           |
|                                                                             |                |     |     | e       |       | 2 2   |         | 1   |      | 2 1     |       | e                    |           |
|                                                                             |                |     |     |         |       |       |         |     |      | x (k) |       |                      |           |
|                                                                             |                |     |     | [       |       |       |         |     |      | ]       |       |                      |           |
|                                                                             | Definindo w(k) |     |     | = k −k  | G−k   | CG    | 1−k     | H−k | CH   | e       |       |                      |           |
|                                                                             |                |     |     | 2       | 2     | 1     |         | 2   | 1    |        |      |                      |           |
|                                                                             |                |     |     |         |       |       |         |     |      |  u (k) |      |                      |           |
| e                                                                           |
| 86                                                                          |                |     |     |         |       |       |         |     |      |         |       | Sistemas de Controle |           |
| ---                                                                         | ---            | --- | --- | ---     | ---   | ---   | ---     | --- | ---  | ---     | ---   | -------------------- | ---       |

|                                                                                  | x (k +1) | G Hx  | (k) 0      |                   |     |           |       |           |
| -------------------------------------------------------------------------------- | ---------- | -------- | ------------- | ----------------- | --- | --------- | ----- | --------- |
|                                                                                  | e          |          | e             |                   |     | ˆ         | ˆ     |           |
| Temos:                                                                           |            | =        | +             | w(k) e ξ(k        | +1) | =G ξ(k)+H | w(k). |           |
|                                                                                  |           |        |           |                  |     |           |       |           |
|                                                                                  |  u (k +1) |  0 0 | u (k)  1   |                   |     |           |       |           |
|                                                                                  | e          |          | e             |                   |     |           |       |           |
| Usando realimentação de estado: w(k) = −Kξ(k), ˆ e calculando o ganho através da |
|                                                                                  |            | ˆ [      | ]             | ˆ                 |     |           |       |           |
| ------------------------                                                         | ---        | ---      | ------------  | ----------------- | --- | ---       | ---   | ---       |
| fórmula de Ackermmann: K                                                         |            | = 0      | 0 ... 1 W−1q  | (G ), temos que:  |     |           |       |           |
| c c                                                                              |
| −1                                                                               |
|                                                                                  |            |          | [             | ]G−I             | H  |           |       |           |
| ---                                                                              | ---        | ---      | ------------- | -----             | --- | ---       | ---   | --------- |
|                                                                                  |            | [ k      | k ] = K ˆ [ 0 | 1 ]               |     |           |       |           |
|                                                                                  |            |          |               |                  |    |           |       | ( 7.48 )  |
|                                                                                  |            | 2        | 1             | CG                | CH |           |       |           |
|                                                                                 |
| 7.19 Exercícios                                                                  |

1. Dados os seguintes sistemas, determine se eles são estáveis, controláveis e observáveis
   e obtenha uma função de transferência equivalente (ou, matriz de funções de
   transferência, se for o caso):
   |                       |      | 1 0  1   |          |     |     |     |     |     |
   | --------------------- | ----- | ------------ | -------- | --- | --- | --- | --- | --- |
   |                       | x& = | x+           | u        |     |     |     |     |     |
   |                       |       |           |         |     |     |     |     |     |
   |                       | a)   | 0 −2 1   |          |     |     |     |     |     |
   |                       |      | [ ]          |          |     |     |     |     |     |
   |                       | y =  | 1 1x         |          |     |     |     |     |     |
   |                       |      |  0 1       | 0      |     |     |     |     |     |
   |                       | x& = |   x+       |   u    |     |     |     |     |     |
   |                       | b)    | −2 −2      | 1      |     |     |     |     |     |
   |                      |
   |                      |
   |                       | y =  | [ 1 0 ] x    |          |     |     |     |     |     |
   | ---                   | ----- | ----------   | -----    | --- | --- | --- | --- | --- |
   |                       |      | 1 1 1    |          |     |     |     |     |     |
   |                       | x& = | x+           | u        |     |     |     |     |     |
   |                       |       |           |         |     |     |     |     |     |
   |                       | c)   | 0 −1 0   |          |     |     |     |     |     |
   |                       |      | [ ]          |          |     |     |     |     |     |
   |                       | y =  | 1 2 x        |          |     |     |     |     |     |
   |                       |      |  0 1       | 1      |     |     |     |     |     |
   |                       | x& = | x+           | u        |     |     |     |     |     |
   |                       |       |            |        |     |     |     |     |     |
   |                       | d)   | 2,1 −1,5   | 1      |     |     |     |     |     |
   |                      |
   |                       | y =  | [ 1 0 ] x    |          |     |     |     |     |     |
   | ---                   | ----- | ---------    | -------- | --- | --- | --- | --- | --- |
   |                       |      |  0 1        | 0  0  |     |     |     |     |     |
   |                       |      |             |       |     |     |     |     |     |
   |                       | x& = | 0 0          | 1 x+ 0 u |     |     |     |     |     |
   |                       | e)    |             |       |     |     |     |     |     |
   |                      |
   |                       |       | −6 −11 −6  | 1      |     |     |     |     |     |
   | ---                   | ----- | ------------ | -------  | --- | --- | --- | --- | --- |
   |                       |      |             |       |     |     |     |     |     |
   |                       |      | [ ]          |          |     |     |     |     |     |
   |                       | y =  | 4 5 1x       |          |     |     |     |     |     |
   |                       |      | −6 1 0     | 2      |     |     |     |     |     |
   |                       |      |            |        |     |     |     |     |     |
   |                       | x& = | −11 0 1      | x+ 6 u   |     |     |     |     |     |
   |                       |       |            |        |     |     |     |     |     |
   |                       | f)   |              |          |     |     |     |     |     |
   |                       |       | −6  0 0  | 2    |     |     |     |     |     |
   |                      |
   |                       |      | [ ]          |          |     |     |     |     |     |
   | --------------------- | ----  | ------       | ---      | --- | --- | --- | --- | --- |
   |                       | y =  | 1 0 0x       |          |     |     |     |     |     |
   | Sistemas de Controle  |       |              |          |     |     |     |     | 87  |

|         |       | −1 −2     | −2 2  |     |     |     |     |
| ------- | ------ | ---------- | -------- | --- | --- | --- | --- |
|         |       |           |       |     |     |     |     |
|         | x& =  | 0 −1       | 1 x+ 0 u |     |     |     |     |
|         |        |           |       |     |     |     |     |
|         | g)    |            |          |     |     |     |     |
|         |        |  1 0      | −1 1  |     |     |     |     |
|         |       |           |       |     |     |     |     |
|         |  y = | [ 1 1 0x ] |          |     |     |     |     |
|         |       | 2 0 0    | 0 1    |     |     |     |     |
|         |       |          |        |     |     |     |     |
|         | x& =   | 0 2 0 x+   | 1 0 u    |     |     |     |     |
|        |
|         |        |          |        |     |     |     |     |
| ---     | ---    | ---        | ---      | --- | --- | --- | --- |
|        |
|         | h)     |  0 3 1   |  0 1   |     |     |     |     |
| ---     | ---    | --------   | -------- | --- | --- | --- | --- |
|         |       |          |        |     |     |     |     |
|        |
| 1 0 0 |
|        |
|         | y =    | x          |          |     |     |     |     |
| ---     | ---    | ---        | ---      | --- | --- | --- | --- |
|       |
|         |       | 0 1 0    |          |     |     |     |     |
| ---     | ---    | -------    | ---      | --- | --- | --- | --- |
|        |

1. Considere a função de transferência obtida no item c da questão 1 (FT de ordem 2,
   sem cancelamento de pólos e zeros):
   a) Obtenha uma realização na forma canônica controlável;
   b) Verifique se este sistema é observável.

2. Considere a função de transferência obtida no item e da questão 1:
   a) Obtenha uma realização na forma canônica observável;
   b) Verifique se este sistema é controlável.

3. Para cada sistema, projete um observador de estados, uma realimentação de estados,
   um seguidor de referência para entrada do tipo degrau e um seguidor de referência
   para entrada do tipo rampa, usando os pólos fornecidos, respectivamente, para cada
   caso.
   Pólos desejados para o:
   Sistema
   |     |         |        |       | Observ. | Realim. | Seg.Deg.             | Seg.Ramp |
   | --- | ------- | ------ | ----- | ------- | ------- | -------------------- | -------- |
   |     |  1    | 0     | 1   |         |         |                      |          |
   |     | x& =  |  x+   |   u |         |         |                      |          |
   |     | a) 0   | −2    | 1   |         |         |                      |          |
   |     |        |        |       |         |         |                      |          |
   |    |
   |     | y = [  | 1 1x ] |       |         |         |                      |          |
   | --- | ------- | ------ | ----- | ---     | ---     | ---                  | ---      |
   |     |       | 0 1   | 0   |         |         |                      |          |
   |     | x& =   | x+     | u     |         |         |                      |          |
   |     |        |       |     |         |         |                      |          |
   |     | b) −2  | −2    | 1   |         |         |                      |          |
   |    |
   |     |  [     | ]      |       |         |         |                      |          |
   | --- | ----    | -----  | ---   | ---     | ---     | -------------------- | ---      |
   |     | y =    | 1 0 x  |       |         |         |                      |          |
   | 88  |         |        |       |         |         | Sistemas de Controle |          |

|                       |           | 0 1       | 1    |     |     |     |     |
| --------------------- | ---------- | ---------- | ------ | --- | --- | --- | --- |
|                      |
|                       | x& =      | x+         | u      |     |     |     |     |
| --------------------- | ---------- | ---------- | ------ | --- | --- | --- | --- |
|                       |           |           |      |     |     |     |     |
|                       | c)  2,1  | −1,5      | 1    |     |     |     |     |
|                       |  [        | ]          |        |     |     |     |     |
|                       | y =       | 1 0 x      |        |     |     |     |     |
|                       |  −6      | 1 0       | 2    |     |     |     |     |
|                       |          |           |      |     |     |     |     |
|                       | x& =      | −11 0 1 x+ | 6 u    |     |     |     |     |
|                       |           |           |      |     |     |     |     |
|                       | d)        |            |        |     |     |     |     |
|                       | −6        | 0 0       | 2    |     |     |     |     |
|                       |          |           |      |     |     |     |     |
|                       |  y = [   | 1 0 0x ]   |        |     |     |     |     |
|                       |  −1      | −2 −2     | 2    |     |     |     |     |
|                       |          |            |     |     |     |     |     |
|                       | x& =      | 0 −1 1     | x+ 0 u |     |     |     |     |
|                       | e)        |            |     |     |     |     |     |
|                       |           |            |        |     |     |     |     |
|                       |           | 1 0 −1    | 1    |     |     |     |     |
|                       |          |            |     |     |     |     |     |
|                       |  [        | ]          |        |     |     |     |     |
|                       | y =       | 1 1 0 x    |        |     |     |     |     |
| Sistemas de Controle  |            |            |        |     |     |     | 89  |

8 Introdução aos Sistemas de Controle Ótimo
O problema de controle, de uma forma geral, consiste em determinar uma lei de controle
que faça com que o sistema atenda a certas especificações de desempenho. No caso dos
sistemas de controle ótimo, a obtenção de uma lei de controle se dá pela minimização de um
funcional de custo.

|                                                                                 |     | J =  | f(x,u,t) |     |     |         |
| ------------------------------------------------------------------------------- | --- | ---- | -------- | --- | --- | ------- |
|                                                                                 |     |      |          |     |     | ( 8.1 ) |
| Estudaremos os sistemas de controle ótimo quadráticos, mais especificamente, os |
| reguladores lineares quadráticos (LQR – Linear Quadratic Regulator).            |
| 8.1 Controle Ótimo Quadrático                                                   |
| No caso do controle ótimo quadrático, temos um sistema dinâmico,                |
|                                                                                 |     | x& = | Ax+Bu    |     |     |         |
| ---                                                                             | --- | ---- | -----    | --- | --- | ---     |

|                                                                                             |     |                     |            |     |                      | ( 8.2 )  |
| ------------------------------------------------------------------------------------------- | --- | ------------------- | ---------- | --- | -------------------- | -------- |
| y =Cx                                                                                       |
| com a seguinte lei de controle:                                                             |
|                                                                                             |     | u                   | =Kx        |     |                      | ( 8.3 )  |
| ---                                                                                         | --- | ---                 | ----       | --- | ---                  | -------- |
| onde a matriz de ganhos K, será obtida a partir da minimização de um funcional de custo     |
| quadrático, do tipo:                                                                        |
| ∞                                                                                           |
|                                                                                             |     | J =                 | ∫L(x,u)dt  |     |                      | ( 8.4 )  |
| ---                                                                                         | --- | ---                 | ---------- | --- | ---                  | -------- |
| 0                                                                                           |
| Portanto, o projeto de reguladores ótimos baseados em índices de desempenho (funcional      |
| de custo) quadráticos consiste, simplesmente, na determinação dos elementos da matriz K.    |
| Uma forma típica para o funcional quadrático é:                                             |
| ∞                                                                                           |
|                                                                                             |     | J = ∫(xTQx+uTRu)dt  |            |     |                      | ( 8.5 )  |
| ---                                                                                         | --- | ------------------- | ---        | --- | ---                  | -------- |
| 0                                                                                           |
| onde: Q é uma matriz real simétrica positiva semi-definida; e R é uma matriz real simétrica |
| positiva definida.                                                                          |
| Existem várias maneiras de resolver o problema do LQR, a mais comumente usada é             |
| aquela que se baseia no segundo método de Liapunov. A maior vantagem da aplicação do        |
| método de Liapunov é que, exceto em casos muito especiais, a estabilidade fica garantida a  |
| priori, ou seja, garante-se encontrar uma matriz de ganhos K que resulte em autovalores     |
| estáveis de (A + BK).                                                                       |
| A solução do problema de otimização inicia-se pela substituição da lei de controle ( 8.3 )  |
| na equação de estados ( 8.2 );                                                              |
|                                                                                             |     |                     | (          | )   |                      |          |
| ---                                                                                         | --- | -----------         | ------     | --- | -------------------- | -------- |
|                                                                                             |     | x& = Ax+BKx         | = A+BK     | x   |                      | ( 8.6 )  |
| 90                                                                                          |     |                     |            |     | Sistemas de Controle |          |

e no funcional ( 8.4 ),

|                                                                                           |     |        | ∞                   |        |        |            |                | ∞ (                     | )   |           |
| ----------------------------------------------------------------------------------------- | --- | ------ | ------------------- | ------ | ------ | ---------- | -------------- | ----------------------- | --- | --------- |
|                                                                                           |     | J      | = ∫(xTQx+xTKTRKx)dt |        |        |            | =              | ∫xT Q+KTRK              | xdt |           |
|                                                                                           |     |        |                     |        |        |            |                |                         |     | ( 8.7 )   |
|                                                                                           |     |        | 0                   |        |        |            |                | 0                       |     |           |
| Para mostra que uma função de Liapunov pode, efetivamente, ser usada na solução deste     |
| problema, vamos, inicialmente, supor que:                                                 |
|                                                                                           |     |        |                     | (      |        | )          | d              | ( )                     |     |           |
| ---                                                                                       | --- | ---    | ---                 | ---    | ------ | ---        | ---            | ------                  | --- | ---       |
|                                                                                           |     |        |                     |        | Q+KTRK |            | = −            | xTPx                    |     |           |
| ( 8.8 )                                                                                   |
| dt                                                                                        |
| onde P é uma matriz real simétrica positivo definida.                                     |
| Expandindo a equação ( 8.8 ), temos:                                                      |
|                                                                                           |     |        |                     | (      |        | )          |                |                         |     |           |
| ---                                                                                       | --- | ---    | ---                 | ------ | ---    | ---        | -------------- | ---                     | --- | --------  |
|                                                                                           |     |        |                     | Q+KTRK |        | =          | −x& TPx−xTPx&  |                         |     | ( 8.9 )   |
| Substituindo ( 8.6 ) em ( 8.9 ), temos:                                                   |
|                                                                                           |     | (      |                     | )      |        |            |                |                         |     |           |
| ---                                                                                       | --- | ------ | ------              | ---    | ------ | ---------- | ---            | ------------            | --- | --------- |
|                                                                                           |     | Q+KTRK |                     |        | (      | )TxTPx−xTP |                | (                       | )   |           |
|                                                                                           |     |        |                     | =      | − A+BK |            |                | A+BK                    | x⇒  |           |
|                                                                                           |     |        |                     |        |        |            |                |                         |     |           |
|                                                                                           |     |        | (                   |        | )      | [          |                |                         | ]   | ( 8.10 )  |
|                                                                                           |     | ⇒      | Q+KTRK              |        | =      | −xT ( A+BK |                | )TP+P ( A+BK            | ) x |           |
| ( )                                                                                       |
| Pelo segundo método de Liapunov, sabemos que, para um dado Q+KTRK , se                    |
| (A+BK)                                                                                    |
| for estável, existe uma matriz P, tal que:                                                |
|                                                                                           |     |        | (                   |        | )TP+P  | (          | )              | (                       | )   |           |
| ---                                                                                       | --- | ---    | ----                | ---    | -----  | ----       | ---            | ----------              | --- | --------- |
|                                                                                           |     |        | A+BK                |        |        | A+BK       |                | = − Q+KTRK              |     | ( 8.11 )  |
| A equação ( 8.11 ) é conhecida como Equação Algébrica de Riccati (ARE - Algebraic         |
| Riccati Equation).                                                                        |
| O funcional de custo pode ser calculado como:                                             |
|                                                                                           |     | ∞ (    |                     |        | )      |            | ∞              |                         |     |           |
| ---                                                                                       | --- | ---    | ------              | ---    | -----  | -----      | ---            | ----------------------- | --- | --------- |
|                                                                                           | J = | ∫xT    | Q+KTRK              |        | xdt =  | −xTPx      | =              | −x(∞)TPx(∞)+x(0)TPx(0)  |     |           |
|                                                                                           |     |        |                     |        |        |            |                |                         |     | ( 8.12 )  |
| 0                                                                                         |
| 0                                                                                         |
| ( )                                                                                       |
| Como A+BK é assumida com sendo estável, temos que x(∞)→0; logo:                           |
| x(0)TPx(0)                                                                                |
|                                                                                           |     |        |                     |        | J      | =          |                |                         |     | ( 8.13 )  |
| ---                                                                                       | --- | ---    | ---                 | ---    | ---    | ---        | ---            | ---                     | --- | --------- |
| Assim, o funcional pode ser obtido em termos das condições iniciais x(0) e de P, que, por |
|                                                                                           |     |        |                     |        |        | (          |                | )                       |     |           |
| ------------------------------                                                            | --- | ---    | ---                 | ------ | ---    | ---------- | ---            | ---                     | --- | ---       |
| sua vez, está relacionada com                                                             |     |        |                     | ( A+BK | )      | e Q+KTRK   |                | .                       |     |           |
| Para obter a solução do problema de controle ótimo quadrático, seguem-se os seguintes     |
| passos. Inicialmente, como R é uma matriz real simétrica positivo definida, podemos       |
| escrever:                                                                                 |
|                                                                                           |     |        |                     |        |        | R =        | TTT            |                         |     | ( 8.14 )  |
| ---                                                                                       | --- | ---    | ---                 | ---    | ---    | ---        | ----           | ---                     | --- | --------- |
| onde T é uma matriz não singular.                                                         |
| Substituindo ( 8.14 ) em ( 8.11 ), temos:                                                 |
| Sistemas de Controle                                                                      |     |        |                     |        |        |            |                |                         |     | 91        |
| ---------------------                                                                     | --- | ---    | ---                 | ---    | ---    | ---        | ---            | ---                     | --- | ---       |

|                                                                                         | (   |       | )    |        |             |       |       |     |           |
| --------------------------------------------------------------------------------------- | --- | ----- | ---- | ------ | ----------- | ----- | ----- | --- | --------- |
|                                                                                         | AT  | +KTBT | P+P  | ( A+BK | ) +Q+KTTTTK |       | =     | 0   |           |
| ( 8.15 )                                                                                |
| Reescrevendo ( 8.15 ), podemos obter:                                                   |
|                                                                                         | [   |       |      | ] [    |             | ]     |       |     |           |
| ---                                                                                     | --- | ---   | ---  | ---    | -----       | ---   | ---   | --- | ---       |
|                                                                                         |     | (     | )−1  | T      | ( )−1       |       | (     | )−1 |           |
| ATP+PA+ TK + TT BTP TK + TT BTP −PB TTT BTP+Q =0 ( 8.16 )                               |
| A minimização do funcional J com relação a matriz de ganhos K, requer a minimização     |
| de:                                                                                     |
|                                                                                         |     | [     |      |        | ] [         |       | ]     |     |           |
| ---                                                                                     | --- | ----- | ---- | ---    | ----        | ----- | ----- | --- | --------- |
|                                                                                         |     |       | (    | )−1    | T           | ( )−1 |       |     |           |
|                                                                                         |     | xT TK | + TT | BTP    | TK +        | TT    | BTPx  |     | ( 8.17 )  |
| A expressão ( 8.17 ), por ser quadrática, é não negativa, logo seu mínimo ocorre quando |
| ela é nula, ou seja, quando:                                                            |
|                                                                                         |     | (     | )−1  |        |             | ( )−1 |       |     |           |
| ---                                                                                     | --- | ----  | ---  | ------ | ---         | ----- | ----  | --- | ---       |
|                                                                                         | TK  | + TT  | BTP  | = 0⇒TK | =           | − TT  | BTP⇒  |     |           |

|                                                                                             |     |                   |     |        | ( )−1    |     |     |     | ( 8.18 )  |
| ------------------------------------------------------------------------------------------- | --- | ----------------- | --- | ------ | -------- | --- | --- | --- | --------- |
|                                                                                             |     |                   | ⇒K  | = −T−1 | TT BTP   |     |     |     |           |
| ou simplesmente:                                                                            |
|                                                                                             |     |                   |     |        | −R−1BTP  |     |     |     |           |
| ---                                                                                         | --- | ---               | --- | ---    | -------- | --- | --- | --- | --------- |
|                                                                                             |     |                   |     | K =    |          |     |     |     | ( 8.19 )  |
| onde P deve satisfazer a equação ( 8.16 ) ou sua versão reduzida, conhecida como Equação de |
| Algébrica de Riccati de matriz reduzida.                                                    |
|                                                                                             |     | ATP+PA−PBR−1BTP+Q |     |        |          | =0  |     |     | ( 8.20 )  |
| ---                                                                                         | --- | ----------------- | --- | ---    | ---      | --- | --- | --- | --------- |
| Resumindo, dados uma sistema dinâmico na forma ( 8.2 ) e um funcional de custo              |
| quadrático na forma ( 8.5 ), o projeto de um regulador linear quadrático consiste,          |
| basicamente, de dois passos:                                                                |

1. Encontrar a solução P da Equação Algébrica de Riccati ( 8.20 ); e,
2. Usar esta solução para determinar a matriz de ganhos da realimentação K.

EXEMPLO:

|                                                                               |     |     |     | 0     | 1 0   |     |     |                      |     |
| ----------------------------------------------------------------------------- | --- | --- | --- | ------ | ------- | --- | --- | -------------------- | --- |
|                                                                              |
|                                                                               |     |     | x&  | =      | x+      | u   |     |                      |     |
| ---                                                                           | --- | --- | --- | ---    | -----   | --- | --- | ---                  | --- |
|                                                                               |     |     |     |       |      |     |     |                      |     |
| Considere o seguinte sistema; 0 −1 1 . Determine a matriz ótima de ganhos |
|                                                                               |     |     |     | [      | ]       |     |     |                      |     |
| ---                                                                           | --- | --- | --- | -----  | ---     | --- | --- | ---                  | --- |
|                                                                               |     |     | y   | = 1 0  | x       |     |     |                      |     |
| 1 0                                                                         |
| ∞                                                                             |
| da realimentação para o funcional; J                                          |     |     |     | = ∫(xT | x+u2)dt |     | .   |                      |     |
| ------------------------------------                                          | --- | --- | --- | ------ | ------- | --- | --- | ---                  | --- |
|                                                                               |     |     |     |        |       |     |     |                      |     |
| 0 1                                                                         |
| 0                                                                             |
| SOLUÇÃO:                                                                      |
| O primeiro passo é resolver a equação de Riccate e determinar a matriz P:     |
| 92                                                                            |     |     |     |        |         |     |     | Sistemas de Controle |     |
| ---                                                                           | --- | --- | --- | ---    | ---     | --- | --- | -------------------- | --- |

0 0 p p  p p 0 1  p p 0 p p  1 0 0 0
11 12 + 11 12 − 11 12 [ 1 ][ 0 1 ] 11 12 + =
              
1 −1 p p
 
p p 0 −1

p p 1

p p

0 1 0 0
12 22 12 22 12 22 12 22
 0 0  0 p − p   p2 p p  1 0 0 0
⇒
  +

11 12

− 12 12 22 +
 
=

 
 p − p p − p   0 p − p   p p p2  0 1 0 0
11 12 12 22 12 22 12 22 22
De onde obtemos o seguinte sistema de equações simultâneas:
− p2 +1=0
12

p − p − p p =0 2 1
 11 12 12 22 ;⇒P=  

p
11
− p
12
− p
12
p
22
=0 1 1
 p − p + p − p − p2 +1=0

12 22 12 22 22
O segundo, e último, passo consiste em utilizar a matriz P, determinada anteriormente,
para calcular a matriz ótima de ganhos da realimentação de estados K:
2 1
K = −R−1BTP = − [ 1 ][ 0 1 ] = − [ 1 1 ]
 
1 1
8.2 Controle Ótimo Quadrático Discreto
No caso do controle ótimo quadrático discreto, é possível mostrar que, considerando o
controle do processo para um tempo finito, a matriz de ganhos K varia ao longo do tempo,
permanecendo constante apenas nos instantes iniciais. Porém, se consideramos que o controle
do processo atuará indefinidamente, com o instante final, N, tendendo ao infinito, podemos
adotar uma solução sub-ótima, considerando o sistema em regime, onde a matriz de ganhos K
é constante.
Neste caso, para N = ∞, temos um sistema dinâmico dado por:
x(k +1) =Gx(k)+Hu(k); k = 0,1,2,...,N ( 8.21 )
com a seguinte lei de controle:
u(k) = Kx(k) ( 8.22 )
onde a matriz de ganhos K, será obtida a partir da minimização de um funcional de custo
quadrático, do tipo:
1 ∞ [ ]
J = ∑ xT(k)Qx(k)+uT(k)Ru(k) ( 8.23 )
2
k=0
onde: Q é uma matriz real simétrica positiva semi-definida; e R é uma matriz real simétrica
positiva definida.
Assim como no caso contínuo, a matriz de ganhos K é definida em função de uma matriz
real simétrica positivo definida P. Onde K é dada por:
Sistemas de Controle 93

|                                                                            |     |     |         |     | (          | )−1      |     |       |     |     |           |
| -------------------------------------------------------------------------- | --- | --- | ------- | --- | ---------- | -------- | --- | ----- | --- | --- | --------- |
|                                                                            |     |     |         | K   | = − R+HTPH | HTPG     |     |       |     |     | ( 8.24 )  |
| Sendo a matriz P a solução de uma equação de Riccati de regime permanente. |
|                                                                            |     |     | =Q+GTPG |     | −GTPH      | ( R+HTPH | )−1 | HTPG  |     |     |           |
| ---                                                                        | --- | --- | ------- | --- | -----      | -------- | --- | ----- | --- | --- | --------- |
|                                                                            |     |     | P       |     |            |          |     |       |     |     | ( 8.25 )  |

• Equação de Riccati de Regime Permanente
Uma forma de resolver a equação de Riccati de regime permanente é considerar o caso
transitório, onde:

|                                                                                           |     |     |                    |     |     | (         |     | )−1 |         |     |          |
| ----------------------------------------------------------------------------------------- | --- | --- | ------------------ | --- | --- | --------- | --- | --- | ------- | --- | -------- |
|                                                                                           | P(k | +1) | =Q+GTP(k)G−GTP(k)H |     |     | R+HTP(k)H |     |     | HTP(k)G |     | ( 8.26 ) |
| Partindo de uma solução inicial nula P(0) = 0, damos início a um processo iterativo que   |
| deverá convergir para uma matriz P constante. Quando os elementos de P não variarem       |
| significativamente (dentro de uma tolerância previamente estabelecida) tomaremos a última |
| matriz P calculada como sendo a solução da equação de Riccati de regime permanente e a    |
| usaremos para determinar a matriz de ganhos K.                                            |

EXEMPLO:

|                                                                                         |                         |     |          |       | 0,2        | 0           |      | 1      |                      |          |     |
| --------------------------------------------------------------------------------------- | ----------------------- | --- | -------- | ----- | ----------- | ----------- | ----- | -------- | -------------------- | -------- | --- |
| Considere o seguinte sistema; x(k +1) = x(k)+ u(k). Determine a matriz                  |
|                                                                                         |                         |     |          |       |            |             |      |        |                      |          |     |
| ---                                                                                     | ---                     | --- | ---      | ---   | ---         | ------      | ---   | ---      | ---                  | ---      | --- |
|                                                                                         |                         |     |          |       |             | 0 0,4      |       | 1      |                      |          |     |
|                                                                                        |
|                                                                                         |                         |     |          |       |             |             | 1    | 0        |                     |          |     |
| ---                                                                                     | ---                     | --- | ---      | ---   | ---         | ---         | ---   | ---      | ---                  | ---      | --- |
| Q =                                                                                     |
|                                                                                         |                         |     |          |       |             |             |      |          |                     |          |     |
| ------------------------------------------------                                        | ---                     | --- | ---      | ---   | ---         | ---         | ---   | ---      | ----------           | ---      | --- |
| ótima de ganhos da realimentação, considerando;                                         |                         |     |          |       |             |             |       |          | e R = 1.             |          |     |
|                                                                                         |                         |     |          |       |             |             |  0   | 0,5      |                     |          |     |
| SOLUÇÃO:                                                                                |
| O primeiro passo é resolver a equação de Riccate e determinar a matriz P. Sendo P(0)=0, |
| temos:                                                                                  |
|                                                                                         |                         |     |          |       | (           | )−1         |       |          | 1,0000              | 0,0000  |     |
| ---                                                                                     | ----------------------- | --- | ---      | ---   | ---------   | -------     | ---   | -------- | -------              | -------- | --- |
|                                                                                         | =Q+GTP(0)G−GTP(0)H      |     |          |       | R+HTP(0)H   | HTP(0)G     |       |          |                      |          |     |
|                                                                                         | P(1)                    |     |          |       |             |             |       | =Q       | =                   |          |    |
|                                                                                         |                         |     |          |       |             |             |       |          | 0,0000              | 0,5000  |     |
|                                                                                         |                         |     |          |       |             |             |       |          | 1,0240               | −0,0160 |     |
|                                                                                         |                         |     |          |       | (           | )−1         |       |         |                      |          |     |
|                                                                                         | P(2) =Q+GTP(1)G−GTP(1)H |     |          |       | R+HTP(1)H   | HTP(1)G     |       | =        |                      |          |     |
|                                                                                         |                         |     |          |       |             |             |       |         |                      |          |    |
|                                                                                         |                         |     |          |       |             |             |       | −0,0160 |                      | 0,5640   |     |
|                                                                                        |
|                                                                                         |                         |     |          |       |             |             |       |          |  1,0251             | −0,0186 |     |
| ---                                                                                     | ------------------      | --- | -------- | ----- | ----------- | ----------- | ----- | ---      | -------------------- | -------- | --- |
|                                                                                         | =Q+GTP(2)G−GTP(2)H      |     |          |       | ( R+HTP(2)H | )−1 HTP(2)G |       |          |                      |          |     |
|                                                                                         | P(3)                    |     |          |       |             |             |       | =        |                     |          |    |
|                                                                                         |                         |     |          |       |             |             |       |          | −0,0186             | 0,5714   |    |
|                                                                                         |  1,0252                |     | −0,0189 |       |  1,0252    | −0,0189    |       |          |  1,0252             | −0,0189 |     |
|                                                                                         | P(4) =                  |     |          | ;P(5) | =           |             | ;P(6) | =        |                      |          |     |
|                                                                                         |                        |     |          |      |            |             |      |          |                     |          |    |
|                                                                                         | −0,0189                |     | 0,5723   |       | −0,0189    | 0,5724      |       |          | −0,0189             | 0,5724   |     |
|                                                                                         |                         |     |          |      |             |             |      |          |                      |          |    |
| 94                                                                                      |                         |     |          |       |             |             |       |          | Sistemas de Controle |          |     |

10-4,
Considerando uma tolerância de atingimos uma solução satisfatória na sexta
iteração:
 1,0525 −0,0189

|                                                                                      | P=          |      |                    |     |     |
| ------------------------------------------------------------------------------------ | ------------ | ---- | ------------------- | --- | --- |
|                                                                                      | −0,0189     |      | 0,5724             |     |     |
| Em seguida, utilizamos a matriz P, determinada anteriormente, para calcular a matriz |
| ótima de ganhos da realimentação de estados K:                                       |
|                                                                                      | (            | )−1  |                     |     |     |
| ---                                                                                  | ------------ | ---- | ------------------- | --- | --- |
|                                                                                      | K = − R+HTPH | HTPG | = − [ 0,0786 0,0865 | ]   |     |

| Sistemas de Controle |     |     |     |     | 95  |
| -------------------- | --- | --- | --- | --- | --- |

Referências
Este texto destina-se a ser uma fonte de informações teórico-didáticas, facilmente
acessível, para alunos de disciplinas relacionadas ao tema de Sistemas de Controle. Desta
forma, este material não se propõe a substituir livros, também relacionados a este tema, tais
como:

1. DORF, R. C. e BISHOP, R. H. Modern Control Systems. Addison-Wesley, 1995.
2. K. OGATA. Engenharia de Controle Moderno - Segunda Edição. Prentice-Hall do Brasil, 1990.
3. B. C. KUO. Sistemas de Controle Automático. Prentice-Hall do Brasil, 1985.
4. G. F. FRANKLIN, J. D. POWELL e A. E. NAEINI. Feedback Control of Dynamic Systems. Addison-
   Wesley, 1986.
5. J. J. D'AZZO e C. H. HOUPIS. Análise e Projeto de Sistemas de Controle Lineares. Guanabara Dois, 1984.
6. ROHRS, C. E., MELSA, J. L. e SCHULTZ, D. G. Linear Control Systems. McGraw-Hill, 1993.
7. GOLTEN, J. e VERNER, A. Control System Design and Simulation. McGraw-Hill, 1991.
8. ASTROM, K e Wittenmark, B. Computer-Controlled Systems-Theory and Design. Prentice-Hall Internat.,
9.
10. K. OGATA. Dicrete-Time Control Systems. Prentice-Hall, 1987.
11. FRANKLIN, G. F. e POWELL, J. D. Digital Control of Dynamic Systems. Addison-Wesley Publ., 1980.
12. SMITH, C. L. Digital Computer Process Control. Intext Educational Publishers, 1972.
13. K. OGATA. Designing Linear Control Systems with MATLAB. Prentice-Hall, 1994.
14. Quanser, Inovation Educate. Manual Coupled Water Tank Experiments.
    Além disso, outras fontes bibliográficas muito úteis podem ser encontradas na Internet.
    Alguns exemplo são os diversos materiais que podem ser encontrados nas páginas eletrônicas
    de alguns professores do DCA:
15. Prof. Dr. Adelardo Adelino D. de Medeiros, <www.dca.ufrn.br/~adelardo/>, (17/11/2005).
16. Prof. Dr. André Laurindo Maitelli, <www.dca.ufrn.br/~maitelli/>, (17/11/2005)
    96 Sistemas de Controle
