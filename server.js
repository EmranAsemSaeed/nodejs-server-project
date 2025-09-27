const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Handle API requests
    if (req.url === '/api/ping' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: 'pong', 
            timestamp: new Date().toISOString(),
            status: 'success'
        }));
        return;
    }
    
    // Serve main file
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }
    
    // Handle 404 - Page Not Found
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
        <head><title>404 - Page Not Found</title></head>
        <body style="text-align: center; padding: 50px; font-family: Arial;">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/">Return to Homepage</a>
        </body>
        </html>
    `);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});