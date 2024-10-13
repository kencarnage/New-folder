import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the route

  return (
    <div>
      <h2>Event Details - {id}</h2>
      {/* Fetch and display details of the event with this ID */}
    </div>
  );
};

export default EventDetails;
