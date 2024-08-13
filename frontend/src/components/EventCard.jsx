import React, { useEffect, useState } from 'react';
import { Box, Image, Text, VStack, Heading, LinkBox, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function EventCard({ id, name, date, start_time, end_time, location, imageUrl }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            const eventDate_start = new Date(date + " " + start_time).getTime();
            const eventDate_end = new Date(date + " " + end_time).getTime();
            const now = new Date().getTime();
            const distance_start = eventDate_start - now;
            const distance_end = eventDate_end - now;

            if (distance_start < 0) {
                if (distance_end < 0) {
                    setTimeLeft('Event has passed.');
                    return;
                }
                setTimeLeft('Event has started!');
                return;
            }

            const days = Math.floor(distance_start / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance_start % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance_start % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        };
        // Update the timer every second
        const timerId = setInterval(updateTimer, 1000);
        
        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, [date]);

    return (
        <LinkBox as="article" w="full" borderWidth="1px" rounded="md" overflow="hidden" boxShadow="md">
            <VStack align="stretch">
                {imageUrl && (
                    <Image borderRadius="md" src={imageUrl} alt={`Image for ${name}`} objectFit="cover" boxSize='300px' width="full" />
                )}
                <VStack align="stretch" p="4">
                    <Heading size="md" my="2">{name}</Heading>
                    <Text fontSize="sm">Date: {date}</Text>
                    <Text fontSize="sm">Location: {location}</Text>
                    <Text fontSize="sm" color="red.500">{timeLeft}</Text>
                    {timeLeft === 'Event has passed.' ? (
                            <Button colorScheme="gray" mt="4" as={Link} to={`/events/${id}`}>
                                Unavailable
                            </Button>
                        ) :
                        (
                            <Button colorScheme="blue" mt="4" as={Link} to={`/events/${id}`}>
                                Buy Tickets!
                            </Button>
                        )
                    }
                </VStack>
            </VStack>
        </LinkBox>
    );
}

export default EventCard;