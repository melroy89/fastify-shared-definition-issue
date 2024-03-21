'use strict'

module.exports = async function (fastify, opts) {

  // here we use the $ref to the shared internalServerErrorResponse definition schema
  fastify.get('/',
    {
      schema: {
        description: 'Root example',
        response: {
          200: {
            type: 'object',
            description: 'Root example',
            properties: {
              root: {
                type: 'boolean',
                description: 'Root example',
                example: false
              }
            }
          },
          500: {
            $ref: 'shared#/definitions/internalServerErrorResponse'
          }
        }
      }
    },
    async function (request, reply) {
      return { root: true }
  })
}
