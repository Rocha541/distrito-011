# Correção da seção de equipe em scroll

## Objetivo

Fazer a seção de equipe apresentar um profissional por etapa de scroll no desktop, com a introdução à esquerda fixada por GSAP e o perfil ativo ocupando todo o painel direito. Corrigir o alinhamento lateral para acompanhar o container da landing page, evitando a coluna direita comprimida e centralizada.

## Layout desktop

- A seção usa um container com largura máxima e gutters laterais consistentes com as seções existentes.
- A coluna de introdução fica à esquerda, com largura estável e botões em uma única linha.
- A coluna de perfis fica à direita, larga o suficiente para a foto e a descrição.
- Cada artigo de profissional recebe ao menos uma altura de viewport; o perfil seguinte só começa depois do bloco anterior.
- O painel de introdução é pinado com ScrollTrigger apenas acima de 900px e quando redução de movimento não está ativa.

## Layout mobile e acessibilidade

- A partir de 900px ou menos, o conteúdo volta a uma coluna vertical, sem pin.
- Com `prefers-reduced-motion: reduce`, o pin não é criado.
- Os nomes, imagens e links continuam semânticos e navegáveis.

## Verificação

- Teste de renderização cobre os dois perfis, imagens e CTAs.
- Revisão no navegador confirma que Guilherme e Matheus aparecem em etapas separadas no desktop e que a visualização móvel não fica presa.
