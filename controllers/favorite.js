import Auth from '../models/auth.js'


export const getFavorite = async(req, res)=>{
    try{
        const userID = req.auth
        const user = await Auth.findById(userID).populate('favoriteProducts').select('favoriteProducts')

        res.status(201).json({
            status: "OK",
            user
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}


export const addFavorite = async(req, res)=>{
    try{
        const userID = req.auth
        const user = await Auth.findById(userID)

        if (user.favoriteProducts.includes(req.body.productId)) {
            return res.status(400).json({ message: 'This product already exists in favorites' });
        }

        user.favoriteProducts.push(req.body.productId);

        await user.save()

        const favorite = await Auth.findById(userID).populate('favoriteProducts').select('favoriteProducts')

        res.status(201).json({
            status: "OK",
            favorite
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}


export const deleteFavorite = async(req, res)=>{
    try{
        const userID = req.auth
        const productID = req.body.productId
        const user = await Auth.findById(userID);

        if (!user.favoriteProducts.includes(productID)) {
          return res.status(404).json({ message: 'Product not found in favorites' });
        }
      
        const filteredFavorite = user.favoriteProducts.filter(id =>id.toString() != productID.toString());
        console.log(filteredFavorite)

        user.favoriteProducts = filteredFavorite

        await user.save();

        const favorite = await Auth.findById(userID).populate('favoriteProducts').select('favoriteProducts')

        res.status(201).json({
            status: "OK",
            favorite
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}