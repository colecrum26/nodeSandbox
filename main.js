const http = require("http");
const PORT = 5001; // || "someURL";

http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    response.setHeader("content-type", "text/html");
    console.log(`request method used: ${method}`);
    // response.writeHead(200, { "content-type": "text/html" });
    // response.write("hello this request worked");
    const dataChunks = [];
    request.on("data", (chunk) => {
      console.log(`chunk is: ${chunk}`);
      dataChunks.push(chunk);
    });
    request.on("end", () => {
      if ((method = "POST")) {
        const body = JSON.parse(Buffer.concat(dataChunks).toString());
        const responseBody = { method, url, body };
      }
      if (url == "/yourPage") {
        response.write("<h2>Welcome to your own homepage</h2>");
        response.statusCode = 202;
      } else {
        response.write("<h1> PAGE NOT FOUND </h1>");
        response.statusCode = 404;
      }
      response.end();
    });

    if (url == "/") {
      response.write("<h1>WELCOME</h1>");
      response.statusCode = 200;
      response.end();
    } else if (url == "/about") {
      response.write("<p>Yo What Up</p>");
      response.statusCode = 200;
      response.end();
    }
  })
  .listen(PORT, () => {
    console.log(`server is listening at local host ${PORT} port`);
  });
