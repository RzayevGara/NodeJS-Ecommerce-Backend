import Cart from '../models/cart.js'
import Products from '../models/products.js'

export const addToCart = async(req, res)=>{
    try{
        const {id} = req.body
        const ip = req.ip
        let totalQuantity = 0;
        let subtotal = 0

        let cart = await Cart.findOne({ ip })

        if (!cart) {
            cart = new Cart({ ip });
        }

        let product = await Products.findById(id).exec()

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        let uniqueProduct = cart.items.some(item=>item._id.toString() === id)
        
        if(!uniqueProduct){
            product.quantity = 1
            cart.items.push(product);
        }else{
            cart.items.find(item=>{
                if(item._id.toString() === id){
                    item.quantity += 1
                }
            })
        }

        cart.items.map(item=>{
            totalQuantity += item.quantity
            subtotal += item.quantity * item.price[0].raw
        })

        cart.total_items = totalQuantity
        cart.total_unique_items = cart.items.length

        cart.subtotal[0].raw = subtotal
        cart.subtotal[0].price_with_symbol = `${subtotal} AZN`

        cart.markModified("items")
        await cart.save()
        res.status(201).json({
            status: "OK",
            message: "product added successfully",
            cart
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}


export const deleteFromCart = async(req, res)=>{
    try{
        const {id} = req.body
        const ip = req.ip
        let totalQuantity = 0;
        let subtotal = 0

        let cart = await Cart.findOne({ ip })

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let product = await Products.findById(id).exec()

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let filteredCart = cart.items.filter(item=>item._id.toString() !== id)
        
        cart.items = filteredCart

        if(cart.items.length>0){
            cart.items.map(item=>{
                totalQuantity += item.quantity
                subtotal += item.quantity * item.price[0].raw
            })
        }


        cart.total_items = totalQuantity
        cart.total_unique_items = cart.items.length

        cart.subtotal[0].raw = subtotal
        cart.subtotal[0].price_with_symbol = `${subtotal} AZN`

        cart.markModified("items")
        await cart.save()
        res.status(201).json({
            status: "OK",
            message: "product deleted successfully",
            cart
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}



export const getCart = async(req, res)=>{
    try{
        const ip = req.ip;
        let totalQuantity = 0;
        let subtotal = 0

        let cart = await Cart.findOne({ ip }).exec();
        if (!cart) {
          cart = new Cart({ ip });
        }

        cart.items.map(item=>{
            totalQuantity += item.quantity
            subtotal += item.quantity * item.price[0].raw
        })

        cart.total_items = totalQuantity
        cart.total_unique_items = cart.items.length

        cart.subtotal[0].raw = subtotal
        cart.subtotal[0].price_with_symbol = `${subtotal} AZN`

        res.status(201).json({
            status: "OK",
            message: "product added successfully",
            cart
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}