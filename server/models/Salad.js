const mongoose = require('mongoose');
const { Schema } = mongoose;

const saladSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    weight: Number,
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    sauce: String,
    dietType: String,
    isSpicy: Boolean,
    expired: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => v > new Date()
        }
    },
    images: Array
});

const Salad = mongoose.model('Salad', saladSchema);

module.exports = Salad;