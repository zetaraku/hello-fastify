import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifySseV2Plugin from 'fastify-sse-v2';

/**
 * This plugin sends server-sent events.
 * @see https://github.com/nodefactoryio/fastify-sse-v2
 * @tutorial https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifySseV2Plugin);
};

export default fastifyPlugin(plugin);
