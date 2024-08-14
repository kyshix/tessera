import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Grid} from '@chakra-ui/react';
import EventInformation from '../components/EventInformation'
import PaymentForm from '../components/PaymentForm';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event details:', error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/user/current`, { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          navigate('/login');
        }
        return response.json()
      })
      .then(data => {
        setUserId(data);
      })
      .catch(error => {
        console.error('You are not logged in:', error)
      }
      );
  }, []);

  return (
    <Grid>
      {userId && event ? (
        < EventInformation
          id={id}
          name={event.name}
          date={event.date}
          start_time={event.start_time}
          end_time={event.end_time}
          description={event.description}
          location={event.location}
          imageUrl={event.image_url}
          userId={userId}
        />
      ) : (<h2>Loading...</h2>)}
    </Grid>
  );
}

export default EventDetail;