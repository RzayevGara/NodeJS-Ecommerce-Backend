import Product from '../models/products.js'

export const createProduct = async(req, res)=>{
    try{
        let {name, permalink, category, description, price, color, image, assets} = req.body
        if(category){
            category = category.map(item=>item.toLowerCase());
        }
        if(color){
            color = color.map(c => ({ color_name: c.color_name.toLowerCase() }))
        }

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
            query.category = { $in: category.toLowerCase().split(',')};
        }
        
        if (color) {
            query['color.color_name'] = { $in: color.toLowerCase().split(',')};
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
            product
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}