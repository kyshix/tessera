import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, SimpleGrid, Card, Image, Text, VStack, LinkBox, HStack, Grid, GridItem, Button, Heading, Flex, Spacer, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import SeatPicker from '../components/SeatPicker'
import PaymentForm from '../components/PaymentForm';

function EventInformation({ id, name, date, start_time, end_time, location, description, imageUrl, userId }) {
    const [total, setTotal] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const seatsSelected = (value) => {
        setSelectedSeats(value);

    };

    const ticketTotal = async () => {
        try {
            fetch(`http://localhost:5000/total_price/${id}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.total == null) {
                        setTotal(0)
                    } else {
                        setTotal((data.total).toFixed(2));
                    }
                })
        } catch (error) {
            console.error('Error fetching total cost of tickets')
        }
    };

    return (
        <>
            {/* the event information layout */}
            <VStack align="stretch">
                {imageUrl && (
                    <LinkBox bgColor="gray.900" pos="relative" overflow="auto">
                        <Image src={imageUrl} alt={`Image for ${name}`} boxSize='205px' opacity="0.25" objectFit="cover" width="full" />
                        <Box pos="absolute" top="8%" left="4%" right="5%">
                            <HStack gap="30px">
                                <Image src={imageUrl} alt={`Image for ${name}`} boxSize="170px" objectFit="cover" width="350px" />
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
            {/* <Box> */}
                <Grid
                    h='713px'
                    templateColumns='repeat(11, 1fr)'
                    templateRows='repeat(15,1fr)'
                    justifyContent="center"
                    alignContent="center"
                    textAlign="center"
                >
                    {/* seatpicker */}
                    <GridItem
                        colSpan={8}
                        rowSpan={15}
                        justifyContent="center"
                        alignContent="center"
                        borderWidth="1px"
                        overflow="auto"
                    >
                        <SeatPicker
                            user_id={userId}
                            event_id={id}
                            updateTotal={ticketTotal}
                            updateSeats={seatsSelected}
                        />
                    </GridItem>
                    {/* tickets text */}
                    <GridItem
                        colSpan={3}
                        rowSpan={1}
                        justifyContent="center"
                        alignContent="center"
                        borderWidth="1px"
                    >
                        <Box>
                            <Text as='b' fontSize="xl">Tickets</Text>
                        </Box>
                    </GridItem>
                    {/* tickets that user selected  */}
                    <GridItem
                        colSpan={3}
                        rowSpan={11}
                        borderWidth="1px"
                        justifyContent="center"
                        alignContent="center"
                        paddingLeft="8%"
                        paddingRight="8%"
                        overflow="scroll"
                    >
                        {selectedSeats && selectedSeats.length > 0 ? (
                            <Box >
                                <SimpleGrid spacing={3} paddingTop="20px" paddingBottom="20px">
                                    {selectedSeats.map(seat => {
                                        const seatInfo = separateSeatInfo(seat);
                                        return (
                                            ticketCard(seat, seatInfo.rowName, seatInfo.seatNum, seatInfo.cost)
                                        );
                                    })}
                                </SimpleGrid>
                            </Box>
                        ) : (
                            <Text fontSize="xl">No Tickets Selected...</Text>
                        )}
                    </GridItem>
                    {/* total and checkout */}
                    <GridItem
                        colSpan={3}
                        rowSpan={3}
                        borderWidth="1px"
                        justifyContent="center"
                        alignContent="center"
                        paddingLeft="8%"
                        paddingRight="8%"
                    >
                        <Flex>
                            <Box>
                                <Text as="b" fontSize="xl">SUBTOTAL:</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Text as="b" fontSize="xl">${total}</Text>
                            </Box>
                        </Flex>
                        {selectedSeats.length > 0? 
                            <Text textAlign="left">{selectedSeats.length} Ticket{selectedSeats.length > 1? 's': ''}</Text> :
                            null
                        }
                        {/* <Text textAlign="left" >1 Ticket</Text> */}
                        <Box paddingTop="10px">
                            <Button width="full" onClick={onOpen}>
                                Checkout
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay>
                                    <ModalContent>
                                        <ModalHeader>Checkout</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <PaymentForm
                                                totalAmount={Number(total)}
                                                eventId={id}
                                                userId={userId}
                                            />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </ModalOverlay>
                            </Modal>
                        </Box>
                    </GridItem>
                </Grid>
            {/* </Box> */}
        </>
    );
}

function separateSeatInfo(seat) {
    const cost = seat.split("$")[1];
    const match = seat.match(/([A-Za-z]+)(\d+)/);
    if (match) {
        const [_, row, seat] = match;
        return { rowName: row, seatNum: seat, cost: cost };
    } else {
        return null;
    }
}

const ticketCard = (key, row, seat, cost) => {
    return (
        <Card
            key={key}
            height="100px"
            justifyContent="center"
            alignContent="center"
            paddingLeft="8%"
            paddingRight="8%"
            borderWidth="2px"
        >
            <Flex>
                <Box>
                    <Text>ROW</Text>
                    <Text as="b" fontSize="3xl">{row}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Text>SEAT</Text>
                    <Text as="b" fontSize="3xl">{seat}</Text>
                </Box>
                <Spacer />
                <Divider orientation='vertical' />
                <Spacer />
                <Box>
                    <Text>COST</Text>
                    <Text as="b" fontSize="3xl">${cost}</Text>
                </Box>
            </Flex>
        </Card>
    );
}

export default EventInformation;