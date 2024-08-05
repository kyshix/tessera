import React, { useState } from 'react'
import {
    chakra, Link as ChakraLink, Divider, Alert, AlertIcon, Box, Text,
    VStack, Heading, LinkBox, Button, FormControl, InputGroup, Input,
    InputLeftElement, InputRightElement
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { ViewIcon, LockIcon } from '@chakra-ui/icons'

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    async function fetchPostLogin() {
        const response = await fetch(`http://localhost:5000/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.ok) {
                    navigate('/profile');
                } else {
                    setIsInvalid(true);
                }
            })
            .catch(error => console.error(('Error logging in:', error)), []);
    };

    return (
        <LinkBox
            as="article"
            maxW="700px"
            overflow="auto"
            bgColor="#1A202CEF"
            rounded="lg"
            borderWidth="2px"
            boxShadow="0 0 50px 10px #FEEBC8AF"
            backdropFilter='blur(10px)'>
            <form>
                <VStack width='95%'>
                    <Heading paddingTop="55px">
                        Login
                    </Heading>
                    <VStack
                        p="1em"
                        width='90%'
                        alignContent="center"
                        justifyContent="center">
                        {(isInvalid) ?
                            <Alert status='error'>
                                <AlertIcon alignContent="center" justifyContent="center" />
                                Invalid Credentials
                            </Alert>
                            : null
                        }
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<FaUserAlt />}/>
                                <Input
                                    size="lg"
                                    type="username"
                                    placeholder="username"
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </InputGroup>
                        </FormControl>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                height='100%' display="flex"
                                alignItems="center"
                                children={<LockIcon />}/>
                            <Input
                                size="lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                            <InputRightElement
                                height='100%'
                                display="flex"
                                alignItems="center"
                                children={
                                    <ViewIcon onClick={handleShowClick}>
                                        {showPassword ? "Hide" : "Show"}
                                    </ViewIcon>}/>
                        </InputGroup>
                        <Box width="100%" textAlign="right">
                            <Text fontSize="sm">Forgot Password?</Text>
                        </Box>
                        <Button width='100%' onClick={fetchPostLogin} >Login</Button>
                    </VStack>
                    <Divider width='80%' />
                    <Text paddingTop="20px" paddingBottom="55px">
                        New User? <ChakraLink 
                            color="yellow.500" 
                            fontWeight="bold" 
                            as={Link} 
                            to="/signup">
                                Signup
                        </ChakraLink>
                    </Text>
                </VStack>
            </form>
        </LinkBox>
    );
}

export default LoginForm;