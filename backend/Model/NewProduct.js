import mongoose from "mongoose";

const NewProductSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  CreatedAt: {
    type: Date,
    default: new Date(),
  },
});
const NewProductModel = mongoose.model("NewProduct", NewProductSchema);
export default NewProductModel;
