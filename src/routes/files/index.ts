import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { FastifyPluginAsync } from 'fastify';
import * as z from 'zod';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.post('/', {
    schema: {
      body: z.object({
        file: z.instanceof(Buffer),
      }),
    },
  }, async (request, reply) => {
    const uuid = crypto.randomUUID();
    const filePath = path.join(fastify.appRootPath, 'uploads/', `${uuid}.bin`);

    await fs.promises.writeFile(filePath, request.body.file);

    await reply.status(201).send({ uuid });
  });

  fastify.get('/:uuid', {
    schema: {
      params: z.object({
        uuid: z.string().uuid(),
      }),
    },
  }, async (request, reply) => {
    const uuid = request.params.uuid as ReturnType<typeof crypto.randomUUID>;
    const filePath = path.join(fastify.appRootPath, 'uploads/', `${uuid}.bin`);

    const fileStream = fs.createReadStream(filePath);

    await reply.type('application/octet-stream').send(fileStream);
  });
};

export default routes;
