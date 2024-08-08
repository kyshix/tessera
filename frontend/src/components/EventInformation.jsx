import React, { useEffect, useState } from 'react';
import { Box, Image, Text, VStack, Heading, LinkBox, Button } from '@chakra-ui/react';
import SeatPicker from './SeatPicker'

function EventInformation({ id, name, date, start_time, end_time, location, imageUrl, userId}) {
    // const [userId, setUserId] = useState("");
    // useEffect(() => {
    //     fetch(`http://localhost:5000/user/current`, { credentials: 'include' })
    //         .then(response => response.json())
    //         .then(data => setUserId(data))
    //         .catch(error => console.error('You are not logged in:', error));
    // }, []);

    return (
        <div >
            <VStack align="stretch">
                {imageUrl && (
                    <Image src={imageUrl} alt={`Image for ${name}`} objectFit="cover" boxSize='600px' width="full" />
                )}
            </VStack>
            <Box alignContent="center" justifyContent="center" textAlign="center">
                <Heading size="md">Choose Seats</Heading>
                <Box bgColor="red.500"> 
                <SeatPicker
                    user_id={userId}
                    event_id={id} />
                </Box>
            </Box>

            {/* <Box pos="relative" boxSize="400px">
                <Image src="https://bit.ly/2Z4KKcF" boxSize="full" />
                <Text pos="absolute" top="50%" left="50%" color="red" transform="translate(-50%,-50%)">
                    This text is centered on the image
                </Text>
            </Box> */}
        </div>
    );
}

export default EventInformation;