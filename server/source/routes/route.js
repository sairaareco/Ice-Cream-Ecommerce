const {Router} = require("express");
const createIceCream = require("../controllers/createIceCream");
const getIceCreamAll = require("../controllers/getIceCreamAll");
const iceCreamDetail = require("../controllers/iceCreamDetail");
const createNewUser = require("../controllers/createNewUser");
const createShopCart = require("../controllers/createShopCart");
const deleteShopCart = require("../controllers/deleteShopCart");
const createPurchase = require("../controllers/createPurchase");
const deletePurchase = require("../controllers/deletePurchase");
const createReview = require("../controllers/createReview");
const deleteIceCream = require("../controllers/deleteIceCream");
const login = require("../controllers/login");
const searchIceCream = require("../controllers/searchIceCream");
const getIceCreamType = require("../controllers/getIceCreamType");
const { json } = require("sequelize");

const router = Router();

// CREAR UN HELADO 
router.post("/icecream", async (req, res) => {
    const { name, flavors, description, protein, calories, totalFat, price, imageUrlHome, imageUrl, category } = req.body;
    if (!name || !flavors || !description || !protein || !calories || !totalFat || !price || !imageUrlHome || !imageUrl || !category ) {
        return res.status(400).json({ message: "Faltan datos" });
    }
try {   
    const newIceCream = await createIceCream(name, flavors, description, protein, calories, totalFat, price, imageUrlHome, imageUrl, category);
    res.status(200).json(newIceCream);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// ELIMINAR UN HELADO
router.delete("/icecream/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIceCream = await deleteIceCream(id);
        res.status(200).json({ message: "Ice cream successfully removed."});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// OBTENER TODOS LOS HELADOS 
router.get("/icecream", async (req, res)=> {
try {
    const iceCreams = await getIceCreamAll();
    res.status(200).json(iceCreams);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// OBTENER EL DETALLE DE UN HELADO POR SU NOMBRE - SUJETO A MEJORAS 
router.get("/icecream/:name", async (req, res)=> {
try {
    const name = decodeURIComponent(req.params.name);
    // const {name} = decodeURIComponent(req.params);
    const detailIceCream = await iceCreamDetail({name});
    res.status(200).json(detailIceCream);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// BUSCAR HELADO POR NOMBRE / SABOR 
router.get("/search", async (req, res) => {
    const searchTerm = req.query.searchTerm; 
    console.log(req.query.searchTerm);
    try {
        const searching = await searchIceCream(searchTerm);
        res.status(200).json(searching);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// OBTENER HELADO SEGUN SU TIPO ( cono - palito - batido )
router.get("/icecream/category/:category", async (req, res) => {
    const {category} = req.params;
    console.log(category);
    try {
        const iceCreams = await getIceCreamType({category});
        res.status(200).json(iceCreams)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// CREAR UN NUEVO USUARIO 
router.post("/user/:shoppingCartId", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { shoppingCartId } = req.params;
        const newClientCreated = await createNewUser(email, password, shoppingCartId);
        res.status(200).json(newClientCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// INICIA SESION CON UN USUARIO YA REGISTRADO 
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(req.body);
//         const loginUser = await login(email, password);
//         res.status(200).json({message: "User logged in successfully"});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// CREAR UN CARRITO DE COMPRAS 
router.post("/shoppingCart", async (req, res) => {
    try {
        const {iceCreamNames, iceCreamQuantities, iceCreamPrices, totalPrice} = req.body;
        const result = await createShopCart({iceCreamNames, iceCreamQuantities, iceCreamPrices, totalPrice})
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ELIMINAR UN CARRITO DE COMPRAS 
router.delete("/shoppingCart/:shoppingCartId", async (req, res) => {
try {
    const { shoppingCartId } = req.params;
    const deleteShoppingCart = await deleteShopCart(shoppingCartId);
    res.status(200).json({ message: "Shopping Cart removed successfully" });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// CREAR UN PEDIDO 
router.post('/payment/:userId', async (req, res) => {
    try {
        const { email, paymentMethod, cardHolderName, cardNumber, expirationDate, 
            cvv, name, street, number, zipCode } = req.body;
            const userId = req.params.userId;
        const purchase = await createPurchase(
            email,
            paymentMethod,
            cardNumber,
            cardHolderName,
            expirationDate,
            cvv, 
            name, 
            street, 
            number, 
            zipCode,
            userId
    );
        res.status(200).json({purchase});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ELIMINAR UN PEDIDO 
router.delete("/purchase/:purchaseId", async (req, res)=> {
    try {
        const { purchaseId } = req.params;
        const removePurchase = await deletePurchase(purchaseId);
        res.status(200).json({ message: "Order removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// HACER UNA VALORACION 
router.post("/review/:iceCreamId", async (req, res) => {
    try {
        const { iceCreamId } = req.params;
        const { rating } = req.body;
        console.log(req.params);
        const newReview = await createReview(iceCreamId, rating);
        res.status(200).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;


