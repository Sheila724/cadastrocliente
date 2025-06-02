const Client = require('../models/Client');

module.exports = {
    async listClients(req, res) {
        const clients = await Client.findAll();
        console.log('Clientes retornados:', clients);
        console.log('Dados dos clientes:', clients);
        res.render('clients/list', { clients });
    },

    createClientForm(req, res) {
        res.render('clients/create');
    },

    async createClient(req, res) {
        const { name, email, phone, cep, pais, municipio, uf, logradouro, numero, complemento, bairro, rg, orgao, tipo, cpf_cnpj } = req.body;
        // Monta o endereço completo
        const endereco = `${logradouro || ''}, ${numero || ''}${complemento ? ' - ' + complemento : ''}, ${bairro || ''}, ${municipio || ''} - ${uf || ''}, ${cep || ''}, ${pais || ''}`;
        try {
            await Client.create({
                name,
                email,
                phone,
                rg,
                orgao,
                tipo,
                cpf_cnpj,
                endereco
            });
            req.flash('message', 'Cliente cadastrado com sucesso!');
            res.redirect('/clients');
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            req.flash('error', 'Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
            res.redirect('/clients/create');
        }
    },

    async editClientForm(req, res) {
        console.log('editClientForm chamado com ID:', req.params.id);
        const client = await Client.findByPk(req.params.id);
        res.render('clients/edit', { client });
    },

    async editClient(req, res) {
        // Atualiza todos os campos possíveis do cliente
        const { name, email, phone, endereco, rg, orgao, tipo, cpf_cnpj } = req.body;
        await Client.update(
            { name, email, phone, endereco, rg, orgao, tipo, cpf_cnpj },
            { where: { id: req.params.id } }
        );
        res.redirect('/clients');
    },

    async deleteClient(req, res) {
        console.log('deleteClient chamado com ID:', req.params.id);
        await Client.destroy({ where: { id: req.params.id } });
        req.session.save(() => res.redirect('/clients'));
    }
};
