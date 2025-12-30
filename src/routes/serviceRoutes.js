const express = require('express');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Listar todos os serviços
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
router.get('/', serviceController.getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Buscar serviço por ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço encontrado
 */
router.get('/:id', serviceController.getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Criar novo serviço
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 */
router.post('/', authMiddleware, isAdmin, serviceController.createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Atualizar serviço
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 */
router.put('/:id', authMiddleware, isAdmin, serviceController.updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Deletar serviço
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 */
router.delete('/:id', authMiddleware, isAdmin, serviceController.deleteService);

module.exports = router;
