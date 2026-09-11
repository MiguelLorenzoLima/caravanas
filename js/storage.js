// Único ponto de acesso ao localStorage.
var STORAGE_KEYS = {
    CARAVANAS: 'caravanas',
    PARTICIPANTES: 'participantes',
    ASSOCIACOES: 'associacoes',
    USER: 'user'
};

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, fallback) {
    try {
        var raw = localStorage.getItem(key);
        if (raw === null || raw === undefined) {
            return fallback !== undefined ? fallback : [];
        }
        return JSON.parse(raw);
    } catch (error) {
        console.error('Erro ao carregar ' + key + ':', error);
        return fallback !== undefined ? fallback : [];
    }
}

function removeData(key) {
    localStorage.removeItem(key);
}

function initializeData() {
    var hasCaravanas = localStorage.getItem(STORAGE_KEYS.CARAVANAS) !== null;
    var hasParticipantes = localStorage.getItem(STORAGE_KEYS.PARTICIPANTES) !== null;
    var hasAssociacoes = localStorage.getItem(STORAGE_KEYS.ASSOCIACOES) !== null;

    if (!hasCaravanas || !hasParticipantes || !hasAssociacoes) {
        saveData(STORAGE_KEYS.CARAVANAS, initialData.caravanas);
        saveData(STORAGE_KEYS.PARTICIPANTES, initialData.participantes);
        saveData(STORAGE_KEYS.ASSOCIACOES, initialData.associacoes);
    }
}
