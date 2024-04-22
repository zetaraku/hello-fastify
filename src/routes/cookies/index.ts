import { FastifyPluginAsync } from 'fastify';
import * as z from 'zod';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/:name', {
    schema: {
      params: z.object({
        name: z.string(),
      }),
    },
  }, async (request, reply) => {
    const cookieName = request.params.name;
    const cookieValue = request.cookies[cookieName];

    if (cookieValue === undefined) throw fastify.httpErrors.notFound('That cookie doesn\'t exist.');

    return { name: cookieName, value: cookieValue };
  });

  fastify.post('/:name', {
    schema: {
      params: z.object({
        name: z.string(),
      }),
      body: z.object({
        value: z.string(),
      }),
    },
  }, async (request, reply) => {
    const cookieName = request.params.name;
    const cookieValue = request.body.value;

    void reply.setCookie(cookieName, cookieValue);

    return { name: cookieName, value: cookieValue };
  });

  fastify.delete('/:name', {
    schema: {
      params: z.object({
        name: z.string(),
      }),
    },
  }, async (request, reply) => {
    const cookieName = request.params.name;

    void reply.clearCookie(cookieName);

    return reply.status(200).send();
  });
};

export default routes;
