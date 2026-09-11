// Funções auxiliares genéricas.
function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function normalizeText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function normalizeCpf(cpf) {
    return String(cpf || '').replace(/\D/g, '');
}

function formatCpf(value) {
    var digits = normalizeCpf(value).slice(0, 11);
    if (digits.length <= 3) { return digits; }
    if (digits.length <= 6) { return digits.slice(0, 3) + '.' + digits.slice(3); }
    if (digits.length <= 9) { return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6); }
    return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6, 9) + '-' + digits.slice(9);
}

function formatPhone(value) {
    var digits = normalizeCpf(value).slice(0, 11);
    if (digits.length <= 2) { return digits.length ? '(' + digits : ''; }
    if (digits.length <= 6) { return '(' + digits.slice(0, 2) + ') ' + digits.slice(2); }
    if (digits.length <= 10) { return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6); }
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
}

function formatDateInput(value) {
    var digits = normalizeCpf(value).slice(0, 8);
    if (digits.length <= 2) { return digits; }
    if (digits.length <= 4) { return digits.slice(0, 2) + '/' + digits.slice(2); }
    return digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
}

function formatDateBR(isoDate) {
    if (!isoDate) { return ''; }
    if (isoDate.indexOf('/') !== -1) { return isoDate; }
    var parts = isoDate.split('-');
    if (parts.length !== 3) { return isoDate; }
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

function parseDateBR(brDate) {
    var parts = String(brDate || '').split('/');
    if (parts.length !== 3) { return ''; }
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}

function getInitials(name) {
    var words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) { return '?'; }
    if (words.length === 1) { return words[0].slice(0, 2).toUpperCase(); }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function escapeHtml(value) {
    return String(value === null || value === undefined ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Toast reutilizável: showToast(message, type)
function showToast(message, type) {
    var container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () {
        if (toast.parentNode) { toast.parentNode.removeChild(toast); }
    }, 3200);
}

// Modal de confirmação reutilizável.
function confirmDialog(options) {
    var overlay = document.getElementById('confirmOverlay');
    var titleEl = document.getElementById('confirmTitle');
    var descEl = document.getElementById('confirmDescription');
    var cancelBtn = document.getElementById('confirmCancel');
    var confirmBtn = document.getElementById('confirmOk');
    if (!overlay || !confirmBtn || !cancelBtn) { return; }
    titleEl.textContent = options.title || 'Confirmar ação';
    descEl.textContent = options.description || 'Tem certeza?';
    confirmBtn.textContent = options.confirmLabel || 'Excluir';
    cancelBtn.textContent = options.cancelLabel || 'Cancelar';

    function close(result) {
        overlay.hidden = true;
        confirmBtn.removeEventListener('click', onConfirm);
        cancelBtn.removeEventListener('click', onCancel);
        overlay.removeEventListener('click', onOverlay);
        if (options.onResult) { options.onResult(result); }
    }
    function onConfirm() { close(true); }
    function onCancel() { close(false); }
    function onOverlay(event) { if (event.target === overlay) { close(false); } }
    confirmBtn.addEventListener('click', onConfirm);
    cancelBtn.addEventListener('click', onCancel);
    overlay.addEventListener('click', onOverlay);
    overlay.hidden = false;
    cancelBtn.focus();
}

function applyCpfMask(input) {
    input.addEventListener('input', function () {
        input.value = formatCpf(input.value);
    });
}

function applyPhoneMask(input) {
    input.addEventListener('input', function () {
        input.value = formatPhone(input.value);
    });
}

// Ícones Phosphor light via sprite local (assets/icons.svg).
// Retorna o markup <svg><use> do símbolo pedido; a cor vem de currentColor (CSS).
function iconSvg(name) {
    return '<svg class="icon" aria-hidden="true"><use href="../assets/icons.svg#ph-' + name + '"></use></svg>';
}
