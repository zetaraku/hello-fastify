import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyFormbodyPlugin from '@fastify/formbody';

/**
 * This plugin parses the urlencoded content-type.
 * @see https://github.com/fastify/fastify-formbody
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifyFormbodyPlugin);
};

export default fastifyPlugin(plugin);
