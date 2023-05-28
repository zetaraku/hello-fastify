import * as path from 'node:path';
import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    readonly appRootPath: string;
  }
}

/**
 * This plugin adds `.appRootPath` to the `fastify` instance.
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.decorate('appRootPath', path.join(__dirname, '../../'));
};

export default fastifyPlugin(plugin);
