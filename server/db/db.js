const mongoose = require('mongoose');

const connection = async () => {
    try {
        mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(e => {
                console.log('db successfully connected');
            }).catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connection;