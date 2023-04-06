import mongoose from "mongoose";

const assetsSchema = new mongoose.Schema({ url: String })
const priceSchema = new mongoose.Schema({ raw: Number, price_with_symbol: String })
const colorSchema = new mongoose.Schema({ color_name: String})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    permalink: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: [priceSchema],
        require: true,
    },
    color: {
        type: [colorSchema],
        default: []
    },
    image: {
        type: String,
        default: ""
    },
    assets: {
        type: [assetsSchema],
    },
    created: {
        type: Date,
        default: new Date()
    },
    quantity: {
        type: Number,
        default: 0
    },
})

const Products = mongoose.model('Products', productSchema)
export default Products