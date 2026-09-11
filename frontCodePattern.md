# FRONT CODE PATTERN
## Padrão obrigatório de desenvolvimento — Sistema de Gerenciamento de Caravanas

> **LEIA ESTE ARQUIVO INTEIRO ANTES DE CRIAR, EDITAR, EXCLUIR OU REESTRUTURAR QUALQUER CÓDIGO.**
>
> Este documento define o padrão obrigatório de HTML, CSS e JavaScript do projeto.
> A referência visual das telas e este padrão de código devem ser considerados juntos.
>
> **Tecnologias permitidas:** HTML5, CSS3 e JavaScript puro.
>
> **Proibido:** React, Vue, Angular, Next.js, TypeScript, Tailwind, Bootstrap ou qualquer framework Front-End que substitua a arquitetura definida aqui.

---

# 1. REGRA PRINCIPAL

Antes de editar o código:

1. Leia este arquivo.
2. Leia toda a estrutura atual do projeto.
3. Identifique os padrões já existentes.
4. Preserve o que já funciona.
5. Só depois implemente a alteração solicitada.

## Nunca faça:

- reescrever o projeto inteiro para implementar uma pequena funcionalidade;
- trocar a arquitetura sem necessidade;
- criar uma segunda arquitetura paralela;
- criar componentes duplicados quando já existir um equivalente;
- mudar cores, tipografia ou espaçamentos globalmente sem necessidade;
- remover funcionalidades existentes para simplificar o código;
- criar código apenas visual quando a funcionalidade puder ser implementada;
- alterar nomes de arquivos, classes ou funções existentes sem verificar suas dependências.

## Regra de preservação

Ao alterar uma tela:

> **Altere apenas o necessário para implementar a funcionalidade solicitada.**

Tudo que não estiver relacionado à tarefa deve permanecer funcionando.

---

# 2. PRINCÍPIOS DE ARQUITETURA

O projeto deve seguir estes princípios:

- separação de responsabilidades;
- reutilização;
- baixo acoplamento;
- código legível;
- funções pequenas;
- estado centralizado;
- dados separados da apresentação;
- manipulação do DOM organizada;
- componentes visuais reutilizáveis;
- preparação para futura integração com API.

A interface não deve conter regras de negócio complexas diretamente no HTML.

---

# 3. ESTRUTURA DE PASTAS

A estrutura definitiva deve respeitar a estrutura já existente no projeto.

Quando não existir uma estrutura definida, utilizar:

```text
/
├── index.html
│
├── pages/
│   ├── login.html
│   ├── dashboard.html
│   ├── caravanas.html
│   ├── caravana-detalhes.html
│   ├── caravana-form.html
│   ├── participantes.html
│   ├── participante-form.html
│   ├── associar-participante.html
│   ├── pesquisar-participante.html
│   └── lista-participantes.html
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── global.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── storage.js
│   ├── navigation.js
│   ├── utils.js
│   ├── validation.js
│   ├── caravanas.js
│   ├── participantes.js
│   └── associacoes.js
│
└── assets/
    ├── images/
    └── icons/
```

Se o projeto existente possuir outra organização, **não reorganizar automaticamente**.

---

# 4. HTML

## 4.1. HTML semântico

Priorizar elementos semânticos:

```html
<header></header>
<nav></nav>
<main></main>
<section></section>
<article></article>
<footer></footer>
<form></form>
<button></button>
```

Evitar criar toda a aplicação usando apenas `<div>`.

---

## 4.2. Estrutura base

Todas as páginas devem seguir o padrão:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Caravanas</title>

    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/components.css">
    <link rel="stylesheet" href="../css/responsive.css">
</head>

<body>
    <main id="app">
        <!-- conteúdo -->
    </main>

    <script src="../js/app.js"></script>
