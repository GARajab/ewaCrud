import { mongoose, model, Schema } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const schemeSchema = new mongoose.Schema({
  "Sch Ref": { type: String, require: true, unique: true },
  "Job no": { type: String, require: true },
  APPNUMBER: { type: String, require: true },
  BLK: { type: String, require: true },
  SUPERVISOR: { type: String, require: true },
  "Contractor Name": { type: String, require: true },
  Title1: { type: String, require: true },
  STATUS: { type: String, require: true },
  PERCENTAGE: { type: Number, require: true },
  "DATE OF COMPLETE": { type: Date, require: true },
  NUMBEROFSS: { type: Number, require: true },
  APPSTATUS: { type: String, require: true },
  DATEOFMEASUREMENT: { type: Date, require: true },
  CONTRACTORAPPRAISAL: { type: Number, require: true },
  AREA: { type: String, require: true },
  TYPE: { type: String, require: true },
})

schemeSchema.plugin(uniqueValidator)

const Scheme = mongoose.model("Scheme", schemeSchema)
export default Scheme
