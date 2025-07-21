import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [ 'catering', 'audio/visual', 'decoration', 'security'],
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'flagged', 'blocked'],
    default: 'Pending',
  },
  memberSince: {type: Date,default: Date.now,required: true },
  address: {
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  phone: {
    type: Number,
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  
  rating: {
    type: Number,
    default: 0,
  },
  services:[{
    type: String,
  }],
  recentEvents:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  location:{
    type:String,
  },
  slug: { type: String },
  event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event'},

}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
