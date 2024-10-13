const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // JWT Auth middleware
const router = express.Router();

// Create Event
router.post('/', auth, async (req, res) => {
  const { title, description, date, location } = req.body;
  const event = new Event({ title, description, date, location, organizer: req.user.id });
  await event.save();
  
  res.status(201).send(event);
});

// Get all events
router.get('/', async (req, res) => {
  const events = await Event.find().populate('organizer', 'username');
  res.json(events);
});

// Register attendee for an event
router.post('/:id/register', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event.attendees.includes(req.user.id)) {
    event.attendees.push(req.user.id);
    await event.save();
  }
  res.json(event);
});

module.exports = router;
