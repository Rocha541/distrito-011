# Seção interativa de equipe — Distrito 011

**Data:** 2026-10-13  
**Status:** aguardando revisão do usuário

## Objetivo

Adicionar uma seção de equipe entre Ambiente e Serviços, fiel ao frame Figma `38:529`. Ela deve apresentar a experiência da equipe e manter o painel de texto e CTAs à esquerda fixo no desktop enquanto os perfis de Guilherme Ribeiro e Matheus Costa avançam à direita com o scroll.

## Estrutura visual

### Painel esquerdo

- Título: **Seu estilo nas mãos de quem entende**.
- Texto introdutório do Figma.
- CTAs existentes da marca: **Chamar no WhatsApp** e **Agende seu corte**, com os destinos já centralizados em `siteConfig`.
- No desktop, o painel é fixado temporariamente durante a passagem pelos perfis.

### Painel direito

Dois perfis, na ordem do Figma:

1. **Guilherme Ribeiro** — foto, título profissional e biografia fornecidos no frame.
2. **Matheus Costa** — foto, título profissional e biografia fornecidos no frame.

Cada perfil preserva a composição do Figma: imagem com bordas arredondadas, nome em destaque e descrição logo abaixo.

## Interação

- Usar `GSAP` e `ScrollTrigger`, já adotados no projeto.
- Em viewports desktop, o painel esquerdo recebe `pin` enquanto a coluna direita percorre os perfis.
- A entrada de cada perfil pode usar uma transição discreta de opacidade e deslocamento vertical; a leitura e o scroll normal não dependem da animação.
- Com `prefers-reduced-motion: reduce`, nenhuma animação ou pin é aplicado; os dois lados permanecem legíveis no fluxo normal.
- Em mobile, o pin e animações de scroll são desativados. A seção se torna uma única coluna: apresentação, CTAs, Guilherme e Matheus.

## Assets

- Baixar exclusivamente os dois retratos retornados pelo contexto Figma para `src/assets/figma/`.
- Usar os arquivos locais; não manter URLs temporárias do Figma no código.
- Não alterar ou substituir assets já usados por seções existentes.

## Integração e preservação

- Criar um componente isolado `TeamSection` e estilos somente sob sua própria namespace CSS.
- Inserir a seção depois de Ambiente e antes de Serviços.
- Não editar o conteúdo, imagens, classes, estilos, CTAs ou movimentos das seções existentes.

## Validação

- Teste de renderização dos dois nomes, das duas descrições e dos CTAs.
- Teste de comportamento reduzido deve confirmar a ausência de pin quando a preferência de movimento reduzido estiver ativa, se a integração puder ser observada sem testar a implementação do GSAP.
- Executar testes, lint e build.
- Inspecionar a seção em desktop e mobile, confirmando que o painel fixa apenas no desktop e que os assets locais correspondem aos do Figma.

## Fora de escopo

- Alterar estilos, conteúdo, imagens, CTAs ou animações das seções já existentes.
- Criar mais perfis além de Guilherme Ribeiro e Matheus Costa.
- Inventar depoimentos, informações operacionais ou conteúdo de equipe.
