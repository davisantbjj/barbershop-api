const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Listar todos os agendamentos
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: barberId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 */
router.get('/', authMiddleware, appointmentController.getAllAppointments);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Buscar agendamento por ID
 *     tags: [Appointments]
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
 *         description: Agendamento encontrado
 */
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Criar novo agendamento
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               barberId:
 *                 type: integer
 *               serviceId:
 *                 type: integer
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 */
router.post('/', authMiddleware, appointmentController.createAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Atualizar agendamento
 *     tags: [Appointments]
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
 *         description: Agendamento atualizado com sucesso
 */
router.put('/:id', authMiddleware, appointmentController.updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}/cancel:
 *   patch:
 *     summary: Cancelar agendamento
 *     tags: [Appointments]
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
 *         description: Agendamento cancelado com sucesso
 */
router.patch('/:id/cancel', authMiddleware, appointmentController.cancelAppointment);

/**
 * @swagger
 * /api/appointments/{id}/complete:
 *   patch:
 *     summary: Completar agendamento
 *     tags: [Appointments]
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
 *         description: Agendamento completado com sucesso
 */
router.patch('/:id/complete', authMiddleware, appointmentController.completeAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Deletar agendamento
 *     tags: [Appointments]
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
 *         description: Agendamento deletado com sucesso
 */
router.delete('/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
