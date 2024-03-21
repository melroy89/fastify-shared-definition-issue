# Reproducible repo for Fastify Shared Response schema

See code: `app.js` & `routes/root.js`

1. `npm install`
2. `npm run dev`
3. Go to: http://127.0.0.1:3000/docs
4. See error message appear in Swagger:

```sh
Resolver error at paths./.get.responses.500.content.application/json.schema.$ref
Could not resolve reference: Could not resolve pointer: /components/schemas/def-0/definitions/internalServerErrorResponse does not exist in document
```

(No errors appear in the console log)

Because Swagger is **NOT** built to use `definitions` via `addSchema` for response objects, instead Swagger is built to use `components` -> `responses` schemas for shared responses objects instead.

---

Swagger support `components` with `responses` this during OpenAPI spec definition (Fastify Swagger doesn't support this). Example ofa such an OpenAPI document:

```js
{
    openapi: '3.0.0',
    info: {
        title: 'Example...'
    },
    components: {
        responses: {
            internalServerErrorResponse: {
                description: "500 Internal Server Error",
                content: {
                    "application/json": {
                        "schema": {
                            "type": "object",
                        }
                    }
                }
            }
        }
    }
}
```

Such a component response object above could be used for reusability, if that was supported by Fastify Swagger.
