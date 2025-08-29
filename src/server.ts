import http, {IncomingMessage, ServerResponse} from 'http'
import { itemRoute } from './routes/item';

//Create a Port that the Server will listen to
const PORT = 4000;


const requestListener = (req : IncomingMessage, res: ServerResponse) => {
   console.log(req.url, 'url');
  
    if(req.url?.startsWith("/item"))
    {
        itemRoute(req,res)
    }else{
        res.writeHead(200, {"content-type" : "application/json"});
        res.end(JSON.stringify({message:"Invalid url!!!"}))
    }

};

//Create a server
const server = http.createServer(requestListener)

//start listening to the  server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
