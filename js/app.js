// Inicialização global: guarda de login + despacho por data-page.
document.addEventListener('DOMContentLoaded', function () {
    initializeData();
    loadState();
    guardAuth();
    initializePage();
});

function guardAuth() {
    var page = document.body.getAttribute('data-page');
    var publicPages = ['login'];
    if (publicPages.indexOf(page) !== -1) {
        if (state.usuario) { window.location.href = 'dashboard.html'; }
        return;
    }
    if (document.body.hasAttribute('data-public-root')) { return; }
    if (!state.usuario) {
        var inPages = window.location.pathname.indexOf('/pages/') !== -1;
        window.location.href = inPages ? 'login.html' : 'pages/login.html';
    }
}

function initializePage() {
    var page = document.body.getAttribute('data-page');
    var initializers = {
        login: initLogin,
        dashboard: initDashboard,
        caravanas: initCaravanas,
        'caravana-form': initCaravanaForm,
        'caravana-detalhes': initCaravanaDetalhes,
        participantes: initParticipantes,
        'participante-form': initParticipanteForm,
        associar: initAssociar,
        pesquisar: initPesquisar,
        lista: initLista
    };
    if (page && initializers[page]) {
        try {
            initializers[page]();
        } catch (error) {
            console.error('Erro ao inicializar página ' + page + ':', error);
        }
    }
    initBottomNav();
    initLogoutButtons();
}

function initBottomNav() {
    var buttons = document.querySelectorAll('[data-nav]');
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            navigateTo(btn.getAttribute('data-nav'));
        });
    });
}

function initLogoutButtons() {
    document.querySelectorAll('[data-logout]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            confirmDialog({
                title: 'Sair do sistema?',
                description: 'Você precisará entrar novamente.',
                confirmLabel: 'Sair',
                onResult: function (ok) {
                    if (ok) {
                        state.usuario = null;
                        removeData(STORAGE_KEYS.USER);
                        window.location.href = 'login.html';
                    }
                }
            });
        });
    });
}

/* ---------- LOGIN ---------- */
function initLogin() {
    var form = document.getElementById('loginForm');
    if (!form) { return; }
    var userInput = document.getElementById('usuario');
    var passInput = document.getElementById('senha');
    var toggle = document.getElementById('toggleSenha');
    if (toggle && passInput) {
        toggle.addEventListener('click', function () {
            var show = passInput.type === 'password';
            passInput.type = show ? 'text' : 'password';
            toggle.innerHTML = iconSvg(show ? 'eye-slash' : 'eye');
            toggle.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
        });
    }
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var usuario = userInput.value.trim();
        var senha = passInput.value;
        var ok = true;
        ok = setFieldError(userInput, document.getElementById('usuarioError'), usuario ? '' : 'Informe o usuário.') && ok;
        ok = setFieldError(passInput, document.getElementById('senhaError'), senha ? '' : 'Informe a senha.') && ok;
        if (!ok) { return; }
        state.usuario = { nome: usuario, loginEm: new Date().toISOString() };
        saveData(STORAGE_KEYS.USER, state.usuario);
        showToast('Bem-vindo, ' + usuario + '!', 'success');
        setTimeout(function () { window.location.href = 'dashboard.html'; }, 400);
    });
}

/* ---------- DASHBOARD ---------- */
function initDashboard() {
    var greeting = document.getElementById('greeting');
    if (greeting && state.usuario) { greeting.textContent = 'Olá, ' + state.usuario.nome + '! O que deseja fazer hoje?'; }
    var shortcuts = document.querySelectorAll('[data-shortcut]');
    shortcuts.forEach(function (el) {
        el.addEventListener('click', function () { navigateTo(el.getAttribute('data-shortcut')); });
    });
    renderProximasCaravanas();
}

function renderProximasCaravanas() {
    var list = document.getElementById('proximasCaravanas');
    if (!list) { return; }
    list.innerHTML = '';
    var items = getCaravanas().slice(0, 4);
    if (items.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'Não há caravanas cadastradas.';
        list.appendChild(empty);
        return;
    }
    items.forEach(function (c) {
        list.appendChild(buildCaravanaCard(c));
    });
}