</body>
</html>
```

Os caminhos devem ser adaptados à localização real do arquivo.

---

# 5. IDs E CLASSES

## IDs

Usar `id` para:

- elementos únicos;
- containers principais;
- elementos que realmente precisem ser acessados individualmente pelo JavaScript.

Exemplo:

```html
<main id="app"></main>
```

Não usar IDs repetidos.

---

## Classes

Usar classes para:

- estilos;
- componentes;
- elementos repetitivos;
- estados visuais.

Exemplo:

```html
<div class="caravana-card"></div>
```

---

# 6. NOMENCLATURA

Utilizar nomes descritivos e consistentes.

## HTML/CSS

Preferir:

```text
caravana-card
participante-card
form-field
form-label
form-input
btn-primary
btn-secondary
btn-danger
status-badge
bottom-navigation
page-header
```

Não usar:

```text
box1
div2
azul
coisa
teste
x
item-final-novo
```

---

## JavaScript

Usar `camelCase`:

```javascript
renderCaravanas();
getParticipantes();
createCaravana();
updateParticipante();
deleteParticipante();
searchParticipantes();
```

---

## Constantes

Usar `UPPER_SNAKE_CASE` apenas para constantes realmente globais:

```javascript
const STORAGE_KEYS = {
    CARAVANAS: 'caravanas',
    PARTICIPANTES: 'participantes',
    ASSOCIACOES: 'associacoes'
};
```

---

# 7. CSS

## 7.1. Variáveis

Todas as cores, espaçamentos e valores globais importantes devem ficar centralizados.

Exemplo:

```css
:root {
    --color-primary: #2457d6;
    --color-primary-dark: #1743ad;

    --color-success: #1e9b50;
    --color-danger: #e53935;
    --color-warning: #f59e0b;
    --color-info: #3b82f6;

    --color-background: #f8f9fc;
    --color-surface: #ffffff;

    --color-text: #1f2937;
    --color-text-secondary: #6b7280;

    --color-border: #e5e7eb;

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 6px 18px rgba(0, 0, 0, 0.08);
}
```

> Os valores acima são referência. Caso o projeto já possua valores definidos, preservar os valores existentes.

---

# 8. CORES

A identidade visual deve permanecer próxima das referências das telas:

- azul como cor principal;
- branco como superfície;
- cinza claro como fundo e borda;
- verde para ações positivas;
- vermelho para ações destrutivas;
- amarelo/laranja somente quando houver necessidade de aviso.

Nunca criar uma nova paleta para uma tela individual.

Exemplo correto:

```css
.btn-primary {
    background: var(--color-primary);
}
```

Exemplo incorreto:

```css
.nova-tela .btn {
    background: #8734aa;
}
```

---

# 9. TIPOGRAFIA

A tipografia deve ser consistente em todo o projeto.

Centralizar definições globais.

Exemplo:

```css
body {
    font-family: Arial, Helvetica, sans-serif;
    color: var(--color-text);
}
```

Se já existir uma fonte definida no projeto:

> **NÃO substituir.**

Manter a mesma hierarquia:

```text
Título da página
↓
Título de seção
↓
Texto principal
↓
Texto secundário
↓
Legenda
```

---

# 10. RESET CSS

Utilizar um reset simples:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
}
```

Não adicionar regras globais excessivas.

---

# 11. RESPONSIVIDADE

Mobile-first.

Exemplo:

```css
.container {
    width: min(100%, 1200px);
    margin: 0 auto;
    padding: 16px;
}
```

Breakpoints de referência:

```css
@media (min-width: 768px) {
    /* tablet */
}

@media (min-width: 1024px) {
    /* desktop */
}
```

Adaptar ao projeto existente quando ele já possuir breakpoints definidos.

---

# 12. LAYOUT

Preferir:

```css
display: flex;
display: grid;
gap:
```

Evitar posicionamento absoluto para estruturar toda a página.

`position: absolute` deve ser usado apenas quando fizer sentido visualmente, por exemplo:

- ícone dentro de input;
- badge;
- elemento sobreposto;
- botão flutuante.

