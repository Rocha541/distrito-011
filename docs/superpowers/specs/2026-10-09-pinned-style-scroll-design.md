# Efeito de rolagem fixada da seção de estilos

## Objetivo

Transformar a segunda seção da landing page em uma composição de rolagem fixada. O fundo verde, o título “Estilo pensado para você”, o texto e o botão permanecem visualmente imóveis enquanto as três imagens de cortes sobem por cima desse conteúdo. Ao término do percurso, a seção é liberada e a página continua normalmente.

## Comportamento aprovado

- Duração equilibrada: o trecho fixado ocupa aproximadamente 150% da altura visível da tela.
- A fixação começa quando a seção verde alcança o topo da janela.
- O conteúdo textual e o fundo verde permanecem fixos durante todo o trecho.
- As três imagens começam abaixo da área principal e sobem juntas, mantendo suas três colunas.
- No final do percurso, as imagens atravessam visualmente a seção e a próxima seção volta a rolar normalmente.
- A animação responde diretamente ao scroll, com `scrub`, sem reprodução automática independente da posição da página.

## Interação dos cards

- O hover não altera tamanho, posição ou escala dos cards.
- O hover e o clique apenas escurecem a imagem e revelam o título e a descrição.
- A entrada do texto pode usar uma pequena translação vertical interna, sem movimentar o card.

## Implementação

- Usar `gsap`, `@gsap/react` e o plugin `ScrollTrigger` do GSAP.
- Registrar `useGSAP` e `ScrollTrigger` uma única vez no módulo.
- Criar uma referência React para a seção e limitar todos os seletores ao seu escopo.
- Construir uma timeline com `pin: true`, `scrub: true` e distância de rolagem equivalente a cerca de `150vh`.
- Animar somente o contêiner das imagens no eixo vertical.
- Usar `useGSAP` para que timelines, estilos inline e ScrollTriggers sejam revertidos quando o componente desmontar.

## Responsividade e acessibilidade

- Em telas desktop e notebook, aplicar o efeito completo de pin e subida das imagens.
- Em telas menores, reduzir a distância do percurso para evitar uma seção excessivamente longa, preservando a leitura e o toque nos cards.
- Respeitar `prefers-reduced-motion`: nesse caso, desativar pin e scrub e apresentar as imagens na posição final, sem movimento vinculado à rolagem.
- Manter os controles acessíveis por teclado e os estados atuais de foco.

## Verificação

- Conferir o comportamento nas larguras de notebook, desktop e celular.
- Confirmar que a seção permanece fixada durante aproximadamente 1,5 tela.
- Confirmar que apenas as imagens se movem durante o scroll.
- Confirmar que hover e clique não movem nem ampliam os cards.
- Executar testes, lint e build de produção.