function buildCaravanaCard(c) {
    var article = document.createElement('article');
    article.className = 'card card--clickable caravana-card';
    article.setAttribute('data-caravana-id', c.id);
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'link');
    article.setAttribute('aria-label', c.origem + ' para ' + c.destino);

    var body = document.createElement('div');
    body.className = 'caravana-card-body';
    var route = document.createElement('p');
    route.className = 'caravana-card-route';
    route.textContent = c.origem + ' → ' + c.destino;
    var meta = document.createElement('p');
    meta.className = 'caravana-card-meta';
    meta.textContent = formatDateBR(c.data) + ' • ' + c.horario + ' • Resp.: ' + c.responsavel;
    body.appendChild(route);
    body.appendChild(meta);

    var arrow = document.createElement('span');
    arrow.className = 'caravana-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = iconSvg('caret-right');

    article.appendChild(body);
    article.appendChild(arrow);

    function open() { navigateTo('caravana-detalhes.html', { id: c.id }); }
    article.addEventListener('click', open);
    article.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    return article;
}

/* ---------- CARAVANAS ---------- */
function initCaravanas() {
    var search = document.getElementById('searchCaravanas');
    var addBtn = document.getElementById('addCaravana');
    var backBtn = document.getElementById('backBtn');
    if (addBtn) { addBtn.addEventListener('click', function () { navigateTo('caravana-form.html'); }); }
    if (backBtn) { backBtn.addEventListener('click', function () { navigateTo('dashboard.html'); }); }
    if (search) {
        search.addEventListener('input', function () { renderCaravanas(searchCaravanas(search.value)); });
    }
    renderCaravanas(getCaravanas());
}

function renderCaravanas(caravanas) {
    var list = document.getElementById('caravanaList');
    if (!list) { return; }
    list.innerHTML = '';
    if (caravanas.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'Nenhuma caravana encontrada.';
        list.appendChild(empty);
        return;
    }
    caravanas.forEach(function (c) { list.appendChild(buildCaravanaCard(c)); });
}

function initCaravanaForm() {
    var form = document.getElementById('caravanaForm');
    if (!form) { return; }
    var id = getQueryParam('id');
    var editing = id ? getCaravanaById(id) : null;
    var title = document.getElementById('formTitle');
    if (editing && title) { title.textContent = 'Editar Caravana'; }
    if (editing) {
        document.getElementById('origem').value = editing.origem;
        document.getElementById('destino').value = editing.destino;
        document.getElementById('data').value = editing.data;
        document.getElementById('horario').value = editing.horario;
        document.getElementById('responsavel').value = editing.responsavel;
    }
    document.getElementById('cancelCaravana').addEventListener('click', function () { goBack('caravanas.html'); });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = {
            origem: document.getElementById('origem').value,
            destino: document.getElementById('destino').value,
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value,
            responsavel: document.getElementById('responsavel').value
        };
        var errors = validateCaravanaForm(data);
        var valid = true;
        valid = setFieldError(document.getElementById('origem'), document.getElementById('origemError'), errors.origem) && valid;
        valid = setFieldError(document.getElementById('destino'), document.getElementById('destinoError'), errors.destino) && valid;
        valid = setFieldError(document.getElementById('data'), document.getElementById('dataError'), errors.data) && valid;
        valid = setFieldError(document.getElementById('horario'), document.getElementById('horarioError'), errors.horario) && valid;
        valid = setFieldError(document.getElementById('responsavel'), document.getElementById('responsavelError'), errors.responsavel) && valid;
        if (!valid) { return; }
        var result = editing ? updateCaravana(editing.id, data) : createCaravana(data);
        if (result.errors) { showToast('Verifique os campos destacados.', 'error'); return; }
        showToast(editing ? 'Caravana atualizada.' : 'Caravana criada com sucesso.', 'success');
        setTimeout(function () {
            navigateTo('caravana-detalhes.html', { id: result.caravana.id });
        }, 400);
    });
}

