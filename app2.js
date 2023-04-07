const { createServer } = require('http');
const { appendFile, readFile, createReadStream, read } = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const PORT = 5001;

const MovieRecc = new EventEmitter();

const server = createServer((req, res) => {
    const { url, method } = req

    req.on('error', (err) => {
        console.error(err);
        resStatusCode = 404;
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify({ msg: 'Invalid request: 404' }));
        res.end();
    })

    const chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
        console.log(chunks);
    })
    req.on('end', () => {
        if (url === '/movie_likes' && method === 'POST'){
            const body = JSON.parse(Buffer.concat(chunks).toString());
            const newMovie = `${body.username}, ${body.movie}\n`;
            MovieRecc.emit('new movie!', newMovie, res);
            res.setHeader('content-type', 'application/json');
            res.write(
                JSON.stringify({ msg: 'Successfully added movie!' })
            );
            res.end();
        } else if (url === '/movie_likes' && method === 'GET'){
            res.setHeader('content-type', 'text/html');
            const readStream = createReadStream(
                path.join(__dirname, './public/index.html')
            )
            readStream.pipe(res);
        } else {
            res.statusCode = 400;
            res.setHeader('content-type', 'application/json');
            res.write(JSON.stringify({ msg: 'Not a valid endpoint.'}))
            res.end();
        }
    })
})
server.listen(PORT, () => console.log(`Server listening at ${PORT}`));