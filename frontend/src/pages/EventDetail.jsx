import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Button, Box} from '@chakra-ui/react';
import EventInformation from '../components/EventInformation'

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

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
          console.log("set to 0 whomp whomp")
          setTotal(0)
        } else {
          console.log("total:" + total)
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

  const purchaseTickets = async () => {
    const response = await fetch(`http://localhost:5000/inventory/buy`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({id, userId})
    }).then(response => {
      if(response.ok){
        navigate('/profile');
      }
    }).catch(error => console.error(('Error purchasing ticket', error)), []);
  };

  console.log(userId)
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
            location={event.location}
            imageUrl={event.image_url}
            userId={userId}
            
            updateTotal={ticketTotal}
          />
          <div>Total: {total}</div>
          <Button onClick={purchaseTickets}>Checkout</Button>
        </Box>
      ) : (<h2>Loading...</h2>)}
    </div>
  );
}

export default EventDetail;