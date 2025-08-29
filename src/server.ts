import http, {IncomingMessage, ServerResponse} from 'http'

//Create a Port that the Server will listen to
const PORT = 4000;


const requestListener = (req : IncomingMessage, res: ServerResponse) => {
   console.log(req.url, 'url');
  res.writeHead(200, {"content-type" : "application/json"});
  res.end(JSON.stringify({message : "Invalid Endpoint"}));
};
   
//Create a server
const server = http.createServer(requestListener)

//start listening to the  server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
