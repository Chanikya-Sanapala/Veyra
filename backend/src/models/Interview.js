import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  uniqueToken: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'expired'],
    default: 'pending'
  },
  questions: [{
    type: String
  }],
  recordingVideoPath: {
    type: String
  },
  recordingAudioPath: {
    type: String
  },
  expiresAt: {
    type: Date,
    required: true
  },
  // Keep legacy fields for backward compatibility if needed, or make optional
  title: { type: String }, // Can be auto-populated "AI Interview for [Job]"
  date: { type: String },
  time: { type: String },
  link: { type: String }
}, { timestamps: true });

export default mongoose.models.Interview || mongoose.model('Interview', interviewSchema);
