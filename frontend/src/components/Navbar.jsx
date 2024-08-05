import React from 'react';
import { Stack, Box, Image, Flex, Text, Button, Spacer, DarkMode, Avatar, useColorModeValue, useColorMode, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import ColorModeSwitch from "./ColorModeSwitch";

function Navbar() {
  const bg = useColorModeValue('blue.500', 'blue.400')
  const color = useColorModeValue('white', 'gray.800')
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack>
      <Flex
        bg={bg} color={color}
        p="4" alignItems="center"
        as="header" position="fixed"
        w="100%" zIndex="sticky"
        height="75px" top='0px'>
        {/* Tessera Events Text */}
        <Box p="2">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            as={Link} to={`/events`}>
            Tessera Events
          </Text>
        </Box>
        <Spacer />

        {/* Toggle for light and dark mode 
        is there a way to make this icon bigger?
        may chaneg the design of the toggle*/}
        <Box mr={25}>
          <ColorModeSwitch />
        </Box>

        {/* Account Icon */}
        <Box>
          <Menu>
            {/* if logged out take them to the login page */}
            {/* <MenuButton as={Link} to={`/login`}> */}
              <Avatar size="md"  as={Link} to={`/login`}/>
            {/* </MenuButton> */}
            {/* only show the menu if you have cookie/are logged in */}
            {/* could i use a useeffect here check it the jwt token is valid from the backend
          the better option is chekcing on the frontend/client side but i cant seem to find any documentation regarding it
          or anything similar*/}
            {/* <MenuList colorScheme='blue' color={bg}>
            <MenuGroup title='Profile' color={bg}>
              <MenuItem as={Link} to={`/profile`}>Account</MenuItem>
              <MenuItem as={Link} to={`/tickets`}>Tickets</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem color='red.500'>
              <Link color='red.500'>Logout</Link>
            </MenuItem>
          </MenuList> */}
          </Menu>
        </Box>
      </Flex>
    </Stack>
  );
}

export default Navbar;