---

# 13. BOTÕES

Criar classes reutilizáveis.

Exemplo:

```html
<button class="btn btn-primary">
    Salvar
</button>
```

```css
.btn {
    min-height: 44px;
    padding: 10px 18px;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-primary {
    background: var(--color-primary);
    color: #fff;
}

.btn-success {
    background: var(--color-success);
    color: #fff;
}

.btn-danger {
    background: var(--color-danger);
    color: #fff;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

Não criar 20 classes diferentes para botões visualmente iguais.

---

# 14. FORMULÁRIOS

Estrutura padrão:

```html
<div class="form-field">
    <label class="form-label" for="nome">
        Nome completo
    </label>

    <input
        id="nome"
        name="nome"
        class="form-input"
        type="text"
        placeholder="Digite o nome completo"
    >

    <span class="form-error" id="nomeError"></span>
</div>
```

Todos os inputs devem possuir:

- label;
- `name`;
- tipo correto;
- placeholder quando fizer sentido;
- estado de erro;
- foco visível.

---

# 15. VALIDAÇÃO

Não utilizar apenas validação visual.

Criar funções reutilizáveis:

```javascript
function validateRequired(value) {
    return String(value).trim().length > 0;
}

function validateCpf(cpf) {
    // validação
}

function validatePhone(phone) {
    // validação
}
```

Mostrar o erro próximo ao campo correspondente.

---

# 16. MÁSCARAS

Aplicar máscaras de forma centralizada.

Exemplo:

```javascript
function formatCpf(value) {
    // 000.000.000-00
}

function formatPhone(value) {
    // (00) 00000-0000
}

function formatDate(value) {
    // dd/mm/aaaa
}
```

Não duplicar lógica de máscara em várias páginas.

---

# 17. COMPONENTES

Componentes visuais recorrentes devem seguir o mesmo padrão.

Componentes principais:

```text
Page Header
Bottom Navigation
Card
Button
Input
Search
Badge
Avatar
Modal
Toast
Empty State
Loading
```

---

# 18. HEADER

Todas as telas que possuírem header devem manter:

- altura consistente;
- alinhamento consistente;
- ícones com tamanho semelhante;
- título alinhado;
- botão de voltar padronizado.

Exemplo:

```html
<header class="page-header">
    <button class="icon-button" aria-label="Voltar">
        ←
    </button>

    <h1 class="page-title">Caravanas</h1>

    <button class="icon-button" aria-label="Adicionar">
        +
    </button>
</header>
```

---

# 19. BOTTOM NAVIGATION

No mobile, a navegação inferior deve ser padronizada:

```text
Início
Caravanas
Participantes
Mais
```

Não duplicar estilos entre páginas.

O item ativo deve possuir estado visual claro.

Exemplo:

```html
<a class="bottom-nav-item active">
    <span class="bottom-nav-icon"></span>
    <span class="bottom-nav-label">Início</span>
</a>
```

---

# 20. CARDS

Cards devem ter:

- fundo branco;
- borda suave;
- raio consistente;
- sombra discreta;
- espaçamento interno consistente.

Exemplo:

```css
.card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}
```

---

# 21. STATUS

Utilizar badges para estados:

```text
Pago
Pendente
Ativo
Inativo
```

Exemplo:

```html
<span class="status-badge status-paid">
    Pago
</span>
```

Não usar somente texto vermelho/verde sem estrutura visual.

---

# 22. MODAIS

Modal padrão:

```text
Overlay
    ↓
Modal
    ↓
Título
Descrição
Ações
```

Exemplo:

```html
<div class="modal-overlay" hidden>
    <div class="modal" role="dialog" aria-modal="true">
        <h2>Excluir participante?</h2>

        <p>
            Esta ação não poderá ser desfeita.
        </p>

        <div class="modal-actions">
            <button class="btn btn-secondary">
                Cancelar
            </button>

            <button class="btn btn-danger">
                Excluir
            </button>
        </div>
    </div>
