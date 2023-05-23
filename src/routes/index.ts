import { FastifyPluginAsync } from 'fastify';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Hello world!' };
  });

  fastify.get('/418', async (request, reply) => {
    throw fastify.httpErrors.imateapot();
  });
};

export default routes;
