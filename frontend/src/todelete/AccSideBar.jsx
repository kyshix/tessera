// import React from 'react';
// import { Box, Image, Card, CardBody, Grid, GridItem, Text, Avatar, HStack, VStack, Heading, LinkBox, Button, Container, Flex } from '@chakra-ui/react';
// import { useState, useEffect } from 'react';
// import AccSideBarItem from '../components/AccSideBarItem';
// import { FaUserAlt } from 'react-icons/fa';

// function AccSideBar(){
//     return(
//         <Flex
//                 pos="sticky"
//                 left="5"
//                 h="95vh"
//                 marginTop="2vh"
//                 boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
//                 w="200px"
//                 flexDir="column"
//                 justifyContent="space-between"
//                 bgColor="pink.500"
//             >
                {/* <AccSideBarItem icon={FaUserAlt} title="My Information" /> */}
                {/* <VStack>
                    <Button>Account Overview</Button>
                    <Button>My Information</Button>
                    <Button>My Tickets</Button>
                    <Button>Favorites</Button>
                    <Button>Payment History</Button>
                </VStack> */}
//             </Flex>
//     );
// }

// export default AccSideBar;

import React, { useState } from 'react'
import { Flex, Text, IconButton, Divider, Avatar, Heading} from '@chakra-ui/react'
import { FiHome, FiUser, FiDollarSign, FiBriefcase, FiSettings} from 'react-icons/fi'
import { IoTicket } from "react-icons/io5";
import { IoPawOutline } from 'react-icons/io5'
import AccSideBarItem from './AccSideBarItem'

function AccSideBar() {
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            flexDir="column"
            justifyContent="space-between"
            bgColor="pink.500"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems="flex-start"
                as="nav"
            >
                <AccSideBarItem icon={FiHome} title="Dashboard" active/>
            </Flex>
        </Flex>
    )
}

export default AccSideBar;