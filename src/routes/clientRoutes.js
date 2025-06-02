const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

router.get('/', ClientController.listClients);
router.get('/create', ClientController.createClientForm);
router.post('/create', ClientController.createClient);
router.get('/edit/:id', ClientController.editClientForm);
router.post('/edit/:id', ClientController.editClient);
router.post('/delete/:id', ClientController.deleteClient);

module.exports = router;
