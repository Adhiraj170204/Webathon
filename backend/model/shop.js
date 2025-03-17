import { Schema, model } from 'mongoose';

let shopSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    contact: { type: Number, required: true },
    products: {type: Schema.Types.ObjectId, ref: 'Product'}
})

export default model('Shop', shopSchema);