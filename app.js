const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req?.url === "/apply") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message" value="Hello!"/>
            <button type="submit">Send</button>
          </form>
        </body>
      </html>`
    );
    return res.end();
  }
  if (req?.url === "/message" && req?.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const message = Buffer.concat(body).toString();
      const textMsg = message?.split("=")?.[1];
      fs.writeFileSync("database.txt", textMsg);
      res.statusCode = 302;

      res.setHeader("Content-Type", "text/html");
      res.write(`<html>
    <body>
      <span>Received Data: ${textMsg}</span>
    </body>
  </html>`);
      res.end();
    }); 
  }
});
server.listen(5000);
