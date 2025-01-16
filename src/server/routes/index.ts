import { Router } from "express";

import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "../controllers";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     tags: [Geral]
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas retornada com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Ola Dev!
 */
router.get("/", (_, res) => {
  return res.send("Ola Dev!");
});

/**
 * @swagger
 * /cidades:
 *   get:
 *     summary: Retorna todas as cidades
 *     tags: [Cidades]
 *     responses:
 *       200:
 *         description: Lista de cidades retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cidade'
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);

/**
 * @swagger
 * /cidades/{id}:
 *   get:
 *     summary: Retorna uma cidade pelo ID
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cidade
 *     responses:
 *       200:
 *         description: Cidade retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cidade'
 *       404:
 *         description: Cidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.getById
);

/**
 * @swagger
 * /cidades:
 *   post:
 *     summary: Cria uma nova cidade
 *     tags: [Cidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CidadeInput'
 *     responses:
 *       201:
 *         description: Cidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cidade'
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);

/**
 * @swagger
 * /cidades/{id}:
 *   put:
 *     summary: Atualiza uma cidade existente
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CidadeInput'
 *     responses:
 *       200:
 *         description: Cidade atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cidade'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Cidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/cidades/:id",
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);

/**
 * @swagger
 * /cidades/{id}:
 *   delete:
 *     summary: Deleta uma cidade pelo ID
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cidade
 *     responses:
 *       200:
 *         description: Cidade deletada com sucesso
 *       404:
 *         description: Cidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/cidades/:id",
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Retorna todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pessoa'
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/pessoas",
  PessoasController.getAllValidation,
  PessoasController.getAll
);

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Retorna uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa
 *     responses:
 *       200:
 *         description: Pessoa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/pessoas/:id",
  PessoasController.getByIdValidation,
  PessoasController.getById
);

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PessoaInput'
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/pessoas",
  PessoasController.createValidation,
  PessoasController.create
);

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa existente
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PessoaInput'
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/pessoas/:id",
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Deleta uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa
 *     responses:
 *       200:
 *         description: Pessoa deletada com sucesso
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/pessoas/:id",
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

/**
 * @swagger
 * /entrar:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.signIn
);

/**
 * @swagger
 * /cadastrar:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);

export { router };
