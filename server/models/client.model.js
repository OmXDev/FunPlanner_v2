import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  notes: String,
});

export default mongoose.model('Client', clientSchema);
