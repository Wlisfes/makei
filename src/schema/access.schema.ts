import * as mongoose from 'mongoose';
import * as moment from 'moment';

export const AccessSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    describe: {
        type: Boolean,
        default: true
    },
    menu: {
        type: Array,
        default: []
    },
    role: {
        type: Array,
        default: []
    },
    add_time: {
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
})