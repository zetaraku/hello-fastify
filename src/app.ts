import { FastifyPluginAsync } from 'fastify';
import sensiblePlugin from './plugins/sensible';
import zodPlugin from './plugins/zod';
import routesPlugin from './routes';

const app: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(sensiblePlugin);
  await fastify.register(zodPlugin);

  await fastify.register(routesPlugin);
};

export default app;
