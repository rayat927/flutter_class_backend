const express = require("express");
const PORT = process.env.PORT || 5500;
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(express.static('uploads'))

// routes


app.use('/duck', duckRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });