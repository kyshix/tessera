import React, { useState } from 'react'
import { Container, GridItem, Box, Image, Text, VStack, Heading, LinkBox, Button, Grid } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div>
      <Box>
        <Grid
          backgroundImage="url('https://azbigmedia.com/wp-content/uploads/2020/03/concert-tips.png')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          h='100vh'
          templateRows='repeat(8, 1fr)'
          templateColumns='repeat(8, 1fr)'
          gap={1}
        >
          <GridItem rowSpan={1} colSpan={8} />
          <GridItem rowSpan={6} colSpan={1} />
          {/* how do i incorporate/implement dark and light mode to these/ throughout my whole site */}
          <GridItem rowSpan={6} colSpan={6} alignContent="center" justifyContent="center" >
            <Box align="center">
              <LoginForm/>
            </Box>
          </GridItem>
          <GridItem rowSpan={6} colSpan={1} />
          <GridItem rowSpan={1} colSpan={8} />
        </Grid>
      </Box>
    </div>
  );
}

export default Login; 