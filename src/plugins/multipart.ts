import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyMultipartPlugin, { MultipartValue } from '@fastify/multipart';

/**
 * This plugin parses the multipart content-type.
 * @see https://github.com/fastify/fastify-multipart
 */
const plugin: FastifyPluginAsync = async (fastify, options) => {
  await fastify.register(fastifyMultipartPlugin, {
    attachFieldsToBody: 'keyValues',
    async onFile(part) {
      // eslint-disable-next-line no-param-reassign
      (part as unknown as MultipartValue).value = await part.toBuffer();
    },
  });
};

export default fastifyPlugin(plugin);
