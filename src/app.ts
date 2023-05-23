import { FastifyPluginAsync } from 'fastify';
import fastifySensiblePlugin from '@fastify/sensible';

const app: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifySensiblePlugin);

  fastify.get('/', async (request, reply) => {
    return { message: 'Hello world!' };
  });
};

export default app;
