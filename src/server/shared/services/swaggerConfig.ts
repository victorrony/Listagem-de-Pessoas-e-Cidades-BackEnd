import swaggerJsdoc from "swagger-jsdoc"; // Correct import
import swaggerUi from "swagger-ui-express"; // Ensure correct import
import { Express } from "express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Listagem de Pessoas e Cidades API",
      version: "1.0.0",
      description: "API para listagem de pessoas e cidades",
    },
    servers: [
      {
        url: "http://localhost:3335",
      },
    ],
    components: {
      schemas: {
        Cidade: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "São Paulo",
            },
            // Adicione outras propriedades conforme necessário
          },
          required: ["id", "name"],
        },
        CidadeInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Rio de Janeiro",
            },
            // Adicione outras propriedades conforme necessário
          },
          required: ["name"],
        },
        Pessoa: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "João Silva",
            },
            email: {
              type: "string",
              example: "joao.silva@example.com",
            },
            // Adicione outras propriedades conforme necessário
          },
          required: ["id", "name", "email"],
        },
        PessoaInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Maria Souza",
            },
            email: {
              type: "string",
              example: "maria.souza@example.com",
            },
            password: {
              type: "string",
              example: "senha123",
            },
            // Adicione outras propriedades conforme necessário
          },
          required: ["name", "email", "password"],
        },
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Carlos Pereira",
            },
            email: {
              type: "string",
              example: "carlos.pereira@example.com",
            },
            password: {
              type: "string",
              example:
                "$2a$08$isD574z1r/fChmER236B8OxW47UaCh9nd74GjXQTuHjlpkJ20.UJ6",
            },
          },
          required: ["id", "name", "email", "password"],
        },
        UsuarioInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Ana Paula",
            },
            email: {
              type: "string",
              example: "ana.paula@example.com",
            },
            password: {
              type: "string",
              example: "senha123",
            },
          },
          required: ["name", "email", "password"],
        },
        AuthResponse: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
          required: ["accessToken"],
        },
      },
    },
  },
  apis: [path.join(__dirname, "../../routes/*.ts")], // Caminho absoluto para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
