let http = require('http')
let fs = require('fs')
let url = require('url')
let port = 6969

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => { // reads html file and makes function that either returns error or data.
    if (err) throw err;
    return data; //returns content of 404.html
  });  
const server = http.createServer(function(req, res) {
    let q = url.parse(req.url, true) //parses url
    let filename = q.pathname === "/" ? "./index.html" : `.${q.pathname}.html`
    if (q.pathname === "/about") { // if filename is about, show about
        filename = "./about.html";
    }
    if(q.pathname === "/contact") {
        filename = "./contact-me.html"
    }

    fs.readFile(filename, function (err, data) { //then we just read the file
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(page404);
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
}).listen(port)