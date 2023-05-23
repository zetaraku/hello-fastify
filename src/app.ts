import { FastifyPluginAsync } from 'fastify';
import fastifySensiblePlugin from '@fastify/sensible';
import routesPlugin from './routes';

const app: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifySensiblePlugin);

  await fastify.register(routesPlugin);
};

export default app;
