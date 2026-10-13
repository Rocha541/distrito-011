# Estrutura de conversão para agendamento — Distrito 011

**Data:** 2026-10-13  
**Status:** aguardando confirmação da restrição de implementação

## Objetivo

Reorganizar a landing page para priorizar o primeiro agendamento avulso. A página deve diminuir a insegurança de quem ainda não conhece a Distrito 011, comprovar a qualidade do atendimento e só então apresentar o Distrito Club como opção de manutenção.

## Decisão de conversão

- Conversão prioritária: agendamento avulso pelo AppBarber.
- Conversão de apoio: contato pelo WhatsApp para dúvidas.
- Conversão secundária: interesse no Distrito Club após entender o primeiro atendimento.

Os CTAs existentes permanecem exatamente como estão. O novo bloco de conversão terá **“Agendar meu horário”** como seu único CTA; WhatsApp continuará apenas nos pontos em que já existe ou dentro de uma nova seção quando for necessário para suporte.

## Restrição de preservação

As seções que já existem não serão redesenhadas nem editadas nesta etapa. A implementação pode apenas mudar a posição delas na página.

Isso preserva integralmente, nas seções existentes:

- textos e conteúdo;
- imagens e seus recortes;
- botões, rótulos e destinos;
- cores, tipografia, espaçamentos, estilos e animações/movimentos;
- estrutura interna e comportamento atual.

Somente seções novas podem receber conteúdo e design novos. Elas serão construídas como blocos isolados para ajustes posteriores do usuário.

## Arquitetura da página

### 1. Hero — desejo e ação

- Permanece inalterado; apenas ocupa a primeira posição.

### 2. Estilos pensados para você — repertório

- Permanece inalterado; apenas é reposicionado depois do Hero.

### 3. Ambiente — experiência e tranquilidade

Nesta etapa, a seção atual de ambiente é apenas reposicionada; seu conteúdo e estilo não mudam. Em uma fase futura, ela poderá evoluir para uma seção de experiência organizada em quatro momentos:

1. Conversa inicial para entender a intenção e a rotina do cliente.
2. Orientação de estilo para escolher a melhor solução.
3. Execução cuidadosa do corte, barba ou acabamento.
4. Finalização e orientação para manter o visual em casa.

O ambiente deve apoiar visualmente essa história, e não ser o único assunto da seção.

### 4. Serviços — clareza de escolha

- Mantém Corte Masculino, Barba Completa, Acabamento e Consultoria de Estilo.
- Nesta etapa, seu conteúdo, aparência, CTA e estrutura interna permanecem inalterados.

### 5. Quem já passou por aqui — prova social

Nova seção com três a seis depoimentos autênticos, idealmente incluindo nome abreviado, avaliação e, quando houver autorização, foto de resultado.

O conteúdo deve responder a três objeções: qualidade do corte, qualidade do atendimento e segurança para experimentar a barbearia pela primeira vez.

### 6. Bloco de conversão — agendamento

- Título sugerido: **Pronto para mudar o visual?**
- Texto curto: reforça a facilidade de escolher um horário.
- CTA único e destacado: **Agendar meu horário**.
- O bloco não apresenta o Clube nem links concorrentes.

### 7. Distrito Club — manutenção e recorrência

- Mantém a oferta mensal atual, sem alterações internas.
- Apenas muda de posição: depois do novo bloco de conversão e antes do FAQ.

### 8. FAQ e footer — remoção final de dúvidas

FAQ deve responder, no mínimo:

- Como agendar e remarcar um horário?
- Onde fica a Distrito 011?
- Quais são as formas de pagamento?
- Quanto tempo dura cada serviço?
- Preciso saber qual corte quero antes de agendar?
- Como funciona o Distrito Club?

O footer concentra endereço, horário de atendimento, links de contato e redes sociais.

## Conteúdo necessário antes da implementação

- Avaliações reais de clientes, com autorização de uso.
- Confirmação sobre preços e durações que possam ser publicados.
- Endereço, horário, pagamentos e política de remarcação/cancelamento para o FAQ.
- Fotos de resultados ou profissionais, se a seção de prova social usar imagem.

## Fora de escopo

- Alteração de agenda, pagamentos ou integração com AppBarber.
- Criação de avaliações fictícias.
- Alteração da identidade visual sem uma solicitação específica.
- Qualquer edição nas seções existentes além de reordená-las.
