// Dados mockados centralizados (usados só quando o storage está vazio).
var initialData = {
    caravanas: [
        { id: 'caravana-001', origem: 'Joinville', destino: 'São Paulo', data: '2026-06-22', horario: '06:00', responsavel: 'Ir. João Silva' },
        { id: 'caravana-002', origem: 'Joinville', destino: 'Curitiba', data: '2026-07-05', horario: '07:00', responsavel: 'Ir. Pedro' },
        { id: 'caravana-003', origem: 'Joinville', destino: 'Florianópolis', data: '2026-07-19', horario: '06:30', responsavel: 'Ir. André' }
    ],
    participantes: [
        { id: 'participante-001', nome: 'Miguel Lorenzo Lima', nascimento: '2000-01-15', cpf: '123.456.789-00', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0001' },
        { id: 'participante-002', nome: 'Guilherme Correa', nascimento: '1998-03-22', cpf: '987.654.321-00', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0002' },
        { id: 'participante-003', nome: 'Matheus Winter', nascimento: '2001-07-10', cpf: '111.222.333-44', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0003' },
        { id: 'participante-004', nome: 'Ana Carolina Lima', nascimento: '1995-11-05', cpf: '456.789.123-00', orgaoEmissor: 'SSP/PR', telefone: '(47) 99999-0004' },
        { id: 'participante-005', nome: 'Lucas Gabriel Mendes', nascimento: '2002-02-18', cpf: '321.654.987-00', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0005' },
        { id: 'participante-006', nome: 'Paulo Henrique Alves', nascimento: '1990-09-30', cpf: '654.321.987-00', orgaoEmissor: 'SSP/SP', telefone: '(47) 99999-0006' },
        { id: 'participante-007', nome: 'Miguel A. de Souza', nascimento: '1988-05-12', cpf: '444.555.666-77', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0007' },
        { id: 'participante-008', nome: 'Miguel Oliveira', nascimento: '1999-12-01', cpf: '777.888.999-00', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0008' },
        { id: 'participante-009', nome: 'Fernanda Rocha', nascimento: '1997-04-25', cpf: '222.333.444-55', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0009' },
        { id: 'participante-010', nome: 'João Pedro Santos', nascimento: '2003-08-14', cpf: '333.444.555-66', orgaoEmissor: 'SSP/PR', telefone: '(47) 99999-0010' },
        { id: 'participante-011', nome: 'Maria Eduarda Dias', nascimento: '2001-10-09', cpf: '555.666.777-88', orgaoEmissor: 'SSP/SC', telefone: '(47) 99999-0011' },
        { id: 'participante-012', nome: 'Carlos Eduardo Nunes', nascimento: '1985-06-20', cpf: '888.999.000-11', orgaoEmissor: 'SSP/SP', telefone: '(47) 99999-0012' }
    ],
    associacoes: [
        { id: 'associacao-001', caravanaId: 'caravana-001', participanteId: 'participante-001', pagamento: 'pago' },
        { id: 'associacao-002', caravanaId: 'caravana-001', participanteId: 'participante-002', pagamento: 'pendente' },
        { id: 'associacao-003', caravanaId: 'caravana-001', participanteId: 'participante-003', pagamento: 'pago' },
        { id: 'associacao-004', caravanaId: 'caravana-001', participanteId: 'participante-004', pagamento: 'pendente' },
        { id: 'associacao-005', caravanaId: 'caravana-001', participanteId: 'participante-005', pagamento: 'pago' },
        { id: 'associacao-006', caravanaId: 'caravana-002', participanteId: 'participante-001', pagamento: 'pendente' },
        { id: 'associacao-007', caravanaId: 'caravana-002', participanteId: 'participante-006', pagamento: 'pendente' },
        { id: 'associacao-008', caravanaId: 'caravana-002', participanteId: 'participante-007', pagamento: 'pago' },
        { id: 'associacao-009', caravanaId: 'caravana-003', participanteId: 'participante-008', pagamento: 'pago' },
        { id: 'associacao-010', caravanaId: 'caravana-003', participanteId: 'participante-009', pagamento: 'pago' }
    ]
};
