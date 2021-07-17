const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB ga ulanish hosil b\'ldi');
    })
    .catch((err) => {
        console.error('Ulanishda xatolik bor', err);
    })


// find item find qty, status: A
const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
});

const inventoryScheme = new mongoose.Schema({
    item: String,
    qty: Number,
    size: SizeSchema,
    status: String
},
    { collection: 'inventory' });


const Inventory = mongoose.model("Inventory", inventoryScheme);


async function getInventoryitems1() {
    return await Inventory
        .find({ status: 'A' })
        .sort({ item: 1 })
        .select({ item: 1, qty: 1, _id: 0 })
}
async function getInventoryitems2() {
    return await Inventory
        .find()
        .or([{qty: {$lte: 50}},{item: /.*l.*/i}])
        .sort({ qty: -1 })
}

async function run(){
    const items = await getInventoryitems2();
    console.log(items);
}

run();
