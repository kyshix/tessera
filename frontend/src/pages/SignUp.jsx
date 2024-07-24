import { GridItem, Box, Grid, Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import SignUpForm from '../components/SignUpForm';

function Signup() {
    return(
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
                    <Box align="center" >
                        <SignUpForm/>
                    </Box>
                </GridItem>
                <GridItem rowSpan={6} colSpan={1} />
                <GridItem rowSpan={1} colSpan={8} />
            </Grid>
        </Box>
    );
}

export default Signup;