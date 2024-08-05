import React, { useState, useEffect } from 'react'
import {
    chakra, Link as ChakraLink, Divider, Alert, AlertIcon, Box, Text,
    VStack, Heading, LinkBox, Button, FormControl, InputGroup, Input,
    InputLeftElement, InputRightElement, Card, CardHeader, CardBody
} from '@chakra-ui/react';

function UpdateProfileForm(user_id) {
    console.log(user_id);
    const [new_username, setUsername] = useState('');
    const [new_email, setEmail] = useState('');
    const [isInvalid, setIsInvalid] = useState(null);
    
    async function fetchUpdateUsernameEmail() {
        const response = await fetch(`http://localhost:5000/user/update/${user_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ new_username, new_email })
        }).then(response => {
            if (response.ok) {
                setIsInvalid(false);
                console.log('username or email changed');
            } else {
                setIsInvalid(true);
            }
        }).catch(error => console.error(('Error updating username/email:', error)), []);
    };

    return (
        <LinkBox
            as="article"
            maxW="700px"
            overflow="auto"
            // bgColor="#1A202CEF"
            rounded="lg"
            borderWidth="2px"
            // boxShadow="0 0 50px 10px #FEEBC8AF"
            backdropFilter='blur(10px)'>
            <form>
                <VStack width='95%'>
                    <VStack
                        p="1em"
                        width='90%'
                        alignContent="center"
                        justifyContent="center">
                        <Heading size="md">Change Username and/or Email</Heading>
                        {(isInvalid) ?
                            <Alert status='error'>
                                <AlertIcon alignContent="center" justifyContent="center" />
                                Username or email already exists
                            </Alert>
                            : null
                        }
                        <FormControl>
                            <InputGroup>
                                <Input
                                    size="lg"
                                    type="username"
                                    placeholder="new username"
                                    onChange={(e) => setUsername(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                        <InputGroup>
                            <Input
                                size="lg"
                                type="email"
                                placeholder="new email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </InputGroup>
                        <Button width='100%' onClick={fetchUpdateUsernameEmail}>Submit</Button>
                    </VStack>
                    <Divider width='80%' />
                </VStack>
            </form>
        </LinkBox>
    );
}

export default UpdateProfileForm;