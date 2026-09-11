// Estado centralizado da aplicação.
var state = {
    caravanas: [],
    participantes: [],
    associacoes: [],
    usuario: null
};

function loadState() {
    state.caravanas = loadData(STORAGE_KEYS.CARAVANAS, []);
    state.participantes = loadData(STORAGE_KEYS.PARTICIPANTES, []);
    state.associacoes = loadData(STORAGE_KEYS.ASSOCIACOES, []);
    state.usuario = loadData(STORAGE_KEYS.USER, null);
}

function saveState() {
    try {
        saveData(STORAGE_KEYS.CARAVANAS, state.caravanas);
        saveData(STORAGE_KEYS.PARTICIPANTES, state.participantes);
        saveData(STORAGE_KEYS.ASSOCIACOES, state.associacoes);
        saveData(STORAGE_KEYS.USER, state.usuario);
    } catch (error) {
        console.error('Erro ao salvar estado:', error);
        showToast('Não foi possível salvar os dados.', 'error');
    }
}
