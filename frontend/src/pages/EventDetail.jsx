import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventInformation from '../components/EventInformation'

function EventDetail() {
  const { id } = useParams();
  
  return (
    <EventInformation id = {id}/>
  );

}

export default EventDetail;