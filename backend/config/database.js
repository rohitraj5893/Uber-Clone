const mongoose = require('mongoose');


const connectToDB = () => {
    try{
        mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('Connected to DB'))
        .catch(() => console.log('Not Connected to DB'));

    }
    catch(err){
        console.log("Error occurs in DB connection")
        console.error(err);
    }
}

module.exports = connectToDB;