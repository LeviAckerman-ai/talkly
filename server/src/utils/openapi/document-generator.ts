import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { healthCheckRegistry } from '@/routes/health-check.route';
import { userRegistry } from '@/routes/user.route';

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3['generateDocument']>;

export function generateOpenAPIDocument(): OpenAPIDocument {
  const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry]);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Scalar API',
    },
  });
}
