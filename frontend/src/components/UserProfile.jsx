import React from 'react';
import {Table, TableContainer, Tbody, Tr, Td, Card, CardBody, CardHeader, Divider, Text, Heading, Avatar, VStack, Button, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState([""]);
    useEffect(() => {
        fetch(`http://localhost:5000/profile`, { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user information:', error));
    }, []);
    const userInfo = user[0];

    return (
        <Card>
            <CardHeader>
                <Heading size="md"> 
                    Account Overview
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack p="1em">
                    <Avatar size="2xl" src={userInfo.avatar_url} />
                    <Text as='b' fontSize="2xl" >{userInfo.first_name} {userInfo.last_name}</Text>
                    <Text>{userInfo.username}</Text>
                    <Divider></Divider>
                    <TableContainer>
                        <Table size="sm">
                            <Tbody>
                                <Tr>
                                    <Td>Email</Td>
                                    <Td>{userInfo.email}</Td>
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
                                    <Text>{userInfo.email}</Text> */}
                    <Button as={Link} to={`/profile/update/${userInfo.user_id}`}>Edit Profile</Button>
                    
                </VStack>
            </CardBody>
        </Card>
    );
}

export default UserProfile;