const express = require("express");
const PORT = process.env.PORT || 5501;
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('uploads'))

// routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/product', productRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});