</div>
```

---

# 23. TOASTS

Mensagens rápidas de:

- sucesso;
- erro;
- aviso;
- informação.

Criar uma função reutilizável:

```javascript
showToast(message, type);
```

Exemplo:

```javascript
showToast('Caravana criada com sucesso.', 'success');
```

---

# 24. JAVASCRIPT — SEPARAÇÃO DE RESPONSABILIDADES

Evitar um arquivo JavaScript gigantesco.

Separar:

```text
state.js
→ estado global

storage.js
→ localStorage

navigation.js
→ navegação

validation.js
→ validação

caravanas.js
→ regras de caravanas

participantes.js
→ regras de participantes

associacoes.js
→ relação participante/caravana

utils.js
→ funções auxiliares

app.js
→ inicialização
```

---

# 25. ESTADO CENTRAL

O estado deve possuir uma estrutura clara.

Exemplo:

```javascript
const state = {
    caravanas: [],
    participantes: [],
    associacoes: [],
    usuario: null
};
```

Não criar cópias diferentes dos mesmos dados em várias páginas.

---

# 26. STORAGE

Todas as operações de localStorage devem passar por `storage.js`.

Exemplo:

```javascript
const STORAGE_KEYS = {
    CARAVANAS: 'caravanas',
    PARTICIPANTES: 'participantes',
    ASSOCIACOES: 'associacoes',
    USER: 'user'
};

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, fallback = []) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : fallback;
}
```

Não espalhar chamadas diretas de `localStorage` pelo projeto.

---

# 27. MODELO DE DADOS

## Caravana

```javascript
{
    id: 'caravana-001',
    origem: 'Joinville',
    destino: 'São Paulo',
    data: '2026-06-22',
    horario: '06:00',
    responsavel: 'Ir. João Silva'
}
```

## Participante

```javascript
{
    id: 'participante-001',
    nome: 'Miguel Lorenzo Lima',
    nascimento: '2000-01-01',
    cpf: '123.456.789-00',
    orgaoEmissor: 'SSP/SC',
    telefone: '(47) 99999-9999'
}
```

## Associação

```javascript
{
    id: 'associacao-001',
    caravanaId: 'caravana-001',
    participanteId: 'participante-001',
    pagamento: 'pago'
}
```

---

# 28. REGRA IMPORTANTE DE PAGAMENTO

O pagamento pertence à associação.

Errado:

```javascript
participante.pagamento = 'pago';
```

Correto:

```javascript
associacao.pagamento = 'pago';
```

Isso permite que um participante esteja:

```text
Caravana A → Pago
Caravana B → Pendente
Caravana C → Pago
```

---

# 29. FUNÇÕES CRUD

Caravanas:

```javascript
getCaravanas()
getCaravanaById(id)
createCaravana(data)
updateCaravana(id, data)
deleteCaravana(id)
```

Participantes:

```javascript
getParticipantes()
getParticipanteById(id)
createParticipante(data)
updateParticipante(id, data)
deleteParticipante(id)
```

Associações:

```javascript
getAssociacoes()
getAssociacoesByCaravana(caravanaId)
createAssociacao(data)
deleteAssociacao(id)
updatePagamento(id, status)
```

---

# 30. RENDERIZAÇÃO

A renderização deve ocorrer por funções específicas.

Exemplo:

```javascript
function renderCaravanas(caravanas) {
    // renderização
}

function renderParticipantes(participantes) {
    // renderização
}

function renderDetalhesCaravana(caravanaId) {
    // renderização
}
```

Evitar colocar toda a lógica de renderização dentro de listeners.

---

# 31. EVENT LISTENERS

Preferir:

```javascript
button.addEventListener('click', handleSave);
```

Evitar:

```html
<button onclick="save()">Salvar</button>
```

O JavaScript deve controlar os eventos.

---

# 32. DATA ATTRIBUTES

Utilizar `data-*` para identificar entidades.

Exemplo:

```html
<button
    class="btn-edit"
    data-participante-id="participante-001">
    Editar
