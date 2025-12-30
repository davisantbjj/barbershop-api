const express = require('express');
const barberController = require('../controllers/barberController');
const authMiddleware = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/barbers:
 *   get:
 *     summary: Listar todos os barbeiros
 *     tags: [Barbers]
 *     responses:
 *       200:
 *         description: Lista de barbeiros
 */
router.get('/', barberController.getAllBarbers);

/**
 * @swagger
 * /api/barbers/{id}:
 *   get:
 *     summary: Buscar barbeiro por ID
 *     tags: [Barbers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Barbeiro encontrado
 */
router.get('/:id', barberController.getBarberById);

/**
 * @swagger
 * /api/barbers:
 *   post:
 *     summary: Criar novo barbeiro
 *     tags: [Barbers]
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               specialization:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Barbeiro criado com sucesso
 */
router.post('/', authMiddleware, isAdmin, barberController.createBarber);

/**
 * @swagger
 * /api/barbers/{id}:
 *   put:
 *     summary: Atualizar barbeiro
 *     tags: [Barbers]
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
 *         description: Barbeiro atualizado com sucesso
 */
router.put('/:id', authMiddleware, isAdmin, barberController.updateBarber);

/**
 * @swagger
 * /api/barbers/{id}:
 *   delete:
 *     summary: Deletar barbeiro
 *     tags: [Barbers]
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
 *         description: Barbeiro deletado com sucesso
 */
router.delete('/:id', authMiddleware, isAdmin, barberController.deleteBarber);

module.exports = router;
