const dotenv = require("dotenv");


dotenv.config();


console.log(process.env.JWT_SECRET);


const connectDB = require("./src/config/db");

const app = require("./src/app");



const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
