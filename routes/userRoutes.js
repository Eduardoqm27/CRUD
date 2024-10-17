// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para exibir o formulário de login
router.get('/login', userController.loginForm);

// Rota para processar o login do usuário
router.post('/login', userController.login);

// Rota para processar o logout do usuário
router.post('/logout', userController.logout);

module.exports = router;
