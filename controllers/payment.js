import stripe from 'stripe'
const stripeInstance = stripe('sk_test_51KzJJfIg2uXdi1sJen93b75sKg2Wi0mGhlXdMv3BVWnt8jFeHYiJBe85menvhmDUq47tdtHHKziDeylO2xrfsjOc00fjmlWWWY');
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
          
          res.status(200).send({ message: 'Payment succeeded!', user });

              }
                catch (error) {
                    res.status(400).send({error});
                }

        })
        .catch(err=>{
            return res.status(404).send({ error: 'Product not found' });
        })
        

}