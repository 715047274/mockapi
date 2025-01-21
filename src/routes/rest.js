
export async function registerRestRoutes(fastify) {
    fastify.get('/ping', async (request, reply) => {
        reply.send({ message: 'pong' });
    });

    // Add more REST routes as needed
}
