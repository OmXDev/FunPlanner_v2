import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  // date:{type:Date,default:Date.now},
  content:String,
  // category:{type:String,enum:['Priority','Info','Success'],default:'Info'}
})

const fileSchema = new mongoose.Schema({
  name:{type:String},
  event:String,
  size:String,
  type:{type:String,enum:['contract','media','financial','legal','hr'],required:true},
  subCategory:String,
  url:String,
  uploadedAt:{type:Date,default:Date.now}
})

const communicationSchema = new mongoose.Schema({
  subject: String,
  participants: [String],
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['email', 'meeting', 'call'], default: 'email' }
})

const eventSchema = new mongoose.Schema({
   name: String,
  date: Date,
  budget: Number,
  attendees: Number,
  status: { type: String, enum: ['upcoming', 'completed', 'ongoing'] }
})

const preferencesSchema = new mongoose.Schema({
  eventStyles: [String],
  preferredVenues: [String],
  dietaryRequirements: [String],
  specialRequirements: [String]
})

const financialSchema = new mongoose.Schema({
  totalSpend: Number,
  outstanding: Number
})

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: {type: String,required: true},
  phone: {type: String,required: true },
  address: {
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  notes:{type:String},
  accountManager: {type: String },
  clientSince: {type: Date,default: Date.now,required: true },
  clientType:{
    type:String,
    enum:['individual','non-profit','corporate','government'],
    default:'individual'
  },
  tags: [String],
  avatar: String,
  status: {
    type: String,
    enum: ['active', 'pending', 'flagged', 'blocked'],
    default: 'pending',
  },
  organizationName:{
    type:String
  },
  events: [eventSchema],
  preferences: preferencesSchema,
  files: [fileSchema],
  // notes: [noteSchema],
  communicationLog: [communicationSchema],
  financialOverview: [financialSchema]
}, {
  timestamps: true
}
);

export default mongoose.model('Client', clientSchema);
