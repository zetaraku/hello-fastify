import * as path from 'node:path';
import { FastifyPluginAsync } from 'fastify';
import autoloadPlugin from '@fastify/autoload';
import routesPlugin from './routes';

const app: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(autoloadPlugin, {
    dir: path.join(__dirname, 'plugins'),
  });

  await fastify.register(routesPlugin);
};

export default app;
