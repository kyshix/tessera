import React, { useEffect, useState } from 'react';
import { Box, Card, Image, Text, VStack, Heading, LinkBox, Button } from '@chakra-ui/react';
import SeatPicker from './SeatPicker'

function EventInformation({ id, name, date, start_time, end_time, location, imageUrl, userId}) {
    return (
        <div >
            <VStack align="stretch">
                {imageUrl && (
                    <Box bgColor="gray.900" rounded="sm" pos = "relative">
                        <Image src={imageUrl} alt={`Image for ${name}`} boxSize='400px' opacity="0.4" objectFit="cover" width="full" />
                        <Text as="b" fontSize="4xl" pos="absolute" bottom="40px" left="40px" >{name}</Text>
                    </Box>
                    
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
        </div>
    );
}

export default EventInformation;