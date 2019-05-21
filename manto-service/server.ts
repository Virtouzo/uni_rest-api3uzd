import * as express from "express";
import Shop from "./shop/shop";
import shopAPI from "./shop/shopAPI";
import errorHandler from "./util/errHandler";

let app = express();

let shop = new Shop();
shop.add({ name: "Test1", price: 1 });
shop.remove(0);
shop.add({ name: "Very expensive item", price: 10 });
shop.add({ name: "Book", price: 3.5 });

app.use("/shop", shopAPI(shop));
app.use(errorHandler);

app.get("/", (req, res) => {
	res.send("Atsiskaitymas 1. API: localhost/shop");
});

app.listen(3001, function() {
	console.log("Server started!");
});