</button>
```

JavaScript:

```javascript
const participanteId = button.dataset.participanteId;
```

---

# 33. NAVEGAÇÃO

Centralizar a navegação.

Exemplo:

```javascript
navigateTo('caravanas.html');
navigateTo('participantes.html');
navigateTo('caravana-detalhes.html', {
    id: caravanaId
});
```

Não espalhar lógica de navegação de forma inconsistente.

---

# 34. QUERY STRING

Quando necessário, utilizar parâmetros:

```text
caravana-detalhes.html?id=caravana-001
```

No JavaScript:

```javascript
const params = new URLSearchParams(window.location.search);
const caravanaId = params.get('id');
```

---

# 35. PESQUISA

A pesquisa deve reutilizar funções.

Exemplo:

```javascript
function searchParticipantes(participantes, term) {
    const normalizedTerm = term
        .toLowerCase()
        .trim();

    return participantes.filter((participante) => {
        return (
            participante.nome.toLowerCase().includes(normalizedTerm) ||
            participante.cpf.includes(normalizedTerm)
        );
    });
}
```

Não implementar uma pesquisa completamente diferente em cada página.

---

# 36. FILTROS

Filtros devem ser independentes da renderização.

Exemplo:

```javascript
function filterByPayment(associacoes, status) {
    if (status === 'todos') {
        return associacoes;
    }

    return associacoes.filter(
        (item) => item.pagamento === status
    );
}
```

---

# 37. ESTADOS VAZIOS

Toda lista deve possuir empty state.

Exemplo:

```text
Nenhuma caravana encontrada.
```

ou:

```text
Nenhum participante encontrado.
```

Não deixar apenas uma tela branca.

---

# 38. ESTADOS DE ERRO

Erros devem ser:

- claros;
- próximos do problema;
- fáceis de compreender.

Exemplo:

```text
Informe o nome completo.
```

Não usar mensagens técnicas como:

```text
Error: undefined at line 93
```

---

# 39. ACESSIBILIDADE

Todo:

- botão deve possuir texto ou `aria-label`;
- input deve possuir label;
- modal deve possuir `role="dialog"`;
- elementos interativos devem ter foco visível.

Exemplo:

```css
button:focus-visible,
input:focus-visible,
select:focus-visible {
    outline: 3px solid rgba(36, 87, 214, 0.25);
    outline-offset: 2px;
}
```

---

# 40. ÍCONES

Os ícones devem ser consistentes.

Preferência:

1. conjunto de ícones já utilizado pelo projeto;
2. SVG;
3. biblioteca existente no projeto;
4. somente depois considerar outra solução.

Não misturar vários estilos de ícones.

Evitar emojis como ícones principais da interface.

---

# 41. SVG

Quando utilizar SVG:

- manter acessível;
- definir tamanho via CSS;
- utilizar `aria-hidden="true"` quando for apenas decorativo.

Exemplo:

```html
<svg
    class="icon"
    aria-hidden="true"
    viewBox="0 0 24 24">
</svg>
```

---

# 42. ANIMAÇÕES

Animações devem ser discretas.

Exemplo:

```css
.card {
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-2px);
}
```

Nunca criar animações que dificultem o uso.

Respeitar:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms;
        animation-iteration-count: 1;
        transition-duration: 0.01ms;
        scroll-behavior: auto;
    }
}
```

---

# 43. FORMATAÇÃO

JavaScript:

```javascript
function createCaravana(data) {
    const caravana = {
        id: generateId(),
        ...data
    };

    state.caravanas.push(caravana);

    saveState();

    return caravana;
}
```

Preferir:

- indentação consistente;
- linhas legíveis;
- funções pequenas;
- espaços adequados;
- nomes claros.

---

# 44. COMENTÁRIOS

