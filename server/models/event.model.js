import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: {type: String, required: true,},
  eventType: {type: String,enum: [ 'corporate', 'social', 'tech', 'charity',''],required: true, },
  date: {type: Date, required: true},
  format: {type: String, enum: ['virtual', 'hybrid', 'in-person'], required: true,},
  sitting: { type: String, enum: ['indoor', 'outdoor','theater'], required: true },
  venue: { type: String, required: true, },
  slug: { type: String, unique: true, },
  budget:{type:Number},
  attendees:{ type:String },
 status: {type: String, enum: ['upcoming', 'completed', 'cancelled'],default: 'upcoming',},
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: false },
  time: { type: String, required: false },
  endTime: { type: String, required: false },
  endDate: { type: Date, required: false },  
  description: { type: String, default: 'No description provided' },
  tags: { type: [String], default: [] },
  spent: { type: Number, default: 0 },
  organizer: { type: String, default: 'No organizer provided' },
  
}, { timestamps: true });

eventSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[\s]+/g, '-') + '-' + Date.now();
  }
  next();
});

export default mongoose.model('Event', eventSchema);
