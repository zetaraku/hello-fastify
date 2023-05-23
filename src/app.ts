import { FastifyPluginAsync } from 'fastify';

const app: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Hello world!' };
  });
};

export default app;
