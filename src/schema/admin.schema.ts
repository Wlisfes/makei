import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: [true, 'nickName不能为空！'],
    },
    userName: {
        type: String,
        required: [true, 'userName不能为空！']
    },
    password: {
        type: String,
        required: [true, 'password不能为空！'],
        min: [6, 'password不能小于6位！'],
        max: [16, 'password不能大于16位！']
    },
    Avatar: {
        type: String,
        required: [true, 'Avatar不能为空！']
    },
    Email: {
        type: String,
        required: [true, 'Email不能为空！'],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v)
            },
            message: 'Email格式不正确！'
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    add_time: {
        type: Number,
        default: Date.now
    }
})