Comentar somente quando necessário.

Bom:

```javascript
// O pagamento pertence à associação,
// não ao participante global.
```

Ruim:

```javascript
// Cria uma variável chamada caravana
const caravana = {};
```

O código deve ser autoexplicativo.

---

# 45. EVITAR

Não utilizar:

```javascript
var
```

Preferir:

```javascript
const
let
```

Evitar:

```javascript
eval()
```

Evitar manipulação desnecessária com:

```javascript
innerHTML
```

Quando for suficiente:

```javascript
textContent
```

Usar `innerHTML` somente quando houver necessidade clara de criar uma estrutura HTML controlada pelo próprio código.

---

# 46. GERENCIAMENTO DE ERROS

Operações importantes devem tratar erros.

Exemplo:

```javascript
try {
    saveData(STORAGE_KEYS.CARAVANAS, state.caravanas);
} catch (error) {
    console.error('Erro ao salvar caravanas:', error);

    showToast(
        'Não foi possível salvar os dados.',
        'error'
    );
}
```

Não esconder erros silenciosamente.

---

# 47. IDs

Os IDs das entidades devem ser únicos.

Pode utilizar:

```javascript
crypto.randomUUID()
```

quando disponível.

Exemplo:

```javascript
function generateId() {
    return crypto.randomUUID();
}
```

---

# 48. MOCK DATA

Os dados mockados devem existir em uma estrutura centralizada.

Não espalhar participantes fictícios diretamente nos HTMLs.

Exemplo:

```javascript
const initialData = {
    caravanas: [],
    participantes: [],
    associacoes: []
};
```

Ao iniciar:

```javascript
function initializeData() {
    const caravanas = loadData(
        STORAGE_KEYS.CARAVANAS,
        initialData.caravanas
    );

    state.caravanas = caravanas;
}
```

---

# 49. INICIALIZAÇÃO

`app.js` deve possuir uma rotina de inicialização.

Exemplo:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadState();
    initializePage();
    initializeEvents();
}
```

Não executar código complexo antes do DOM existir.

---

# 50. RESPONSABILIDADE DOS ARQUIVOS

## `app.js`

Responsável por:

- inicialização;
- identificação da página;
- chamadas iniciais.

## `state.js`

Responsável por:

- estado da aplicação.

## `storage.js`

Responsável por:

- salvar;
- carregar;
- remover dados persistidos.

## `navigation.js`

Responsável por:

- navegação.

## `validation.js`

Responsável por:

- regras de validação.

## `utils.js`

Responsável por:

- funções auxiliares genéricas.

## `caravanas.js`

Responsável por:

- regras relacionadas às caravanas.

## `participantes.js`

Responsável por:

- regras relacionadas aos participantes.

## `associacoes.js`

Responsável por:

- relação entre participantes e caravanas.

---

# 51. REGRA DE NÃO DUPLICAÇÃO

Antes de criar uma função:

> Procure se ela já existe.

Antes de criar uma classe CSS:

> Procure se existe uma classe equivalente.

Antes de criar um componente:

> Procure se o projeto já possui esse componente.

Não criar:

```text
.btn-save
.btn-salvar
.button-save
.save-button
```

quando todos representam a mesma coisa.

---

# 52. REGRA DE ALTERAÇÃO

Quando uma tarefa solicitar:

> "Adicionar botão X"

Não faça:

- remodelar a página;
- trocar toda a paleta;
- alterar todas as fontes;
- reorganizar componentes não relacionados;
- reescrever o JavaScript inteiro.

Faça apenas:

- adicionar o botão;
- implementar seu comportamento;
- adicionar os estilos necessários;
- integrar ao padrão existente.

---

# 53. REGRA DE COMPATIBILIDADE

Qualquer alteração deve preservar:

- funcionalidades existentes;
- rotas;
- dados;
- classes utilizadas pelo JavaScript;
- IDs utilizados pelo JavaScript;
- comportamento de outros módulos.

Antes de renomear qualquer elemento:

> procure todas as referências no projeto.

---

# 54. REGRA DE UI/UX

A interface deve seguir as referências visuais do projeto.

Características:

- limpa;
- moderna;
- profissional;
- simples;
- com bastante espaço;
- cards arredondados;
- azul como destaque;
- estados bem identificados;
- navegação intuitiva.

Não adicionar elementos decorativos sem finalidade.

---

# 55. REGRA DE DESKTOP E MOBILE

Mobile-first.

No mobile:

- cards ocupam praticamente toda a largura disponível;
- navegação inferior aparece;
- formulários são verticais;
- botões possuem área de toque adequada.

No desktop:

- conteúdo centralizado;
- largura máxima;
- grids quando apropriados;
- melhor aproveitamento do espaço;
- navegação adaptada sem quebrar a experiência.

---

# 56. REGRAS DE NEGÓCIO DO PROJETO

## Caravanas

Uma caravana possui:

```text
id
origem
destino
data
horario
responsavel
```

## Participantes

Um participante possui:

```text
id
nome
nascimento
cpf
orgaoEmissor
telefone
```

## Associação

Uma associação possui:

```text
id
caravanaId
participanteId
pagamento
```

---

# 57. ASSOCIAÇÃO

Antes de associar:

```javascript
function isParticipantAlreadyAssociated(
    caravanaId,
    participanteId
) {
    return state.associacoes.some(
        (associacao) =>
            associacao.caravanaId === caravanaId &&
            associacao.participanteId === participanteId
    );
}
```

Nunca permitir associação duplicada.

---

# 58. EXCLUSÃO

Toda exclusão deve:

1. pedir confirmação;
2. remover o item correto;
3. atualizar associações quando necessário;
4. persistir o estado;
5. atualizar a interface;
6. informar o usuário.

Exemplo:

```text
Tem certeza que deseja excluir este participante?

