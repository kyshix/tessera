import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Box, CardHeader, Heading, Grid, GridItem, Container, Text, HStack, VStack, CardBody, TabList, Tabs, Tab, TabPanels, TabPanel, useColorModeValue } from '@chakra-ui/react';
import UserProfile from '../components/UserProfile';
import UpcomingEvent from '../components/UpcomingEventPurchased';

function Profile() {
    const color = useColorModeValue('gray.200', 'gray.700')
    const flip = useColorModeValue('black', 'white')

    return (
        <Container maxW="container.xl" centerContent>
        <Box minWidth="80vw">
            <Tabs variant='enclosed' ml='20px' mr='20px'>
                <TabList>
                    <Tab _selected={{ bg: color, color: flip }} fontWeight='bold'>
                        Dashboard
                    </Tab>
                    <Tab _selected={{ bg: color, color: flip }} fontWeight='bold'>
                        Update Profile
                    </Tab>
                    <Tab _selected={{ bg: color, color: flip }} fontWeight='bold'>
                        Change Password
                    </Tab>
                    {/* <Tab _selected={{ bg: color, color: flip }} fontWeight='bold'>
                        User Tickets
                    </Tab> */}
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <HStack>
                            <UserProfile/>
                            <UpcomingEvent/>
                        </HStack>
                        
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
        </Container>
    );
}

export default Profile