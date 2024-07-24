import React from 'react';
import { Box, Flex, Text, Button, Spacer } from '@chakra-ui/react';
import ColorModeSwitch from '../components/ColorModeSwitch';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react'

function Navbar() {
  return (
    <Flex bg="blue.500" color="white" p="4" alignItems="center">
      <Box p="1">
        <Text fontSize="xl" fontWeight="bold" as={Link} to={`/events`}>Tessera Events</Text>
      </Box>
      <Box>
        <ColorModeSwitch/>
      </Box>
      <Spacer />
      <Box>
        {/* <Icon as={BsPersonCircle} boxSize="25px" /> */}
        <Avatar size='sm' src='https://bit.ly/broken-link' as={Link} to={`/login`}/>
      </Box>
    </Flex>
  );
}

export default Navbar;
