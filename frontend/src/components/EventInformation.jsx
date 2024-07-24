import React, { useEffect, useState } from 'react';
import { Box, Image, Text, VStack, Heading, LinkBox, Button } from '@chakra-ui/react';

function EventInformation({ id }) {
    const [event, setEvent] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/events/${id}`, {credentials: 'include'})
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event details:', error));
    }, []);

    return (
        <div >
            <VStack align="stretch">
                {event.image_url && (
                    <Image src={event.image_url} alt={`Image for ${event.name}`} objectFit="cover" boxSize='600px' width="full" />
                )}
            </VStack>
            <Box pos="relative" boxSize="400px">
                <Image src="https://bit.ly/2Z4KKcF" boxSize="full" />
                <Text pos="absolute" top="50%" left="50%" color="red" transform="translate(-50%,-50%)">
                    This text is centered on the image
                </Text>
            </Box>
        </div>
    );
}

export default EventInformation;