/* ---------- DETALHES ---------- */
function initCaravanaDetalhes() {
    var id = getQueryParam('id');
    var caravana = id ? getCaravanaById(id) : null;
    if (!caravana) {
        showToast('Caravana não encontrada.', 'error');
        navigateTo('caravanas.html');
        return;
    }
    document.getElementById('detailRoute').textContent = caravana.origem + ' → ' + caravana.destino;
    document.getElementById('detailMeta').textContent = formatDateBR(caravana.data) + ' • ' + caravana.horario;
    document.getElementById('detailResp').textContent = 'Responsável: ' + caravana.responsavel;
    document.getElementById('backBtn').addEventListener('click', function () { navigateTo('caravanas.html'); });
    document.getElementById('menuBtn').addEventListener('click', function () {
        confirmDialog({
            title: 'Excluir caravana?',
            description: caravana.origem + ' → ' + caravana.destino + ' será removida com suas associações.',
            confirmLabel: 'Excluir',
            onResult: function (ok) {
                if (ok) {
                    deleteCaravana(caravana.id);
                    showToast('Caravana excluída.', 'success');
                    setTimeout(function () { navigateTo('caravanas.html'); }, 400);
                }
            }
        });
    });
    document.getElementById('editCaravana').addEventListener('click', function () {
        navigateTo('caravana-form.html', { id: caravana.id });
    });

    var tabPart = document.getElementById('tabParticipantes');
    var tabInfo = document.getElementById('tabInformacoes');
    var panelPart = document.getElementById('panelParticipantes');
    var panelInfo = document.getElementById('panelInformacoes');
    tabPart.addEventListener('click', function () {
        tabPart.classList.add('is-active'); tabInfo.classList.remove('is-active');
        panelPart.hidden = false; panelInfo.hidden = true;
    });
    tabInfo.addEventListener('click', function () {
        tabInfo.classList.add('is-active'); tabPart.classList.remove('is-active');
        panelInfo.hidden = false; panelPart.hidden = true;
    });
    document.getElementById('infoOrigem').textContent = caravana.origem;
    document.getElementById('infoDestino').textContent = caravana.destino;
    document.getElementById('infoData').textContent = formatDateBR(caravana.data);
    document.getElementById('infoHorario').textContent = caravana.horario;
    document.getElementById('infoResp').textContent = caravana.responsavel;

    renderDetalheParticipantes(caravana.id);
    var search = document.getElementById('searchDetalhe');
    if (search) {
        search.addEventListener('input', function () { renderDetalheParticipantes(caravana.id, search.value); });
    }
    document.getElementById('assocBtn').addEventListener('click', function () {
        navigateTo('associar-participante.html', { caravanaId: caravana.id });
    });
    document.getElementById('listaBtn').addEventListener('click', function () {
        navigateTo('lista-participantes.html', { id: caravana.id });
    });
}

function renderDetalheParticipantes(caravanaId, term) {
    var wrap = document.getElementById('detalheList');
    var count = document.getElementById('partCount');
    if (!wrap) { return; }
    var items = getParticipantesDaCaravana(caravanaId);
    if (term) {
        var n = normalizeText(term);
        var d = normalizeCpf(term);
        items = items.filter(function (it) {
            return normalizeText(it.participante.nome).indexOf(n) !== -1 ||
                (d && normalizeCpf(it.participante.cpf).indexOf(d) !== -1);
        });
    }
    if (count) { count.textContent = 'Participantes (' + getResumoCaravana(caravanaId).total + ')'; }
    wrap.innerHTML = '';
    if (items.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'Nenhum participante associado ainda.';
        wrap.appendChild(empty);
        return;
    }
    items.forEach(function (it) {
        var card = document.createElement('div');
        card.className = 'card participante-card';
        var avatar = document.createElement('span');
        avatar.className = 'avatar';
        avatar.textContent = getInitials(it.participante.nome);
        var info = document.createElement('div');
        info.className = 'participante-card-info';
        var name = document.createElement('p');
        name.className = 'participante-card-name';
        name.textContent = it.participante.nome;
        var cpf = document.createElement('p');
        cpf.className = 'participante-card-cpf';
        cpf.textContent = 'CPF: ' + it.participante.cpf;
        info.appendChild(name); info.appendChild(cpf);
        var badge = document.createElement('span');
        badge.className = 'status-badge ' + (it.associacao.pagamento === 'pago' ? 'status-paid' : 'status-pending');
        badge.textContent = it.associacao.pagamento === 'pago' ? 'Pago' : 'Pendente';
        card.appendChild(avatar); card.appendChild(info); card.appendChild(badge);
        wrap.appendChild(card);
    });
}

