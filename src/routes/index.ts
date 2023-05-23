import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Hello world!' };
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

  fastify.get('/418', async (request, reply) => {
    throw fastify.httpErrors.imateapot();
  });
};

export default routes;
