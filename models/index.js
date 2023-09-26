const mongoose = require('mongoose');
const { Schema } = mongoose;
const DB = process.env.DB_NAME || 'test'

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
.catch(err => {
    console.log('connect failed');
    next(err);
})

const saladSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    weight: Number,
    ingredients: {
        type: Array,
        required: true
    },
    sauce: String,
    dietType: String,
    isSpicy: Boolean,
    expired: {
        type: Date,
        validate: {
            validator: (v) => {
                v > new Date();
            }
        },
        required: true
    }
})

const Salad = mongoose.model('Salad', saladSchema);

module.exports = {Salad};