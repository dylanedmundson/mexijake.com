//router for ShopItem CRUD operations
const router = require('express').Router();
let ShopItem = require('../models/shopItem.model');

// route to add a new shopping item to db
router.route('/add').post((req, res) => {
    const newShopItem = new ShopItem({
        images: req.body.images,
        name: req.body.name,
        price: req.body.price,
        sizes: req.body.sizes,
        description: req.body.description
    });

    newShopItem.save()
        .then(() => res.send(newShopItem))
        .catch(err => res.status(400).json('Error: ' + err))
});

//route to get all shopping items
router.route('/').get((_, res) => {
    ShopItem.find()
        .then(shopItems => res.json(shopItems))
        .catch(err => res.status(400).json('Error: ' + err));
});

//route to get shopping item by id
router.route('/:id').get((req, res) => {
    ShopItem.findById(req.params.id)
        .then(shopItem => res.json(shopItem))
        .catch(err => res.status(400).json('Error: ' + err));
})

//route to delete shopping item by id
router.route('/:id').delete((req, res) => {
    ShopItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Todo deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})


//export router
module.exports = router;