/* ---------- PARTICIPANTES ---------- */
var currentPaymentFilter = 'todos';
var currentCaravanaFilter = '';

function initParticipantes() {
    var search = document.getElementById('searchParticipantes');
    var addBtn = document.getElementById('addParticipante');
    var menuBtn = document.getElementById('menuBtn');
    var select = document.getElementById('caravanaFilter');
    if (addBtn) { addBtn.addEventListener('click', function () { navigateTo('participante-form.html'); }); }
    if (menuBtn) { menuBtn.addEventListener('click', function () { navigateTo('dashboard.html'); }); }
    if (select) {
        getCaravanas().forEach(function (c) {
            var opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.origem + ' → ' + c.destino + ' (' + formatDateBR(c.data) + ')';
            select.appendChild(opt);
        });
        var preset = getQueryParam('caravanaId');
        currentCaravanaFilter = preset || (getCaravanas()[0] ? getCaravanas()[0].id : '');
        select.value = currentCaravanaFilter;
        select.addEventListener('change', function () {
            currentCaravanaFilter = select.value;
            renderParticipantes();
        });
    }
    document.querySelectorAll('[data-filter]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');
            currentPaymentFilter = btn.getAttribute('data-filter');
            renderParticipantes();
        });
    });
    if (search) { search.addEventListener('input', renderParticipantes); }
    renderParticipantes();
}

function renderParticipantes() {
    var list = document.getElementById('participanteList');
    if (!list) { return; }
    var term = document.getElementById('searchParticipantes') ? document.getElementById('searchParticipantes').value : '';
    var base = term ? searchParticipantes(term) : getParticipantes();
    // Aplica filtro de pagamento conforme caravana selecionada.
    var filtered = base.map(function (p) {
        var assoc = state.associacoes.find(function (a) {
            return a.participanteId === p.id && (!currentCaravanaFilter || a.caravanaId === currentCaravanaFilter);
        }) || null;
        return { participante: p, associacao: assoc };
    });
    if (currentPaymentFilter === 'pagos') { filtered = filtered.filter(function (i) { return i.associacao && i.associacao.pagamento === 'pago'; }); }
    if (currentPaymentFilter === 'pendentes') { filtered = filtered.filter(function (i) { return i.associacao && i.associacao.pagamento === 'pendente'; }); }

    list.innerHTML = '';
    if (filtered.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'Nenhum participante encontrado.';
        list.appendChild(empty);
        return;
    }
    filtered.forEach(function (item) {
        var p = item.participante;
        var card = document.createElement('div');
        card.className = 'card participante-card';
        card.setAttribute('data-participante-id', p.id);
        var avatar = document.createElement('span');
        avatar.className = 'avatar';
        avatar.textContent = getInitials(p.nome);
        var info = document.createElement('div');
        info.className = 'participante-card-info';
        var name = document.createElement('p');
        name.className = 'participante-card-name';
        name.textContent = p.nome;
        var cpf = document.createElement('p');
        cpf.className = 'participante-card-cpf';
        cpf.textContent = 'CPF: ' + p.cpf;
        info.appendChild(name); info.appendChild(cpf);
        var badge = document.createElement('span');
        if (item.associacao) {
            badge.className = 'status-badge ' + (item.associacao.pagamento === 'pago' ? 'status-paid' : 'status-pending');
            badge.textContent = item.associacao.pagamento === 'pago' ? 'Pago' : 'Pendente';
        } else {
            badge.className = 'status-badge status-pending';
            badge.textContent = 'Sem vínculo';
        }
        var actions = document.createElement('div');
        actions.className = 'row-actions';
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn--icon';
        editBtn.innerHTML = iconSvg('pencil-simple');
        editBtn.setAttribute('aria-label', 'Editar ' + p.nome);
        editBtn.addEventListener('click', function () { navigateTo('participante-form.html', { id: p.id }); });
        var delBtn = document.createElement('button');
        delBtn.className = 'btn btn--icon btn--icon-danger';
        delBtn.innerHTML = iconSvg('trash');
        delBtn.setAttribute('aria-label', 'Excluir ' + p.nome);
        delBtn.addEventListener('click', function () {
            confirmDialog({
                title: 'Excluir participante?',
                description: 'Tem certeza que deseja excluir ' + p.nome + '? Esta ação não poderá ser desfeita.',
                confirmLabel: 'Excluir',
                onResult: function (ok) {
                    if (ok) {
                        deleteParticipante(p.id);
                        showToast('Participante excluído.', 'success');
                        renderParticipantes();
                    }
                }
            });
        });
        actions.appendChild(editBtn); actions.appendChild(delBtn);
        card.appendChild(avatar); card.appendChild(info); card.appendChild(badge); card.appendChild(actions);
        // Toggle de pagamento quando há vínculo na caravana filtrada.
        if (item.associacao) {
            badge.style.cursor = 'pointer';
            badge.title = 'Clique para alternar pagamento';
            badge.addEventListener('click', function () {
                var next = item.associacao.pagamento === 'pago' ? 'pendente' : 'pago';
                updatePagamento(item.associacao.id, next);
                renderParticipantes();
            });
        }
        list.appendChild(card);
    });
}

