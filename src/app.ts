import * as path from 'node:path';
import { FastifyPluginAsync } from 'fastify';
import autoloadPlugin from '@fastify/autoload';

const app: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(autoloadPlugin, {
    dir: path.join(__dirname, 'plugins'),
  });

  await fastify.register(autoloadPlugin, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: true,
    routeParams: true,
  });
};

export const options = {
  jsonShorthand: false,
};

export default app;
