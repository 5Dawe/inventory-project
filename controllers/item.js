const Item = require("../models/Item");


exports.lists = async (req, res) => {
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;

    try {
        const items = await Item.find({}).skip((perPage * page) - perPage).limit(limit);
        const count = await Item.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);

        res.render("items", {
            items: items,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
    } catch (e) {
        res.status(404).send({message: "Could not find item"})
    }
}


exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        await Item.findByIdAndDelete(id);
        res.redirect("/items");
    } catch (error) {
        res.status(404).send({message: "Could not delete item"})
    }
}


exports.edit = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const item = await Item.findById(id);
        res.render('update-item', {item: item, id: id, errors: {} });
    } catch (error) {
        res.status(404).send({message: "Could not find item"})
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        await Item.updateOne({_id: id}, req.body);
        const item = await Item.findById(id);

        res.redirect(`/items/?message= ${item._id} has been updated`);
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            return res.render('update-item', {errors: e.errors });
        }
    res.status(404).send({message: `Could not update item: ${id}.`})
    
    }
}

exports.create = async (req, res) => {
    console.log(req);

    try {
        const item = new Item({ 
            make: req.body.make, 
            model: req.body.model, 
            asset: req.body.asset, 
            serial: req.body.serial, 
            description: req.body.description, 
            location: req.body.location,
            building: req.body.building, 
            status: req.body.status
        });
        await item.save();
        res.redirect('/items/?message=item has been created')
        return;
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-item', {errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}
