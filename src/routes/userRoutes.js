import express from 'express';
import { create, getAll, getDetail, update, remove } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: "Mã ID duy nhất của người dùng (MongoDB ObjectId)"
 *           example: "66b437c9ce982033cd76a63"
 *         name:
 *           type: string
 *           description: "Tên người dùng"
 *           example: "User1"
 *         email:
 *           type: string
 *           format: email
 *           description: "Địa chỉ email duy nhất"
 *           example: "user1@example.com"
 *         age:
 *           type: integer
 *           description: "Tuổi (Mặc định 18)"
 *           example: 18
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Thời điểm tạo"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Thời điểm cập nhật gần nhất"
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: "Tên người dùng (Bắt buộc)"
 *           example: "User1"
 *         email:
 *           type: string
 *           format: email
 *           description: "Email duy nhất (Bắt buộc)"
 *           example: "user1@example.com"
 *         age:
 *           type: integer
 *           description: "Tuổi (Tùy chọn, mặc định 18)"
 *           example: 18
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "User1"
 *         email:
 *           type: string
 *           format: email
 *           example: "user1@example.com"
 *         age:
 *           type: integer
 *           example: 19
 *     CreateUserSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Thành công"
 *         data:
 *           $ref: '#/components/schemas/User'
 *     DeleteSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Đã xóa"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Không tìm thấy"
 *         error:
 *           type: string
 *           example: "Lỗi chi tiết từ hệ thống"
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Thêm người dùng mới
 *     description: Tạo một bản ghi người dùng mới trong cơ sở dữ liệu. Yêu cầu name và email (duy nhất).
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *           example:
 *             name: "User1"
 *             email: "user1@example.com"
 *             age: 18
 *     responses:
 *       201:
 *         description: Tạo người dùng mới thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccessResponse'
 *             example:
 *               message: "Thành công"
 *               data:
 *                 _id: "66b437c9ce982033cd76a63"
 *                 name: "User1"
 *                 email: "user1@example.com"
 *                 age: 18
 *                 createdAt: "2026-08-02T10:00:00.000Z"
 *                 updatedAt: "2026-08-02T10:00:00.000Z"
 *       500:
 *         description: Lỗi máy chủ (ví dụ trùng lặp email hoặc dữ liệu không hợp lệ)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"user1@example.com\" }"
 */
router.post('/', create);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     description: Trả về danh sách mảng gồm tất cả người dùng trong cơ sở dữ liệu.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về mảng danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - _id: "66b437c9ce982033cd76a63"
 *                 name: "User1"
 *                 email: "user1@example.com"
 *                 age: 18
 *                 createdAt: "2026-08-02T10:00:00.000Z"
 *                 updatedAt: "2026-08-02T10:00:00.000Z"
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết người dùng theo ID
 *     description: Tìm kiếm và trả về thông tin của 1 người dùng theo mã id.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID (MongoDB ObjectId) của người dùng
 *         example: "66b437c9ce982033cd76a63"
 *     responses:
 *       200:
 *         description: Lấy chi tiết người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               _id: "66b437c9ce982033cd76a63"
 *               name: "User1"
 *               email: "user1@example.com"
 *               age: 18
 *               createdAt: "2026-08-02T10:00:00.000Z"
 *               updatedAt: "2026-08-02T10:00:00.000Z"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Không tìm thấy"
 */
router.get('/:id', getDetail);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng theo ID
 *     description: Cập nhật thông tin người dùng theo mã id và trả về thông tin mới sau khi sửa.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID của người dùng cần cập nhật
 *         example: "66b437c9ce982033cd76a63"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *           example:
 *             name: "User1"
 *             email: "user1@example.com"
 *             age: 19
 *     responses:
 *       200:
 *         description: Cập nhật người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               _id: "66b437c9ce982033cd76a63"
 *               name: "User1"
 *               email: "user1@example.com"
 *               age: 19
 *               createdAt: "2026-08-02T10:00:00.000Z"
 *               updatedAt: "2026-08-02T10:10:00.000Z"
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa người dùng theo ID
 *     description: Xóa người dùng tương ứng với id khỏi hệ thống.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID của người dùng cần xóa
 *         example: "66b437c9ce982033cd76a63"
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSuccessResponse'
 *             example:
 *               message: "Đã xóa"
 */
router.delete('/:id', remove);

export default router;