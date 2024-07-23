import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session   =>  /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;

    // Cart Items
    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: item?.price * 100, // Use cents in Stripe
        },
        tax_rates: ["txr_1PfYYjCI0mWjc76djVcsQ3AK"],
        quantity: item?.quantity,
      };
    });

    const shippingInfo = body?.shippingInfo;

    const shipping_rate =
      body?.itemsPrice >= 100
        ? "shr_1PfYQzCI0mWjc76djPOONI7G"
        : "shr_1PfYRoCI0mWjc76dptPB9YsJ";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });

    console.log(session);

    res.status(200).json({
      url: session.url,
    });
  }
);