import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyHelmetPlugin from '@fastify/helmet';

/**
 * This plugin adds some important security headers.
 * @see https://github.com/fastify/fastify-helmet
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifyHelmetPlugin);
};

export default fastifyPlugin(plugin);
