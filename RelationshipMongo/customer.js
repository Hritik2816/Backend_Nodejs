const mongoose = require('mongoose')
const { Schema } = mongoose;

main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  })

async function main() {
  mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}

const orderSchema = new Schema({
  item: String,
  price: Number
})

const customerSchema = new Schema({
  name: String,
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }]
})

const Order = mongoose.model("Order", orderSchema)

// const items = async () => {
//   const result = await Order.insertMany([
//     {
//       item: "samosa",
//       price: 10
//     },
//     {
//       item: "jalebi",
//       price: 20
//     },
//     {
//       item: "papdi",
//       price: 30
//     }
//   ])
//   console.log(result);

// }

const Customer = mongoose.model("Customer", customerSchema)

const addCustomer = async () => {
  let customer1 = new Customer({
    name: "hrk",
  })

  let order1 = await Order.findOne({ item: "jalebi" });
  let order2 = await Order.findOne({ item: "samosa" });

  customer1.orders.push(order1);
  customer1.orders.push(order2);

  const result = await customer1.save()
  console.log(result);
}

// items()
addCustomer()