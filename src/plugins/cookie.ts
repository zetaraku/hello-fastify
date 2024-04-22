import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyCookiePlugin from '@fastify/cookie';

/**
 * This plugin adds support for reading and setting cookies.
 * @see https://github.com/fastify/fastify-cookie
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifyCookiePlugin);
};

export default fastifyPlugin(plugin);
