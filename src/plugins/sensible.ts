import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifySensiblePlugin from '@fastify/sensible';

/**
 * This plugin adds some utilities to handle http errors.
 * @see https://github.com/fastify/fastify-sensible
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifySensiblePlugin);
};

export default fastifyPlugin(plugin);