Cancelar
Excluir
```

---

# 59. PAGAMENTO

Status aceitos:

```text
pago
pendente
```

Exibição:

```text
Pago
Pendente
```

O valor interno pode ser técnico, mas a interface deve apresentar texto amigável.

---

# 60. CONTAGEM

Nunca armazenar quantidades que podem ser calculadas, quando não for necessário.

Exemplo:

```javascript
const participantesDaCaravana =
    getAssociacoesByCaravana(caravanaId);

const total = participantesDaCaravana.length;
```

Assim a quantidade permanece sincronizada.

---

# 61. LISTA DE PARTICIPANTES

A tela de lista deve derivar os dados da associação real.

Fluxo:

```text
Caravana
↓
Buscar associações
↓
Buscar participantes
↓
Montar lista
↓
Renderizar
```

Não criar uma segunda lista independente.

---

# 62. PESQUISA POR CPF

A busca deve considerar CPF formatado e não formatado quando apropriado.

Exemplo:

```text
12345678900
```

e:

```text
123.456.789-00
```

devem encontrar o mesmo participante.

Criar função:

```javascript
function normalizeCpf(cpf) {
    return cpf.replace(/\D/g, '');
}
```

---

# 63. NORMALIZAÇÃO

Para pesquisas textuais:

```javascript
function normalizeText(value) {
    return String(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}
```

Assim:

```text
João
```

pode ser encontrado por:

```text
joao
```

---

# 64. RESPONSIVIDADE DE TABELAS

No mobile, não forçar tabelas largas.

Converter informações para:

- cards;
- listas;
- blocos empilhados.

A experiência mobile deve continuar confortável.

---

# 65. PERFORMANCE

Evitar:

- múltiplos listeners iguais;
- renderizações completas sem necessidade;
- loops duplicados;
- consultas repetidas ao localStorage;
- manipulação excessiva do DOM.

Sempre que possível:

```text
alterar estado
↓
salvar estado
↓
renderizar somente a região necessária
```

---

# 66. ACESSIBILIDADE DE INTERAÇÃO

Áreas clicáveis devem ser confortáveis.

Botões de ícone devem possuir:

```html
aria-label="Adicionar caravana"
```

ou equivalente.

Não depender exclusivamente de `title`.

---

# 67. TESTES MANUAIS OBRIGATÓRIOS

Depois de qualquer alteração relevante, testar:

### Navegação

```text
Login → Dashboard
Dashboard → Caravanas
Dashboard → Participantes
Caravanas → Detalhes
Detalhes → Lista
```

### Caravanas

```text
Criar
Pesquisar
Abrir detalhes
Editar, se disponível
Excluir, se disponível
```

### Participantes

```text
Criar
Editar
Excluir
Pesquisar
Filtrar
```

### Associação

```text
Associar
Remover
Impedir duplicidade
Atualizar contagem
```

### Persistência

```text
Salvar
Atualizar navegador
Confirmar manutenção dos dados
```

---

# 68. TESTES DE RESPONSIVIDADE

Testar pelo menos:

```text
360px
390px
768px
1024px
1280px
1440px
```

Verificar:

- overflow horizontal;
- textos cortados;
- botões quebrados;
- cards deformados;
- inputs ultrapassando a tela;
- navegação quebrada.

---

# 69. TESTE DE CONSOLE

Antes de considerar uma tarefa concluída:

> Não devem existir erros JavaScript no console relacionados à implementação.

Corrigir:

- `undefined`;
- referências inexistentes;
- listeners quebrados;
- imports inexistentes;
- elementos não encontrados;
- erros de sintaxe.

Warnings legítimos podem permanecer quando não forem causados pela aplicação.

---

# 70. CHECKLIST ANTES DO COMMIT

Verificar:

```text
[ ] Li este Front Code Pattern
[ ] Mantive a arquitetura existente
[ ] Não dupliquei componentes
[ ] Não dupliquei CSS
[ ] Não quebrei funcionalidades existentes
[ ] Validações funcionam
[ ] Navegação funciona
[ ] Persistência funciona
[ ] Mobile funciona
[ ] Desktop funciona
[ ] Não existem erros no console
[ ] Visual continua consistente
```

---

# 71. REGRA ABSOLUTA PARA OUTRAS IAS

Quando outra IA receber este arquivo:

> **ELA DEVE LER ESTE DOCUMENTO ANTES DE EDITAR O CÓDIGO.**

A IA deverá primeiro:

```text
1. Ler Front Code Pattern
2. Ler os arquivos existentes
3. Entender a arquitetura
4. Identificar componentes reutilizáveis
5. Identificar dependências
6. Planejar a alteração
7. Alterar apenas o necessário
8. Testar
9. Revisar visualmente
```

Não começar alterando arquivos imediatamente.

---

# 72. PRIORIDADE DAS REGRAS

Quando houver dúvida, utilizar esta ordem de prioridade:

```text
1. Código existente que já funciona
2. Front Code Pattern
3. Regras de negócio
4. Referências visuais
5. Boas práticas de HTML/CSS/JS
6. Decisões próprias da IA
```

Nunca inverter essa ordem sem justificativa.

---

# 73. REGRA FINAL

O objetivo não é apenas criar código que funcione.

O objetivo é criar código que:

- seja consistente;
- seja reutilizável;
- seja fácil de entender;
- seja fácil de manter;
- não quebre o que já existe;
- mantenha o padrão visual;
- esteja preparado para receber um backend futuramente.

**ANTES DE QUALQUER EDIÇÃO, LEIA ESTE ARQUIVO.**

**ANTES DE QUALQUER ALTERAÇÃO VISUAL, ANALISE AS TELAS DE REFERÊNCIA.**

**ANTES DE CRIAR NOVO CÓDIGO, PROCURE SE JÁ EXISTE UMA IMPLEMENTAÇÃO REUTILIZÁVEL.**
