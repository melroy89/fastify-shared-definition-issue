'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Register Swagger and Swagger UI
  // Trigger OpenAPI v3 spec
  await fastify.register(require('@fastify/swagger'), {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ]
    }
  })
  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs'
  })

  // Register shared generic intenral server response schema
  await fastify.addSchema({
    $id: 'shared',
    type: 'object',
    definitions: {
      internalServerErrorResponse: {
        type: 'object',
        description: '500 Internal Server Error',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Some internal error message'
          }
        }
      }
    }
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
