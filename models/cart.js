import mongoose from "mongoose";
const priceSchema = new mongoose.Schema({ raw: Number, price_with_symbol: String })

const CartSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  items: {
    type: Array,
    default: [],
  },
  total_items: {
    type: Number,
    default: 0
  },
  total_unique_items: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: [priceSchema],
    default: [
      {
        raw: 0,
        price_with_symbol: ""
      }
    ]
  },
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart
