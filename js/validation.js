// Validações reutilizáveis de formulários.
function validateRequired(value) {
    return String(value === null || value === undefined ? '' : value).trim().length > 0;
}

function validateCpf(cpf) {
    return normalizeCpf(cpf).length === 11;
}

function validatePhone(phone) {
    var digits = normalizeCpf(phone).length;
    return digits === 10 || digits === 11;
}

function validateDateBR(value) {
    var digits = String(value || '');
    var iso = digits.indexOf('-') !== -1 ? digits : parseDateBR(digits);
    var parts = iso.split('-');
    if (parts.length !== 3) { return false; }
    var y = Number(parts[0]);
    var m = Number(parts[1]);
    var d = Number(parts[2]);
    if (!y || !m || !d) { return false; }
    var date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

function setFieldError(input, errorEl, message) {
    if (errorEl) { errorEl.textContent = message || ''; }
    if (input) {
        if (message) { input.classList.add('field--invalid'); input.classList.add('form-input-invalid'); }
        else { input.classList.remove('field--invalid'); input.classList.remove('form-input-invalid'); }
    }
    return !message;
}

function validateCaravanaForm(data) {
    var errors = {};
    if (!validateRequired(data.origem)) { errors.origem = 'Informe a origem.'; }
    if (!validateRequired(data.destino)) { errors.destino = 'Informe o destino.'; }
    if (!validateRequired(data.data)) { errors.data = 'Informe a data da viagem.'; }
    else if (!validateDateBR(data.data)) { errors.data = 'Informe uma data válida.'; }
    if (!validateRequired(data.horario)) { errors.horario = 'Informe o horário de saída.'; }
    if (!validateRequired(data.responsavel)) { errors.responsavel = 'Informe o responsável.'; }
    return errors;
}

function validateParticipanteForm(data) {
    var errors = {};
    if (!validateRequired(data.nome)) { errors.nome = 'Informe o nome completo.'; }
    if (!validateRequired(data.nascimento)) { errors.nascimento = 'Informe a data de nascimento.'; }
    else if (!validateDateBR(data.nascimento)) { errors.nascimento = 'Informe uma data válida.'; }
    if (!validateRequired(data.cpf)) { errors.cpf = 'Informe o CPF.'; }
    else if (!validateCpf(data.cpf)) { errors.cpf = 'CPF deve ter 11 dígitos.'; }
    if (!validateRequired(data.orgaoEmissor)) { errors.orgaoEmissor = 'Informe o órgão emissor.'; }
    if (!validateRequired(data.telefone)) { errors.telefone = 'Informe o telefone.'; }
    else if (!validatePhone(data.telefone)) { errors.telefone = 'Telefone inválido.'; }
    return errors;
}