function initParticipanteForm() {
    var form = document.getElementById('participanteForm');
    if (!form) { return; }
    var id = getQueryParam('id');
    var editing = id ? getParticipanteById(id) : null;
    var title = document.getElementById('formTitle');
    if (editing && title) { title.textContent = 'Editar Participante'; }
    var cpfInput = document.getElementById('cpf');
    var telInput = document.getElementById('telefone');
    applyCpfMask(cpfInput);
    applyPhoneMask(telInput);
    if (editing) {
        document.getElementById('nome').value = editing.nome;
        document.getElementById('nascimento').value = editing.nascimento;
        cpfInput.value = editing.cpf;
        document.getElementById('orgaoEmissor').value = editing.orgaoEmissor;
        telInput.value = editing.telefone;
    }
    document.getElementById('cancelParticipante').addEventListener('click', function () { goBack('participantes.html'); });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = {
            nome: document.getElementById('nome').value,
            nascimento: document.getElementById('nascimento').value,
            cpf: cpfInput.value,
            orgaoEmissor: document.getElementById('orgaoEmissor').value,
            telefone: telInput.value
        };
        var errors = validateParticipanteForm(data);
        var valid = true;
        valid = setFieldError(document.getElementById('nome'), document.getElementById('nomeError'), errors.nome) && valid;
        valid = setFieldError(document.getElementById('nascimento'), document.getElementById('nascimentoError'), errors.nascimento) && valid;
        valid = setFieldError(cpfInput, document.getElementById('cpfError'), errors.cpf) && valid;
        valid = setFieldError(document.getElementById('orgaoEmissor'), document.getElementById('orgaoError'), errors.orgaoEmissor) && valid;
        valid = setFieldError(telInput, document.getElementById('telefoneError'), errors.telefone) && valid;
        if (!valid) { return; }
        var result = editing ? updateParticipante(editing.id, data) : createParticipante(data);
        if (result.errors) { showToast('Verifique os campos destacados.', 'error'); return; }
        showToast(editing ? 'Participante atualizado.' : 'Participante cadastrado.', 'success');
        setTimeout(function () { navigateTo('participantes.html'); }, 400);
    });
}

