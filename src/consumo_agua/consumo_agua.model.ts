import mongoose, * as Mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    quantityConsumed: {type: String, required: true},
    date: {type: String, required: true} 
});

export interface User extends mongoose.Document {
    id: String,
    name: String,
    quantityConsumed: String,
    date: String
}
