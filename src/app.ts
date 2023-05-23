import { FastifyPluginAsync } from 'fastify';
import fastifySensiblePlugin from '@fastify/sensible';

const app: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifySensiblePlugin);

  fastify.get('/', async (request, reply) => {
    return { message: 'Hello world!' };
  });

  fastify.get('/418', async (request, reply) => {
    throw fastify.httpErrors.imateapot();
  });
};

export default app;
