// models/roomModel.js

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    phonenumber: { type: String, required: true },
    rentperday: { type: Number, required: true },
    imageurls: [{ type: String }], // Array of image URLs
    availability: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['not booked', 'booked'], default: 'not booked' },
    bookedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      userName: { type: String },
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
