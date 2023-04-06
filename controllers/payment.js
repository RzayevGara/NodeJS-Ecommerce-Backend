import stripe from 'stripe'
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
import Auth from '../models/auth.js'
import Products from '../models/products.js'


export const checkout = (req, res)=>{
    const { amount, currency, paymentMethod, productId} = req.body;
    const userID = req.auth
    
    Products.find().where('_id').in(productId).exec()
    .then(async _=>{
        try{
          const paymentMethodCreate = await stripeInstance.paymentMethods.create(paymentMethod);
          const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method: paymentMethodCreate.id,
            confirmation_method: 'manual',
            confirm: true,
          });
          
          const user = await Auth.findById(userID);
          
          if (!user) {
            return res.status(404).send({ error: 'User not found' });
          }
          
          const order = {
            productId,
            amount: paymentIntent.amount,
          };
          
          user.orders.push(order);
          await user.save();
          
          res.status(200).json({ message: 'Payment succeeded!', user });

              }
                catch (error) {
                    res.status(400).send({error});
                }

        })
        .catch(err=>{
            return res.status(404).json({ error: 'Product not found' });
        })
}


export const getOrder= async(req, res)=>{
  try {
    const userID = req.auth
    const user = await Auth.findById(userID).populate({path: 'orders.productId', model: 'Products'}).select('orders')
          
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).json({user});

  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
} 