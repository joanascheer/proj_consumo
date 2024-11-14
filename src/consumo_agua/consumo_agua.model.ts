import mongoose, * as Mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    quantityConsumed: { type: Number, required: true },
    date: { type: Date, required: true }
});

export interface User extends mongoose.Document {
    id: string;
    userId: string;
    name: string;
    quantityConsumed: number;
    date: Date;
}