import Product from '../models/products.js'

export const createProduct = async(req, res)=>{
    try{
        const {name, permalink, category, description, price, color, image, assets} = req.body
        const product = await Product.create({name, permalink, category, description, price, color,  image, assets})

        res.status(201).json({
            status: "OK",
            message: "product created",
            product
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}



export const getProducts = async(req, res)=>{
    try{
        const { category, color, minimumPrice, maximumPrice, sortBy, sortDir } = req.query;
        let query = {};
        let sortQuery = {};

        if (category) {
            query.category = { $in: category.split(',')};
        }
        
        if (color) {
            query['color.color_name'] = { $in: color.split(',')};
        }

        if (minimumPrice && maximumPrice) {
            query['price.raw'] = { $gte: minimumPrice, $lte: maximumPrice };
          } else if (minimumPrice) {
            query['price.raw'] = { $gte: minimumPrice };
          } else if (maximumPrice) {
            query['price.raw'] = { $lte: maximumPrice };
          }

        switch (sortBy){
            case 'alphabetic':
                switch (sortDir) {
                    case 'desc':
                        sortQuery = { name: -1 };
                        break;
                    default:
                        sortQuery = { name: 1 };
                        break;
                }
            default:
                switch (sortDir) {
                    case 'desc':
                        sortQuery = { 'price.raw': -1 };
                        break;
                    default:
                        sortQuery = { 'price.raw': 1 };
                        break;
                }
        }
    
        const products = await Product.find(query).sort(sortQuery).select('-quantity')

        return res.json({
            status: "OK",
            message: "product find",
            products
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}



export const getProductByID = async(req, res)=>{
    try{
        const {productID} = req.params
        const product = await Product.findById(productID).select('-quantity')

        return res.status(201).json({
            status: "OK",
            message: "product find",
            product
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}