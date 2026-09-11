// Relação participante <-> caravana. O pagamento pertence à associação.
function getAssociacoes() {
    return state.associacoes;
}

function getAssociacoesByCaravana(caravanaId) {
    return state.associacoes.filter(function (a) { return a.caravanaId === caravanaId; });
}

function getAssociacoesByParticipante(participanteId) {
    return state.associacoes.filter(function (a) { return a.participanteId === participanteId; });
}

function isParticipantAlreadyAssociated(caravanaId, participanteId) {
    return state.associacoes.some(function (a) {
        return a.caravanaId === caravanaId && a.participanteId === participanteId;
    });
}

function createAssociacao(data) {
    if (!data.caravanaId || !data.participanteId) {
        return { errors: { geral: 'Selecione a caravana e o participante.' } };
    }
    if (isParticipantAlreadyAssociated(data.caravanaId, data.participanteId)) {
        return { errors: { geral: 'Participante já associado a esta caravana.' } };
    }
    var associacao = {
        id: generateId(),
        caravanaId: data.caravanaId,
        participanteId: data.participanteId,
        pagamento: data.pagamento === 'pago' ? 'pago' : 'pendente'
    };
    state.associacoes.push(associacao);
    saveState();
    return { associacao: associacao };
}

function deleteAssociacao(id) {
    state.associacoes = state.associacoes.filter(function (a) { return a.id !== id; });
    saveState();
}

function updatePagamento(id, status) {
    var associacao = state.associacoes.find(function (a) { return a.id === id; });
    if (!associacao) { return null; }
    associacao.pagamento = status === 'pago' ? 'pago' : 'pendente';
    saveState();
    return associacao;
}

function filterByPayment(associacoes, status) {
    if (!status || status === 'todos') { return associacoes; }
    return associacoes.filter(function (a) { return a.pagamento === status; });
}

function getResumoCaravana(caravanaId) {
    var list = getAssociacoesByCaravana(caravanaId);
    var pagos = list.filter(function (a) { return a.pagamento === 'pago'; }).length;
    return { total: list.length, pagos: pagos, pendentes: list.length - pagos };
}

function getParticipantesDaCaravana(caravanaId) {
    return getAssociacoesByCaravana(caravanaId).map(function (a) {
        return { associacao: a, participante: getParticipanteById(a.participanteId) };
    }).filter(function (item) { return item.participante !== null; });
}
