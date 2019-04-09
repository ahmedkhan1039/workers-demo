var connect = require("connect");
var port = process.env.PORT;
var serveStatic = require("serve-static");
connect()
  .use(serveStatic(__dirname))
  .listen(port || 8080, function() {
    console.log(`Server running on ${port || 8080}...`);
  });
