const itemModel = require("../models/item.model");

async function AddItems(req, res) {
    try {
        const { id, name, qty, unit_price, description } = req.body;

        if (!name || !unit_price) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        let inStock = true;

        if (!qty) {
            inStock = false
        }

        const dbRes = await itemModel.create({
            id,
            name,
            qty,
            unit_price,
            description,
            inStock,
        });
        console.log(dbRes);
        return res.json({ msg: "Item Added Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server side Error Occured" });
    }
}

async function EditItems(req, res) {
    const {id, name, unit_price, description } = req.body;
  
    try {
      const EditedItem = await itemModel.findOneAndUpdate({id}, { name, unit_price, description }, { new: true });
      return res.json({ msg: "Item Edited successfully", EditedItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server side Error Occured" });
    }
  }

async function RemoveItems(req, res) {
    const { id } = req.params;

    try {
        // Find the item by its name and delete it
        const deletedItem = await itemModel.findOneAndDelete({ id });

        if (!deletedItem) {
            return res.status(404).json({ msg: "Item not found" });
        }

        return res.json({ msg: "Item deleted successfully", deletedItem });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server side error occurred" });
    }
}


async function ViewStocks(req, res) {
    const {id} = req.params;
    
    const Item = await itemModel.findOne({id});

    if (!Item) {
        return res.status(404).json({ msg: "Item not found" });
    }
    return res.json({ msg: "Item Found successfully", Item });

}

async function AddStocks(req, res) {
    const {id, qty} = req.body;

    try {
        const AddedStocks = await itemModel.findOneAndUpdate({id}, { $inc: { qty: qty } }, { new: true });

        if (AddedStocks.qty > 0) {
            AddedStocks.inStock = true
        }else{
            AddedStocks.inStock = false
        }

        if (!AddedStocks) {
            return res.status(404).json({msg : "Item not found"});
        }

        return res.json({ msg: "Stock Added successfully", AddedStocks });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server side Error Occured" });
      }
}

async function ReleaseStocks(req, res) {
    const { id, qty } = req.body;

    try {
        const item = await itemModel.findOne({id});

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        if (item.qty < qty) {
            return res.status(400).json({ msg: "Not enough stocks available" });
        }

        item.qty -= qty;

        if(!item.qty){
            item.inStock = false    
        }else{
            item.inStock = true
        }

        await item.save();

        return res.json({ msg: "Stocks released successfully", item });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server side Error Occurred" });
    }
}


module.exports = { AddItems, RemoveItems, EditItems, ViewStocks, AddStocks, ReleaseStocks}