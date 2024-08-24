const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/task')
        .then(() => console.log('Connected!'))
        .catch(error => console.log(error));
    } catch (err) {
        console.log(err)
    }
}

module.exports = db;