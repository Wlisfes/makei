import * as mongoose from 'mongoose';
import * as moment from 'moment';

export const AdminSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    Avatar: {
        type: String,
        required: true,
        default: `/upload/avatar/1572273526598.png`
    },
    Email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v)
            }
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    add_time: {
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
})


