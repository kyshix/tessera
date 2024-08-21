import React from 'react';
import {Table, TableContainer, Tbody, Tr, Td, Card, CardBody, CardHeader, Divider, Text, Heading, Avatar, VStack, Button, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState([""]);
    useEffect(() => {
        fetch(`http://localhost:5000/profile`, { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUser(data[0]))
            .catch(error => console.error('Error fetching user information:', error));
    }, []);

    // const logout = async () => {
    //     fetch(`http://localhost:5000/logout`, )
    // }
    // const checkUser = async () => {
    //     fetch(`http://localhost:5000/user/current`, { credentials: 'include' })
    //       .then(response => {
    //         if (!response.ok) {
    //           navigate('/login');
    //         } else {
    //           navigate('/profile');
    //         }
    //       });
    //   };
    return (
        <Card minW="450px" maxW="40vw" minH="70vh" textAlign="center" justifyContent="center" alignContent="center">
            <CardHeader>
                <Heading size="xl" mt="10px"> 
                    Account Overview
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack p="1em">
                    <Avatar size="2xl" src={user.avatar_url} />
                    <Text as='b' fontSize="2xl" >{user.first_name} {user.last_name}</Text>
                    <Text>{user.username}</Text>
                    <Divider></Divider>
                    <TableContainer>
                        <Table size="sm">
                            <Tbody>
                                <Tr>
                                    <Td>Email</Td>
                                    <Td>{user.email}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Phone Number</Td>
                                    <Td>temp phone number</Td>
                                </Tr>
                                <Tr>
                                    <Td>Address</Td>
                                    <Td>temp address</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {/* <Text textAlign="left" color="gray.500">Email</Text>
                                    <Text>{user.email}</Text> */}
                    <Button mt="30px" textColor="red.500">Log out</Button>
                    
                </VStack>
            </CardBody>
        </Card>
    );
}

export default UserProfile;