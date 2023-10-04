import { Schema, model } from "mongoose";

const cartSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
   },
   productId: {
      type: Schema.Types.ObjectId,
      required: [true, "Product id is required"],
   },
   quantity: {
      type: Number,
      required: [true, "Quantity is required"],
   },
});

const Cart = model("cart", cartSchema);

export default Cart;
