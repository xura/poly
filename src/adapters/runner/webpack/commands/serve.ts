import handler from 'serve-handler'
import http from 'http';

const server = http.createServer((request, response) =>
    handler(request, response, {
        public: process.argv[2]
    })
)

server.listen(process.argv[3]);