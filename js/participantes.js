// Regras de participantes (CRUD + pesquisa).
function getParticipantes() {
    return state.participantes;
}

function getParticipanteById(id) {
    return state.participantes.find(function (p) { return p.id === id; }) || null;
}

function createParticipante(data) {
    var errors = validateParticipanteForm(data);
    if (Object.keys(errors).length > 0) { return { errors: errors }; }
    var participante = {
        id: generateId(),
        nome: String(data.nome).trim(),
        nascimento: data.nascimento.indexOf('/') !== -1 ? parseDateBR(data.nascimento) : data.nascimento,
        cpf: formatCpf(data.cpf),
        orgaoEmissor: String(data.orgaoEmissor).trim(),
        telefone: formatPhone(data.telefone)
    };
    state.participantes.push(participante);
    saveState();
    return { participante: participante };
}

function updateParticipante(id, data) {
    var participante = getParticipanteById(id);
    if (!participante) { return { errors: { geral: 'Participante não encontrado.' } }; }
    var errors = validateParticipanteForm(data);
    if (Object.keys(errors).length > 0) { return { errors: errors }; }
    participante.nome = String(data.nome).trim();
    participante.nascimento = data.nascimento.indexOf('/') !== -1 ? parseDateBR(data.nascimento) : data.nascimento;
    participante.cpf = formatCpf(data.cpf);
    participante.orgaoEmissor = String(data.orgaoEmissor).trim();
    participante.telefone = formatPhone(data.telefone);
    saveState();
    return { participante: participante };
}

function deleteParticipante(id) {
    state.participantes = state.participantes.filter(function (p) { return p.id !== id; });
    state.associacoes = state.associacoes.filter(function (a) { return a.participanteId !== id; });
    saveState();
}

function searchParticipantes(term) {
    var normalized = normalizeText(term);
    var digits = normalizeCpf(term);
    if (!normalized && !digits) { return getParticipantes(); }
    return getParticipantes().filter(function (p) {
        var nameMatch = normalized && normalizeText(p.nome).indexOf(normalized) !== -1;
        var cpfMatch = digits && normalizeCpf(p.cpf).indexOf(digits) !== -1;
        return nameMatch || cpfMatch;
    });
}
