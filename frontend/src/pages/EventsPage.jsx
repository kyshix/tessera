import React, { useEffect, useState } from 'react';
import { SimpleGrid, Container, Box, Button } from '@chakra-ui/react';
import EventCard from '../components/EventCard';
import Filter from '../components/Filter';
import { Link } from 'react-router-dom';
// import FilterBar from '../components/FilterBar';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const today = new Date();
    today.setDate(today.getDate());

    const [datesFilter, setDatesFilter] = useState([]);
    function handleDatesFilter(dates) {
        setDatesFilter(dates);
    }
    const startDate = (datesFilter === undefined || datesFilter.length == 0) ? today.toISOString().split('T')[0] : datesFilter[0];
    const endDate = (datesFilter === undefined || datesFilter.length == 0) ? null : datesFilter[1];

    console.log(startDate)
    useEffect(() => {
        fetch(`http://localhost:5000/events?afterDate=${startDate}${endDate ? `&beforeDate=${endDate}` : ''}`)
            .then(response => response.json())
            .then(setEvents)
            .catch(error => console.error('Error fetching events:', error));
    }, [startDate, endDate]);

    return (
        <Box>
            <Container maxW="container.xl" centerContent>
                {/* <Filter sendDatesFilter={handleDatesFilter}/>
            <Button as={Link} to={'/test'}>

            </Button> */}
                {/* <FilterBar/> */}
                <Box paddingTop="20px"> 
                    <Filter sendDatesFilter={handleDatesFilter}/>
                </Box>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} py={5}>
                    {events.map(event => (
                        <EventCard
                            key={event.event_id}
                            id={event.event_id}
                            name={event.name}
                            date={event.date}
                            start_time={event.start_time}
                            end_time={event.end_time}
                            location={event.location}
                            imageUrl={event.image_url}/>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}

export default EventsPage;