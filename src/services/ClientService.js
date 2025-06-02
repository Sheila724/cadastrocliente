const Client = require('../models/Client');

module.exports = {
  async getAllClients() {
    return await Client.findAll();
  },

  async findClientById(id) {
    return await Client.findByPk(id);
  },

  async createClient(data) {
    return await Client.create(data);
  },

  async updateClient(id, data) {
    return await Client.update(data, { where: { id } });
  },

  async deleteClient(id) {
    return await Client.destroy({ where: { id } });
  },
};
