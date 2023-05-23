import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return { message: 'Hello world!' };
});

fastify.listen({ port: Number(process.env.PORT ?? 3000) })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
