# Landing page da barbearia — design técnico

**Data:** 2026-10-09  
**Status:** aguardando revisão do usuário

## Objetivo

Criar uma landing page estática e responsiva para uma barbearia, reproduzindo a composição aprovada no Figma para desktop e mobile. A página deve orientar visitantes para dois destinos: contato pelo WhatsApp e agendamento no AppBarber.

## Stack

- React 19 com TypeScript
- Vite
- Tailwind CSS
- ESLint para checagens estáticas

Não haverá backend, banco de dados, autenticação ou formulário nesta fase.

## Estrutura

O projeto terá componentes de apresentação por seção, mantendo cada parte da landing independente:

- `Header`: navegação e ação principal.
- `Hero`: apresentação e chamada inicial.
- `Servicos`: serviços e preços exibidos pelo layout.
- `Profissionais`: cards dos barbeiros.
- `Depoimentos`: prova social, se presente no frame de referência.
- `Footer`: dados finais e links de ação.

`App.tsx` apenas compõe as seções na ordem do Figma. Imagens e outros recursos estáticos ficam em `src/assets`; estilos globais, tipografia e tokens do layout ficam na camada do Tailwind.

## Links e configuração

`src/config/site.ts` reúne os valores que podem mudar sem tocar nos componentes:

- WhatsApp: `https://wa.me/5511940111517`.
- Agendamento: URL provisória do AppBarber, substituível posteriormente.

CTAs de contato usam o WhatsApp. CTAs de agendamento usam o endereço provisório do AppBarber. Ambos abrem em nova aba quando levarem a um serviço externo.

## Responsividade e acessibilidade

- O layout será mobile-first e corresponderá às referências desktop e mobile do Figma.
- Conteúdo textual usa hierarquia semântica; imagens informativas recebem texto alternativo.
- Links e botões têm rótulos claros e foco visível.
- Não haverá dependência de interação essencial para leitura do conteúdo.

## Dados e falhas

Os conteúdos são locais e estáticos. Não há chamadas de rede nem estados de carregamento/erro. Links externos usam URLs centralizadas; se uma URL provisória for alterada, a troca ocorre somente no arquivo de configuração.

## Validação

- Build de produção do Vite.
- Lint do projeto.
- Teste automatizado das funções puras de configuração quando elas forem adicionadas; componentes estritamente visuais serão validados por build e inspeção no navegador contra o Figma.

## Fora de escopo

- Reserva real pelo AppBarber.
- Formulário, CRM, analytics e pagamentos.
- Painel administrativo ou gestão de agenda.
