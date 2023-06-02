const asyncHandler = require('express-async-handler')

const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY)


const createCheckoutSession = asyncHandler(async (req, res) =>{
    //console.log(req.body.cartItems)
    const success_url = req.body.success_url ? req.body.success_url : "https://www.google.com"
    const cancel_url = req.body.cancel_url ? req.body.cancel_url : "https://www.facebook.com"

    const line_items = req.body.cartItems.map(product => {
        return {
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: product.productName,
                    description: product.description,
                    metadata:{
                        id: product._id
                    }
                },
                unit_amount: product.price * 100,
            },
            
            quantity: product.quantity,

        }
    })
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: success_url,
        cancel_url: cancel_url,
    });

    res.send({
        url: session.url,
        product: req.product
    } );
  
})

module.exports = {createCheckoutSession}