/* ---------- ASSOCIAR ---------- */
function initAssociar() {
    var caravanaSelect = document.getElementById('caravanaSelect');
    var search = document.getElementById('searchDisponiveis');
    var list = document.getElementById('disponiveisList');
    var added = document.getElementById('adicionadosList');
    var count = document.getElementById('addedCount');
    var saveBtn = document.getElementById('saveAssoc');
    var cancelBtn = document.getElementById('cancelAssoc');
    if (!caravanaSelect || !list) { return; }

    getCaravanas().forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.origem + ' → ' + c.destino + ' (' + formatDateBR(c.data) + ')';
        caravanaSelect.appendChild(opt);
    });
    var preset = getQueryParam('caravanaId');
    if (preset && getCaravanaById(preset)) { caravanaSelect.value = preset; }

    var staging = [];

    function refresh() {
        var caravanaId = caravanaSelect.value;
        var term = search ? search.value : '';
        var pool = term ? searchParticipantes(term) : getParticipantes();
        list.innerHTML = '';
        var avail = pool.filter(function (p) {
            return !isParticipantAlreadyAssociated(caravanaId, p.id) &&
                !staging.some(function (s) { return s.participanteId === p.id; });
        });
        if (avail.length === 0) {
            var empty = document.createElement('p');
            empty.className = 'empty-state';
            empty.textContent = 'Nenhum participante disponível.';
            list.appendChild(empty);
        }
        avail.slice(0, 20).forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'card participante-card';
            var avatar = document.createElement('span');
            avatar.className = 'avatar';
            avatar.textContent = getInitials(p.nome);
            var info = document.createElement('div');
            info.className = 'participante-card-info';
            var name = document.createElement('p');
            name.className = 'participante-card-name';
            name.textContent = p.nome;
            var cpf = document.createElement('p');
            cpf.className = 'participante-card-cpf';
            cpf.textContent = 'CPF: ' + p.cpf;
            info.appendChild(name); info.appendChild(cpf);
            var addBtn = document.createElement('button');
            addBtn.className = 'btn btn--secondary';
            addBtn.textContent = 'Adicionar';
            addBtn.addEventListener('click', function () {
                staging.push({ participanteId: p.id, pagamento: 'pendente' });
                refresh();
            });
            card.appendChild(avatar); card.appendChild(info); card.appendChild(addBtn);
            list.appendChild(card);
        });

        added.innerHTML = '';
        var resumo = getResumoCaravana(caravanaId);
        count.textContent = 'Participantes adicionados (' + (resumo.total + staging.length) + ')';
        if (staging.length === 0) {
            var e2 = document.createElement('p');
            e2.className = 'empty-state';
            e2.textContent = 'Nenhum participante novo selecionado.';
            added.appendChild(e2);
        }
        staging.forEach(function (s) {
            var p = getParticipanteById(s.participanteId);
            if (!p) { return; }
            var card = document.createElement('div');
            card.className = 'card participante-card';
            var avatar = document.createElement('span');
            avatar.className = 'avatar';
            avatar.textContent = getInitials(p.nome);
            var info = document.createElement('div');
            info.className = 'participante-card-info';
            var name = document.createElement('p');
            name.className = 'participante-card-name';
            name.textContent = p.nome;
            var cpf = document.createElement('p');
            cpf.className = 'participante-card-cpf';
            cpf.textContent = 'CPF: ' + p.cpf;
            info.appendChild(name); info.appendChild(cpf);
            var rm = document.createElement('button');
            rm.className = 'btn btn--icon btn--icon-danger';
            rm.innerHTML = iconSvg('x');
            rm.setAttribute('aria-label', 'Remover ' + p.nome);
            rm.addEventListener('click', function () {
                staging = staging.filter(function (x) { return x.participanteId !== p.id; });
                refresh();
            });
            card.appendChild(avatar); card.appendChild(info); card.appendChild(rm);
            added.appendChild(card);
        });
    }

    caravanaSelect.addEventListener('change', function () { staging = []; refresh(); });
    if (search) { search.addEventListener('input', refresh); }
    cancelBtn.addEventListener('click', function () { goBack('caravanas.html'); });
    saveBtn.addEventListener('click', function () {
        var caravanaId = caravanaSelect.value;
        if (!caravanaId) { showToast('Selecione uma caravana.', 'error'); return; }
        if (staging.length === 0) { showToast('Selecione ao menos um participante.', 'error'); return; }
        var blocked = 0;
        staging.forEach(function (s) {
            var r = createAssociacao({ caravanaId: caravanaId, participanteId: s.participanteId, pagamento: 'pendente' });
            if (r.errors) { blocked++; }
        });
        staging = [];
        refresh();
        showToast(blocked ? blocked + ' já estavam associados.' : 'Participantes associados.', blocked ? 'info' : 'success');
    });
    refresh();
}

/* ---------- PESQUISAR ---------- */
function initPesquisar() {
    var input = document.getElementById('searchInput');
    var btn = document.getElementById('searchBtn');
    if (!input) { return; }
    function run() { renderPesquisa(input.value); }
    input.addEventListener('input', run);
    if (btn) { btn.addEventListener('click', run); }
    renderPesquisa('');
}

