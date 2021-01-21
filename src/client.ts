import WebSocket from 'ws';

const clientA = new WebSocket('ws://localhost:4001');
const clientB = new WebSocket('ws://localhost:4001');

const open = (w: WebSocket) =>
    new Promise((resolve, reject) => {
        w.on('open', resolve);
        w.on('error', reject);
    });

const wait = (n: number) => new Promise(resolve => setTimeout(resolve, n));

clientA.on('message', e => console.log('clientA:', JSON.parse(e.toString())));
clientB.on('message', e => console.log('clientB:', JSON.parse(e.toString())));

run().catch(console.error);

async function run() {
    await Promise.all([open(clientA), open(clientB)]);

    clientA.send(JSON.stringify({ type: 'JOIN' }));
    clientB.send(JSON.stringify({ type: 'JOIN' }));

    await wait(100);

    clientA.send(JSON.stringify({ type: 'POST', payload: 'foo' }));
    await wait(100);
    clientB.send(JSON.stringify({ type: 'POST', payload: 'bar' }));

    await wait(100);

    clientA.close();
    clientB.close();
}
