// bookingRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Room = require('../models/roomModel');

router.use(bodyParser.json());

router.post('/bookRoom/:roomId', async (req, res) => {
  try {
    const { userId, userName } = req.body; 

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status: 'booked', bookedBy: { userId, userName } },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/bookedRooms/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookedRooms = await Room.find({
      'bookedBy.userId': userId,
      status: 'booked'
    });

    res.status(200).json(bookedRooms);
  } catch (error) {
    console.error('Error fetching booked rooms by user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// cancel room by room id for user
router.put('/cancelBooking/:roomId', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status: 'not booked', bookedBy: null },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
