const http = require("http");
const fs = require("fs");
http
    .createServer((req, res) => {
        const {method,url} = req;
        if (method == "GET" && url == "/") {
            fs.readFile("./index.html", (err, data) => {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            });
        } else if ((method == "GET" || method == "POST") && url == "/users") {
            cros(res);
            res.end(JSON.stringify([{
                name: "tom",
                age: 20
            }]));
        } else if (method == "OPTIONS" && url == "/users") {
            cros(res);
            res.end();
        }
    })
    .listen(3000);

function cros(res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    res.setHeader("Access-Control-Allow-Headers", 'X-Token,Content-Type');

    res.setHeader("Set-Cookie","cookieval=val2222;")
    res.setHeader("Access-Control-Allow-Credentials", 'true');
}
