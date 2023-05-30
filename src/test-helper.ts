import * as path from 'node:path';
import { FastifyInstance } from 'fastify';
import { build } from 'fastify-cli/helper';

export const appPath = path.join(__dirname, '../src/app.ts');

export async function buildFastifyTestInstance(t: Tap.Test) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const fastify = await build(
    /* cliArgs: */ [appPath],
    /* pluginOptions: */ {},
    /* serverOptions: */ {},
  ) as FastifyInstance;

  t.teardown(async () => {
    await fastify.close();
  });

  return fastify;
}
