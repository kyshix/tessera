import React, { useEffect, useState } from 'react';
import { Box, Card, Image, Text, VStack, Heading, LinkBox, Button, HStack } from '@chakra-ui/react';
import SeatPicker from './SeatPicker'

function EventInformation({ id, name, date, start_time, end_time, location, description, imageUrl, userId, updateTotal}) {
    return (
        <div >
            <VStack align="stretch">
                {imageUrl && (
                    <LinkBox bgColor="gray.900" rounded="md" pos = "relative">
                        <Image src={imageUrl} alt={`Image for ${name}`} boxSize='400px' opacity="0.4" objectFit="cover" width="full" />
                        <Box pos="absolute" bottom="15%" left="5%"> 
                            <HStack gap="30px">
                                <Image src={imageUrl} alt={`Image for ${name}`} boxSize='250px' objectFit="cover" width="50%"/>
                                <Box>
                                    <Text as="b" fontSize="5xl" >{name}</Text>
                                    <Text fontSize="lg">{date} • {start_time}</Text>
                                    <Text fontSize="lg">{location}</Text>
                                    <br/>
                                    <Text fontSize="sm" noOfLines={2}>{description}</Text>
                                </Box>
                            </HStack>
                            
                        </Box>
                    </LinkBox>
                )}
            </VStack>
            <Box alignContent="center" justifyContent="center" textAlign="center">
                <Heading size="md">Choose Seats</Heading>
                <Box bgColor="red.500"> 
                <SeatPicker
                    user_id={userId}
                    event_id={id} 
                    updateTotal={updateTotal}/>
                </Box>
            </Box>
        </div>
    );
}

export default EventInformation;