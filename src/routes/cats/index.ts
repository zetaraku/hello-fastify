import * as crypto from 'node:crypto';
import { FastifyPluginAsync } from 'fastify';
import * as z from 'zod';

export const catSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  age: z.number().nonnegative().int().default(0),
});

const cats: z.infer<typeof catSchema>[] = [
  { id: crypto.randomUUID(), name: 'Alice', age: 1 },
  { id: crypto.randomUUID(), name: 'Bob', age: 2 },
  { id: crypto.randomUUID(), name: 'Cindy', age: 3 },
];

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', {
    schema: {
      response: {
        200: z.array(catSchema),
      },
    },
  }, async (request, reply) => {
    await reply.send(cats);
  });

  fastify.post('/', {
    schema: {
      body: catSchema.omit({ id: true }),
      response: {
        201: catSchema,
      },
    },
  }, async (request, reply) => {
    const newCat = {
      id: crypto.randomUUID(),
      ...request.body,
    };

    cats.push(newCat);

    await reply.status(201).send(newCat);
  });

  fastify.get('/:catId', {
    schema: {
      params: z.object({
        catId: z.string().uuid(),
      }),
      response: {
        200: catSchema,
      },
    },
  }, async (request, reply) => {
    const targetCat = cats.find((cat) => cat.id === request.params.catId);

    if (targetCat === undefined) throw fastify.httpErrors.notFound('That cat doesn\'t exist.');

    await reply.send(targetCat);
  });

  fastify.patch('/:catId', {
    schema: {
      params: z.object({
        catId: z.string().uuid(),
      }),
      body: catSchema.omit({ id: true }).partial(),
    },
  }, async (request, reply) => {
    const targetCat = cats.find((cat) => cat.id === request.params.catId);

    if (targetCat === undefined) throw fastify.httpErrors.badRequest('That cat doesn\'t exist.');

    Object.assign(targetCat, request.body);

    await reply.status(200).send();
  });

  fastify.delete('/:catId', {
    schema: {
      params: z.object({
        catId: z.string().uuid(),
      }),
    },
  }, async (request, reply) => {
    const targetCatIndex = cats.findIndex((cat) => cat.id === request.params.catId);

    if (targetCatIndex === -1) throw fastify.httpErrors.badRequest('That cat doesn\'t exist.');

    cats.splice(targetCatIndex, 1);

    await reply.status(200).send();
  });
};

export default routes;