function renderPesquisa(term) {
    var list = document.getElementById('searchResult');
    if (!list) { return; }
    var items = searchParticipantes(term);
    list.innerHTML = '';
    if (items.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'Participante não encontrado.';
        list.appendChild(empty);
        return;
    }
    items.slice(0, 30).forEach(function (p) {
        var card = document.createElement('div');
        card.className = 'card participante-card card--clickable';
        card.setAttribute('data-participante-id', p.id);
        var avatar = document.createElement('span');
        avatar.className = 'avatar';
        avatar.textContent = getInitials(p.nome);
        var info = document.createElement('div');
        info.className = 'participante-card-info';
        var name = document.createElement('p');
        name.className = 'participante-card-name';
        name.textContent = p.nome;
        var cpf = document.createElement('p');
        cpf.className = 'participante-card-cpf';
        cpf.textContent = 'CPF: ' + p.cpf;
        info.appendChild(name); info.appendChild(cpf);
        card.appendChild(avatar); card.appendChild(info);
        card.addEventListener('click', function () { navigateTo('participante-form.html', { id: p.id }); });
        list.appendChild(card);
    });
}

/* ---------- LISTA FINAL ---------- */
function initLista() {
    var id = getQueryParam('id');
    var caravana = id ? getCaravanaById(id) : getCaravanas()[0];
    if (!caravana) {
        showToast('Nenhuma caravana cadastrada.', 'error');
        navigateTo('caravanas.html');
        return;
    }
    document.getElementById('listaRoute').textContent = caravana.origem + ' → ' + caravana.destino;
    document.getElementById('listaMeta').textContent = formatDateBR(caravana.data) + ' • ' + caravana.horario;
    document.getElementById('listaResp').textContent = 'Responsável: ' + caravana.responsavel;
    document.getElementById('backBtn').addEventListener('click', function () {
        navigateTo('caravana-detalhes.html', { id: caravana.id });
    });

    var resumo = getResumoCaravana(caravana.id);
    document.getElementById('totalNum').textContent = String(resumo.total);
    document.getElementById('pagosNum').textContent = String(resumo.pagos);
    document.getElementById('pendNum').textContent = String(resumo.pendentes);

    var ol = document.getElementById('listaOl');
    ol.innerHTML = '';
    var items = getParticipantesDaCaravana(caravana.id);
    if (items.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'Nenhum participante associado.';
        ol.appendChild(empty);
    }
    items.forEach(function (it, idx) {
        var li = document.createElement('li');
        li.className = 'card ordered-list-item';
        var num = document.createElement('strong');
        num.textContent = (idx + 1) + '.';
        var info = document.createElement('span');
        info.style.flex = '1';
        info.textContent = it.participante.nome + ' — ';
        var badge = document.createElement('span');
        badge.className = 'status-badge ' + (it.associacao.pagamento === 'pago' ? 'status-paid' : 'status-pending');
        badge.textContent = it.associacao.pagamento === 'pago' ? 'Pago' : 'Pendente';
        info.appendChild(badge);
        li.appendChild(num); li.appendChild(info);
        ol.appendChild(li);
    });

    document.getElementById('shareBtn').addEventListener('click', function () {
        var text = 'Caravana ' + caravana.origem + ' → ' + caravana.destino + ' (' + formatDateBR(caravana.data) + ' ' + caravana.horario + ')\n' +
            'Total: ' + resumo.total + ' • Pagos: ' + resumo.pagos + ' • Pendentes: ' + resumo.pendentes + '\n' +
            items.map(function (it, i) {
                return (i + 1) + '. ' + it.participante.nome + ' (' + it.participante.cpf + ') — ' + (it.associacao.pagamento === 'pago' ? 'Pago' : 'Pendente');
            }).join('\n');
        if (navigator.share) {
            navigator.share({ title: 'Lista de Participantes', text: text }).catch(function () {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                showToast('Lista copiada para a área de transferência.', 'success');
            });
        } else {
            showToast('Compartilhamento não suportado neste navegador.', 'info');
        }
    });
    document.getElementById('pdfBtn').addEventListener('click', function () { window.print(); });
}
