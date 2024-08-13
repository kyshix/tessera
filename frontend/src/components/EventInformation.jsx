import React, { useEffect, useState } from 'react';
import { Box, Card, Image, Text, VStack, LinkBox, HStack, Grid, GridItem, Button, Heading } from '@chakra-ui/react';
import SeatPicker from './SeatPicker'

function EventInformation({ id, name, date, start_time, end_time, location, description, imageUrl, userId, updateTotal }) {
    return (
        <div >
            {/* the event information layout */}
            <VStack align="stretch">
                {imageUrl && (
                    <LinkBox bgColor="gray.900" pos="relative">
                        <Image src={imageUrl} alt={`Image for ${name}`} boxSize='205px' opacity="0.25" objectFit="cover" width="full" />
                        <Box pos="absolute" top="8%" left="4%" right="5%">
                            <HStack gap="30px">
                                <Image src={imageUrl} alt={`Image for ${name}`} boxSize="170px" objectFit="cover" width="20%" />
                                <Box textColor="white" textShadow="2px 2px #171923">
                                    <Text as="b" fontSize="5xl" >{name}</Text>
                                    <Text fontSize="lg">{date} • {start_time}-{end_time}</Text>
                                    {/* <Text fontSize="lg">{date} • {((start_time + 11) % 12 + 1)}{start_time > 12? "PM" : "AM"}-{((end_time + 11) % 12 +1)}{end_time > 12? "PM" : "AM"}</Text> */}
                                    <Text fontSize="lg">{location}</Text>
                                    <Button textAlign="left" textColor="white" borderColor="white" size="xs" variant="outline">More Info</Button>
                                </Box>
                            </HStack>
                        </Box>
                    </LinkBox>
                )}
            </VStack>
            {/* seatpicker */}
            <Box alignContent="center" justifyContent="center" textAlign="center">
                <Grid
                    h='713px'
                    templateColumns='repeat(11, 1fr)'
                >
                    <GridItem
                        colSpan={8}
                        bg='palevioletred'
                        justifyContent="center"
                    // alignContent="center"
                    >
                        <SeatPicker
                            user_id={userId}
                            event_id={id}
                            updateTotal={updateTotal}
                        />
                    </GridItem>
                    <GridItem
                        colSpan={3}
                        // bg="peachpuff"
                        justifyContent="center"
                        borderWidth="2px"
                    // alignContent="center"
                    >
                        <Box 
                            // bgColor="palegoldenrod" 
                            paddingTop="10px" 
                            paddingBottom="10px" 
                            // borderWidth="2px"
                            // borderColor="gray.300"
                            bgColor="gray.200"
                        >
                            <Text as='b' fontSize="xl">Tickets</Text>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}

export default EventInformation;