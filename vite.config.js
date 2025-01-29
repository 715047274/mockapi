import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        open: true, // Automatically opens the app in the browser
    },
    plugins: [
        {
            name: 'graphql-schema-watcher',
            handleHotUpdate({ file, server }) {
                if (file.endsWith('.js') || file.endsWith('.graphql')) {
                    console.log('GraphQL schema changed, refreshing...');
                    server.ws.send({ type: 'full-reload' });
                }
            },
        },
    ],
});
