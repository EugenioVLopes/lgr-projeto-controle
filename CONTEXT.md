# Controle — LGR

Aplicativo web para cálculo e visualização do Lugar Geométrico das Raízes da disciplina DCA-3701 (UFRN).

## Linguagem

**LGR**:
Lugar Geométrico das Raízes: conjunto dos pontos s do plano complexo que satisfazem 1+K·P(s)=0 para algum K>0.
_Avoid_: root locus em inglês no código e na interface

**Polo**:
Raiz do denominador D(s) da malha aberta; ponto de partida dos ramos (K=0).
_Avoid_: pole

**Zero**:
Raiz do numerador N(s) da malha aberta; ponto de chegada dos ramos (K→∞).
_Avoid_: zero em inglês está ok como código, mas prefira "zero" em textos

**Ramo**:
Trajetória contínua de uma raiz da equação característica quando K varia de 0 a ∞.
_Avoid_: branch

**Assíntota**:
Reta para onde tendem os ramos excedentes (np−nz); definida por centroide sigma_a e ângulos phi_a.
_Avoid_: asymptote

**Breakaway**:
Ponto real onde ramos deixam o eixo real (dK/ds=0, K>0); inclui break-in quando retornam.
_Avoid_: ponto de separação genérico sem K

**Cruzamento jw**:
Ponto onde o LGR cruza o eixo imaginário (s=jω), com ganho crítico K associado.
_Avoid_: crossover

**Ganho K**:
Ganho de malha aberta; parâmetro que percorre o LGR.
_Avoid_: k minúsculo, ganho crítico sem contexto
