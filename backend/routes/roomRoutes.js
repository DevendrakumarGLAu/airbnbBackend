// routes/roomRoutes.js

const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

router.post('/addRoom', async (req, res) => {
  try {
    const { roomName, roomType, phoneNumber, rentperday, imageurls, availability, userId } = req.body;

    const newRoom = new Room({
      name: roomName,
      type: roomType,
      phonenumber: phoneNumber,
      rentperday: rentperday,
      imageurls: imageurls,
      availability: availability,
      addedBy: userId,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/getAllRooms', async (req, res) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/editRoom/:roomId', async (req, res) => {
  try {
    const { roomName, roomType, phoneNumber, rentperday, imageurls, availability } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        name: roomName,
        type: roomType,
        phonenumber: phoneNumber,
        rentperday: rentperday,
        imageurls: imageurls,
        availability: availability,
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Room
router.delete('/deleteRoom/:roomId', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);

    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getRoomById/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Update Status - Mark room as not booked
router.put('/unbookRoom/:roomId', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status: 'not booked' },
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



module.exports = router;
