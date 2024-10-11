import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  interests: {
    type: String, 
  }
});

// Export the model, or if already compiled, use the existing one
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
