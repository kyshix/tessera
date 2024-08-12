import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react';
import EventInformation from '../components/EventInformation'
import PaymentForm from '../components/PaymentForm';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const {isOpen, onOpen, onClose } = useDisclosure();

  const ticketTotal = async () => {
    try{
      fetch(`http://localhost:5000/total_price/${id}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.total == null) {
          setTotal(0)
        } else {
          setTotal((data.total).toFixed(2));
        }
      })
    } catch(error){
      console.error('Error fetching total cost of tickets')
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event details:', error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/user/current`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => setUserId(data))
      .catch(error => console.error('You are not logged in:', error));
  }, []);

  return (
    <div>
      {userId && event ? (
        <Box
          alignContent="center"
          justifyContent="center">
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
            
            updateTotal={ticketTotal}
          />
          <div>Total: {total}</div>
          <>
            <Button onClick={onOpen}>Checkout</Button>
            <Modal isOpen={isOpen} onClose={onClose}> 
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>Checkout</ModalHeader>
                  <ModalCloseButton/>
                  <ModalBody>
                    <PaymentForm 
                      totalAmount={Number(total)} 
                      eventId={id}
                      userId={userId} 
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          </>
        </Box>
      ) : (<h2>Loading...</h2>)}
    </div>
  );
}

export default EventDetail;