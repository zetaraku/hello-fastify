import { FastifyPluginAsync } from 'fastify';
import * as z from 'zod';
import * as sleep from 'sleep-promise';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
  }, async (request, reply) => {
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

  fastify.get('/sse', {
  }, async (request, reply) => {
    void reply.header('Access-Control-Allow-Origin', '*');

    await sleep(500);

    reply.sse({
      event: 'hello',
    });

    await sleep(500);

    reply.sse({
      // event: 'message',
      data: JSON.stringify({ message: 'Hello world!' }),
    });

    await sleep(500);

    reply.sse({
      event: 'ping',
      data: 'Friendly ping :)',
    });

    await sleep(500);

    reply.sse({
      event: 'poke',
      data: 'Friendly poke :D',
    });

    await sleep(500);

    reply.sse({
      comment: 'Going to sleep ...',
    });

    reply.sseContext.source.end();
  });

  fastify.get('/418', {
  }, async (request, reply) => {
    throw fastify.httpErrors.imateapot();
  });
};

export default routes;
