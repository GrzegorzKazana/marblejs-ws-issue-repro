import { createWebSocketServer } from '@marblejs/websockets';

import listener from './app';

const APP_PORT = 4001;

const initWebsocketServer = createWebSocketServer({
    listener,
    options: {
        port: APP_PORT,
    },
});

initWebsocketServer
    .then(server => server())
    .then(() => console.log(`Server running on port ${APP_PORT}`))
    .catch(() => console.log('Failed to initialize server'));
