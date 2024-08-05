import React from 'react';
import { Card, Box, CardHeader, Heading, Grid, GridItem, Container, Text, HStack, VStack, CardBody } from '@chakra-ui/react';
import UserProfile from '../components/UserProfile';

function Profile() {
    return (
        <Box
            // bg="purple.500"
            h="90vh">
            <Container
                maxW="container.xl"
                // bgColor="pink.500"
                h="100%">
                <VStack
                    gap='1em'>
                    <Box 
                        // bg="yellow.500"
                        w="100%"> 
                        <Text as='b' fontSize="4xl">Dashboard</Text>
                    </Box>
                    <HStack 
                        w="100%">
                        <UserProfile />

                        {/* Overview of tickets aka upcoming event that the user has tickets to attend || link to /profile/tickets
                        or no events and link back to /events 
                        
                        Create new component for this not sure what to name it yet and no info for it bc tickets need to be completed*/}
                        <>
                            <Card 
                                // bg="orange.500"
                            >
                                    <CardHeader>
                                        <Heading size="md">Upcoming Event You're Attending</Heading>
                                    </CardHeader>
                                    <CardBody> 
                                        <Text>No upcoming events...</Text>
                                        <Text>Shop for your next memory!</Text>
                                    </CardBody>
                            </Card>
                        </>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
}

export default Profile