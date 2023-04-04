import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema({
    userID: { type: String, required: true},
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'Products'}
});

const Favorite = mongoose.model('Favorite', FavoriteSchema)

export default Favorite