const fs = require("fs");

const reqHandler = (req, res) => {
  if (req?.url === "/apply") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
      <head><link rel="shortcut icon" href="#"></head>
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
    return req.on("end", () => {
      const message = Buffer.concat(body).toString();
      const textMsg = message?.split("=")?.[1];
      fs.writeFile("database.txt", textMsg, (err) => {
        res.statusCode = 302;
        res.setHeader("Content-Type", "text/html");
        res.write(`
        <html>
          <head><link rel="shortcut icon" href="#"></head>
          <body>
            <span>Received Data: ${textMsg}</span>
          </body>
        </html>`);
        return res.end();
      });
    });
  }
};

module.exports = {
  handler: reqHandler,
};
