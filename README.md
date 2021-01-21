# How to run

```bash
npm i
npm run dev

# in separate terminal
npm run client
```

# Error

```
Error: WebSocket is not open: readyState 2 (CLOSING)
    at WebSocket.send (/*path to the project*//node_modules/@marblejs/websockets/node_modules/ws/lib/websocket.js:322:19)
    at WebSocket.sendResponse (/*path to the project*//node_modules/@marblejs/websockets/dist/response/websocket.response.handler.js:7:12)
    at SafeSubscriber.input$.pipe.subscribe.type [as _next] (/*path to the project*//node_modules/@marblejs/websockets/dist/server/websocket.server.listener.js:64:42)
    at SafeSubscriber.__tryOrUnsub (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:265:10)
    at SafeSubscriber.next (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:207:14)
    at Subscriber._next (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:139:22)
    at Subscriber.next (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:99:12)
    at TakeUntilSubscriber.Subscriber._next (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:139:22)
    at TakeUntilSubscriber.Subscriber.next (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:99:12)
    at CatchSubscriber.Subscriber._next (/*path to the project*//node_modules/rxjs/src/internal/Subscriber.ts:139:22)
```
