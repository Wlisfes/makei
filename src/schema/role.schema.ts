import * as mongoose from 'mongoose';
import * as moment from 'moment';

export const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    describe: {
        type: Boolean,
        default: true
    },
    add_time: {
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
})