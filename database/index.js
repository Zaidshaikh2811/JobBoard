const { default: mongoose } = require("mongoose")


const connectToDb = async () => {

    const connectionUrl = process.env.MONGODB_CONNECTIONURL

    mongoose.connect(connectionUrl).then(() => {
        console.log(" Database Connected");

    }).catch((err) => {
        console.log(err);
    })

}

export default connectToDb