import { IncomingMessage, ServerResponse } from "http";
import { getItems, getItemById, addItem, updateItem, deleteItem } from "../controllers/item"; 


export const itemRoute = async (req : IncomingMessage , res : ServerResponse) => {
    if(req.url?.startsWith("/item")){
  
        //Split the URL
        const parts = req.url.split("/");
        
        //Get id using index
        const id = parts[2]? parseInt(parts[2]) : undefined

        
        //Returns all items(GET request)
        if(req.method === 'GET' && !id){
            res.writeHead(200, {"content-type" : "application/json"})
            res.end(JSON.stringify(getItems()))
            return;
        }

        //Returns a single item(GET request)
        if(req.method === 'GET' && id){
            if(isNaN(id)){
                res.writeHead(400, {"content-type" : "application/json"});
                res.end(JSON.stringify({ error : "Invalid item id"}));
                return;
            }
            const item = getItemById(id);

            if(!item){
                res.writeHead(404, {"content-type" : "application/json"});
                res.end(JSON.stringify({ error : "Item not found"}));
                return;
            }
            res.writeHead(200, {"content-type" : "applocation/json"})
            res.end(JSON.stringify(item));
            return;
        }

        
        //POST request (adding an item)
        if(req.method === "POST"){
            let body = ""
            req.on('data', (chunk) => {
                body += chunk.toString();
                console.log(body, 'body');
            });

            
            req.on('end', () => {
                try {
                    const {name, quantity, purchasedStatus} = JSON.parse(body);
                    if(!name || typeof name !== "string"){
                        res.writeHead(400, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Item Name not found"}))
                    }

                    if(!quantity || typeof quantity !== "number"){
                        res.writeHead(400, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Item quantity is required"}));
                    }

                    if(typeof purchasedStatus !== "boolean"){
                        res.writeHead(400, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Purchase status of item is required"}));
                    }

                    const newItem = addItem(name, quantity, purchasedStatus)
                    res.writeHead(201, {"content-type" : "application/json"});
                    res.end(JSON.stringify(newItem));

                } catch (error) {
                    res.writeHead(400, {"content-type" : "application/json"});
                    res.end(JSON.stringify({ error : "Invalid JSON payload"}));
                }
            });
            return;
        }

        //PUT request(updating an item)
        if(req.method === "PUT" && id){
            if(isNaN(id)){
                res.writeHead(400, {"content-type" : "application/json"});
                res.end(JSON.stringify({ error : "Invalid item id"}));
                return;
            }

            let body = ""
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const {name, quantity, purchasedStatus} = JSON.parse(body);
                    
                    if(!name || typeof name !== "string"){
                        res.writeHead(400, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Item Name is required and must be a string"}));
                        return;
                    }

                    if(!quantity || typeof quantity !== "number"){
                        res.writeHead(400, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Item quantity is required and must be a number"}));
                        return;
                    }

                    if(typeof purchasedStatus !== "boolean"){
                        res.writeHead(400, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Purchase status is required and must be a boolean"}));
                        return;
                    }

                    const updatedItem = updateItem(id, name, quantity, purchasedStatus);
                    if(!updatedItem){
                        res.writeHead(404, {"content-type" : "application/json"});
                        res.end(JSON.stringify({ error : "Item not found"}));
                        return;
                    }

                    res.writeHead(200, {"content-type" : "application/json"});
                    res.end(JSON.stringify(updatedItem));

                } catch (error) {
                    res.writeHead(400, {"content-type" : "application/json"});
                    res.end(JSON.stringify({ error : "Invalid JSON payload"}));
                }
            });
            return;
        }

        //DELETE request(deleting an item)
        if(req.method === "DELETE" && id){
            if(isNaN(id)){
                res.writeHead(400, {"content-type" : "application/json"});
                res.end(JSON.stringify({ error : "Invalid item id"}));
                return;
            }

            const deleted = deleteItem(id);
            if(!deleted){
                res.writeHead(404, {"content-type" : "application/json"});
                res.end(JSON.stringify({ error : "Item not found"}));
                return;
            }

            res.writeHead(200, {"content-type" : "application/json"});
            res.end(JSON.stringify({ message : "Item deleted successfully"}));
            return;
        }

                    res.writeHead(405, {"content-type" : "application/json"});
                    res.end(JSON.stringify({ error : "Method not allowed on /item endpoint"}));
    }

    
};