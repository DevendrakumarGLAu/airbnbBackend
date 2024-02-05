const mongoose = require('mongoose');
const dbconfig = {
    mongoURL : process.env.MongoDB_URL

};
const connectDB = async ()=>{
    try {
        await mongoose.connect(dbconfig.mongoURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connect with MongoDB")
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
      }
};
module.exports = connectDB;

