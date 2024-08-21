import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Image, Box, CardHeader, Heading, Grid, GridItem, Container, Text, HStack, VStack, CardBody,CardFooter, TabList, Tabs, Tab, TabPanels, TabPanel, useColorModeValue, Flex, Spacer } from '@chakra-ui/react';

function UpcomingEventPurchased(key){
    const [ticket, setTicket] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/ticket/user/upcoming_event', {credentials: 'include'})
        .then(response => response.json())
        .then(data => setTicket(data[0]))
        .catch(error => console.error('Error fetching upcoming ticket:', error));
    }, []);

    // console.log(ticket)
    return(
        <>
        {ticket? (
            <Card minW="300px" maxW="60vw" minH="70vh" align="center">
                <CardHeader>
                    <Heading size="xl" mt="10px">Upcoming Event You're Attending</Heading>
                </CardHeader>
                <CardBody w='90%'>
                    <Image src={ticket.image_url} objectFit="cover" bg="yellow"/>
                    <Text as="b" fontSize="3xl">{ticket.name}</Text>
                    <Flex>
                        <Box>
                            <Text fontSize="xl">{ticket.date}</Text>
                            <Text fontSize="xl">{ticket.start_time} - {ticket.end_time}</Text>
                        </Box>
                        <Spacer/>
                        <Box>
                            <Text fontSize="xl">ROW {ticket.row_name}</Text>
                            <Text fontSize="xl">SEAT {ticket.seat_number}</Text>
                        </Box>
                    </Flex>
                </CardBody>
                
            </Card>) : <>Loading</>}
        </>
    ); 
}

export default UpcomingEventPurchased;