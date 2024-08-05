import React, { useState, useEffect } from 'react'
import {
    chakra, Link as ChakraLink, Divider, Alert, AlertIcon, Box, Text,
    VStack, Heading, LinkBox, Button, FormControl, InputGroup, Input,
    InputLeftElement, InputRightElement, Card, CardHeader, CardBody
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons'

function UpdateProfileForm(user_id) {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const [current_password, setPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [verify_password, setVerifyPassword] = useState('');

    async function fetchChangePassword() {
        const response = await fetch(`http://localhost:5000/user/change_password/${user_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ current_password, new_password })
        }).then(response => {
            if (response.ok) {
                console.log('password changed');
            } else {
                console.log("whomp whomp")
            }
        }).catch(error => console.error(('Error changing password:', error)), []);
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
                        <Heading size="md">Change Password</Heading>
                        <InputGroup>
                            <Input
                                size="lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="current password"
                                onChange={(e) => setPassword(e.target.value)} />
                            <InputRightElement
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<ViewIcon onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</ViewIcon>}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                size="lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="new password"
                                onChange={(e) => setNewPassword(e.target.value)} />
                            <InputRightElement
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<ViewIcon onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</ViewIcon>}
                                />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                size="lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="confirm new password"
                                onChange={(e) => setVerifyPassword(e.target.value)} />
                            <InputRightElement
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<ViewIcon onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</ViewIcon>}
                            />
                        </InputGroup>
                        {(new_password === verify_password) ? null :
                            <Box width="100%" textAlign="left">
                                <Text align="left" fontSize="sm" color="red.500">
                                    Passwords do not match
                                </Text>
                            </Box>
                        }
                        <Button 
                            width='100%' 
                            onClick={fetchChangePassword}
                            isDisabled={(!current_password || !new_password || (new_password !== verify_password))? true : false}
                            >
                                Submit
                        </Button>
                    </VStack>
                </VStack>
            </form>
        </LinkBox>
    );
}

export default UpdateProfileForm;