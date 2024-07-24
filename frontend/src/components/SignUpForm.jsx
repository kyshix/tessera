import React, { useState, useEffect } from 'react'
import { chakra, Link as ChakraLink, Divider, Wrap, WrapItem, Avatar, Alert, AlertIcon, Box, Image, Text, VStack, Heading, LinkBox, Button, FormControl, InputGroup, Input, InputLeftElement, InputRightElement, HStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { ViewIcon, LockIcon, EmailIcon } from '@chakra-ui/icons'

function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar_url, setPicUrl] = useState('')
    const [isInvalid, setIsInvalid] = useState(false);

    async function fetchSignUp() {
        const response = await fetch(`http://localhost:5000/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name, last_name, username, email, password, avatar_url })
        }).then(response => {
            if (response.status === 201) {
                navigate('/login')
            } else {

                setIsInvalid(true)
            }
        })
            .catch(error => console.error(('Error creating new user: ', error)), []);
    }

    useEffect(() => {
        if (!avatar_url) {
            setPicUrl('https://bit.ly/broken-link');
        }
    }, [avatar_url]);

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
                    <Heading paddingTop="55px">Sign Up</Heading>
                    <VStack
                        p="1em"
                        width='90%'
                        alignContent="center"
                        justifyContent="center">
                        {(isInvalid) ? <Alert status='error'><AlertIcon alignContent="center" justifyContent="center" />Username or email already exists</Alert> : null}
                        <Wrap>
                            <WrapItem>
                                <Avatar size="lg" src={avatar_url} />
                            </WrapItem>
                        </Wrap>
                        <FormControl>
                            <Input
                                size="lg"
                                width="50%"
                                type="image_url"
                                placeholder='enter url to profile image'
                                onChange={(e) => setPicUrl(e.target.value)}>
                            </Input>
                        </FormControl>
                        <HStack
                            width='100%'>
                            {/* First Name Input */}
                            <FormControl>
                                <Input
                                    size="lg"
                                    type="name"
                                    placeholder='first name'
                                    onChange={(e) => setFirstName(e.target.value)}>
                                </Input>
                            </FormControl>
                            {/* Last Name Input */}
                            <FormControl>
                                <Input
                                    size="lg"
                                    type="name"
                                    placeholder='last name'
                                    onChange={(e) => setLastName(e.target.value)}>
                                </Input>
                            </FormControl>
                        </HStack>
                        {/* Username Input */}
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<FaUserAlt />}
                                />
                                <Input
                                    size="lg"
                                    type="username"
                                    placeholder="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        {/* Email Input */}
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<EmailIcon />}
                                />
                                <Input
                                    size="lg"
                                    type="email"
                                    placeholder="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        {/* Password Input */}
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    height='100%' display="flex"
                                    alignItems="center"
                                    children={<LockIcon />}
                                />
                                <Input
                                    size="lg"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<ViewIcon onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</ViewIcon>}
                                />
                            </InputGroup>
                        </FormControl>
                        {/* Confirm Password Input */}
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    height='100%' display="flex"
                                    alignItems="center"
                                    children={<LockIcon />}
                                />
                                <Input
                                    size="lg"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="verify password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <InputRightElement
                                    height='100%'
                                    display="flex"
                                    alignItems="center"
                                    children={<ViewIcon onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</ViewIcon>}
                                />
                            </InputGroup>
                        </FormControl>
                        {(password === confirmPassword) ? null :
                            <Box width="100%" textAlign="left">
                                <Text align="left" fontSize="sm" color="red.500">
                                    Passwords do not match
                                </Text>
                            </Box>
                        }
                        <Box width="100%" textAlign="right">
                            <Text fontSize="sm">Forgot Password?</Text>
                        </Box>

                        <Button
                            width='100%'
                            isDisabled={(!first_name || !last_name || !username || !email || !password || (password !== confirmPassword)) ? true : false}
                            onClick={fetchSignUp}
                        >
                            Submit
                        </Button>
                    </VStack>
                    <Divider width='80%' />
                    <Text paddingTop="5px" paddingBottom="55px">
                        Existing User? <ChakraLink as={Link} to="/login" color="yellow.500" fontWeight="bold">Login</ChakraLink>
                    </Text>
                </VStack>
            </form>
        </LinkBox>
    );
}
export default SignUpForm;