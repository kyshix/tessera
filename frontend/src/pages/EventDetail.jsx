import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventInformation from '../components/EventInformation'

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const eventResponse = await fetch(`http://localhost:5000/events/${id}`, { credentials: 'include' });
  //       const eventData = await eventResponse.json();
  //       setEvent(eventData);
  //     } catch (error) {
  //       console.error('Error fetching event details:', error);
  //     }
  //   }

  //   async function fetchUserId() {
  //     try {
  //       const userResponse = await fetch(`http://localhost:5000/user/current`, { credentials: 'include' });
  //       const userData = await userResponse.json();
  //       setUserId(userData);
  //     } catch (error) {
  //       console.error('You are not logged in:', error);
  //     }
  //   }
  //     fetchData();
  //     fetchUserId();
  // }, [id]);

  // useEffect(() =>
  //   async function fetchData() {
  //     try {
  //       const [eventResponse, userIdResponse] = await Promise.all([
  //         fetch(`http://localhost:5000/events/${id}`, { credentials: 'include' }).then(response => response.json()).then(data => setEvent(data)).catch(error => console.error('Error fetching event details:', error)),
  //         fetch(`http://localhost:5000/user/current`, { credentials: 'include'}).then(response => response.json()).then(data => setUserId(data))
  //       ]);

  //     }
  //     } catch (error) {
  //       console.error("", error)
  //     }
  //   }
  // );

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

  console.log(userId)
  return (
    <div>
      {userId && event? (< EventInformation
        id={id}
        name={event.name}
        date={event.date}
        start_time={event.start_time}
        end_time={event.end_time}
        location={event.location}
        imageUrl={event.image_url}
        userId={userId}
      />) : (<h2>Loading...</h2>)}
    </div>
  );
}

export default EventDetail;