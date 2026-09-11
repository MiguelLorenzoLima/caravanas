// Regras de caravanas (CRUD + pesquisa).
function getCaravanas() {
    return state.caravanas;
}

function getCaravanaById(id) {
    return state.caravanas.find(function (c) { return c.id === id; }) || null;
}

function createCaravana(data) {
    var errors = validateCaravanaForm(data);
    if (Object.keys(errors).length > 0) { return { errors: errors }; }
    var caravana = {
        id: generateId(),
        origem: String(data.origem).trim(),
        destino: String(data.destino).trim(),
        data: data.data.indexOf('/') !== -1 ? parseDateBR(data.data) : data.data,
        horario: String(data.horario).trim(),
        responsavel: String(data.responsavel).trim()
    };
    state.caravanas.push(caravana);
    saveState();
    return { caravana: caravana };
}

function updateCaravana(id, data) {
    var caravana = getCaravanaById(id);
    if (!caravana) { return { errors: { geral: 'Caravana não encontrada.' } }; }
    var errors = validateCaravanaForm(data);
    if (Object.keys(errors).length > 0) { return { errors: errors }; }
    caravana.origem = String(data.origem).trim();
    caravana.destino = String(data.destino).trim();
    caravana.data = data.data.indexOf('/') !== -1 ? parseDateBR(data.data) : data.data;
    caravana.horario = String(data.horario).trim();
    caravana.responsavel = String(data.responsavel).trim();
    saveState();
    return { caravana: caravana };
}

function deleteCaravana(id) {
    state.caravanas = state.caravanas.filter(function (c) { return c.id !== id; });
    state.associacoes = state.associacoes.filter(function (a) { return a.caravanaId !== id; });
    saveState();
}

function searchCaravanas(term) {
    var normalized = normalizeText(term);
    if (!normalized) { return getCaravanas(); }
    var digits = normalizeCpf(term);
    return getCaravanas().filter(function (c) {
        var hay = normalizeText(c.origem + ' ' + c.destino + ' ' + c.responsavel + ' ' + c.data + ' ' + formatDateBR(c.data));
        if (hay.indexOf(normalized) !== -1) { return true; }
        if (digits && normalizeCpf(c.data).indexOf(digits) !== -1) { return true; }
        return false;
    });
}
