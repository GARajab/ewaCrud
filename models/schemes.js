import { mongoose, model, Schema } from "mongoose"

const schemeSchema = new mongoose.Schema({
  "Sch Ref": { type: String },
  "Job no": { type: String },
  APPNUMBER: { type: String },
  BLK: { type: String },
  SUPERVISOR: { type: String },
  "Contractor Name": { type: String },
  Title1: { type: String },
  STATUS: { type: String },
  PERCENTAGE: { type: Double },
  "DATE OF COMPLETE": { type: Dater },
  NUMBEROFSS: { type: Duble },
  APPSTATUS: { type: String },
  DATEOFMEASUREMENT: { type: Date },
  CONTRACTORAPPRAISAL: { type: Double },
  AREA: { type: String },
  TYPE: { type: String },
})
