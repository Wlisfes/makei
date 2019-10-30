import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    access_token: {
        type: String,
        required: true
    }
})