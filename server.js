const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Create correct path to index.html
    const filePath = path.join(__dirname, 'index.html');
    
    // Read file asynchronously
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
            return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});