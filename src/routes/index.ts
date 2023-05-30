import * as child_process from 'node:child_process';
import { FastifyPluginAsync } from 'fastify';
import * as z from 'zod';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
  }, async (request, reply) => {
    return { message: 'Hello world!' };
  });

  fastify.get('/ping', {
  }, async (request, reply) => {
    const child = child_process.spawn('ping', ['127.0.0.1', '-t']);

    await reply.type('text/plain; charset=utf-8').send(child.stdout);
  });

  fastify.get('/greet', {
    schema: {
      querystring: z.object({
        name: z.string(),
      }),
    },
  }, async (request, reply) => {
    return { message: `Hi ${request.query.name}!` };
  });

  fastify.get('/418', {
  }, async (request, reply) => {
    throw fastify.httpErrors.imateapot();
  });
};

export default routes;
