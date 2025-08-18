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
        console.log(dates);
        setDatesFilter(dates);
    }
    const startDate = (datesFilter === undefined || datesFilter.length == 0) ? today.toISOString().split('T')[0] : datesFilter[0];
    const endDate = (datesFilter === undefined || datesFilter.length == 0) ? null : datesFilter[1];

    const [search, setSearch] = useState(null);
    function handleSearchFilter(search){
        console.log(search);
        setSearch(search);
    }

    const [location, setLocation] = useState(null);
    function handleLocationFilter(location){
        console.log(location);
        setLocation(location);
    }

    const BEBASEURL = import.meta.env.VITE_BACKEND_BASEURL

    useEffect(() => {
        fetch(`${BEBASEURL}/events?afterDate=${startDate}${endDate? `&beforeDate=${endDate}` : ''}`)
            .then(response => response.json())
            .then(setEvents)
            .catch(error => console.error('Error fetching events:', error));
    }, [startDate, endDate]);

    return (
        <Box>
            <Container maxW="container.xl" centerContent>
                <Box paddingTop="20px" width="full" alignItems="center" justifyItems="center" > 
                    <Filter 
                        sendDatesFilter={handleDatesFilter}
                        sendLocationFilter={handleLocationFilter}
                        sendSearchFilter={handleSearchFilter}
                    />
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