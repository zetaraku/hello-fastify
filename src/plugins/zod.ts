import { FastifyPluginAsync, FastifyTypeProvider } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import * as z from 'zod';
import { fromZodError } from 'zod-validation-error';

declare module 'fastify' {
  interface FastifyTypeProviderDefault extends FastifyTypeProvider {
    readonly output: this['input'] extends z.Schema ? z.infer<this['input']> : unknown;
  }
}

const plugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.setValidatorCompiler<z.ZodSchema>(({ schema, httpPart }) => {
    return (data) => {
      const parseResult = schema.safeParse(data);

      if (!parseResult.success) return { error: fromZodError(parseResult.error) };

      return { value: parseResult.data as unknown };
    };
  });
  fastify.setSerializerCompiler<z.ZodSchema>(({ schema, httpStatus }) => {
    return (data) => {
      const parseResult = schema.safeParse(data);

      if (!parseResult.success) throw fromZodError(parseResult.error);

      return JSON.stringify(parseResult.data);
    };
  });
};

export default fastifyPlugin(plugin);
