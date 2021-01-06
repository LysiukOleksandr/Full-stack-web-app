import * as mongoose from "mongoose";

module.exports = function() {

    mongoose.connect('mongodb+srv://oleksandr:oleksandr1@authapp.3wxyv.mongodb.net/oleksandr?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('MongoDB connected')
    })
}