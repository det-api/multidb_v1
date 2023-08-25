import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import connectDbs from '../utils/connect';

const controlDb = connectDbs("controlDbUrl");


export interface permitDocument extends mongoose.Document {
    name : string
}

const permitSchema = new Schema({
    name : {type : String , required : true , unique : true}
})

const PermitModel = controlDb.model <permitDocument> ('permit' , permitSchema);
export default PermitModel