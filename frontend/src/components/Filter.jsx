import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Flex, Box, Select, HStack, VStack, Spacer, Input, InputGroup, InputLeftElement, InputRightElement, Icon, IconButton, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { Search2Icon, CalendarIcon } from '@chakra-ui/icons'
import { FaLocationDot } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import "../../style.css"

function Filter({ sendDatesFilter, sendLocationFilter, sendSearchFilter}) {
    const { RangePicker } = DatePicker;

    
    function dateChange(date, dateString) {
        sendDatesFilter(dateString);
    }

    const [location, setLocation] = useState();
    function locationChange(location){
        setLocation(location);
        sendLocationFilter(location);
    }
    
    const [search, setSearch] = useState();
    function searchChange(search){
        sendSearchFilter(search);
    }

    return (
        <HStack>
            <FormControl>
                <Select 
                    placeholder='Select category'
                    onChange={(e) => console.log(e.target.value)}
                >
                    <option>Concerts</option>
                    <option>Shows</option>
                    <option>Games</option>
                </Select>
            </FormControl>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    height='100%'
                    display="flex"
                    alignItems="center"
                    children={<FaLocationDot />}
                />
                <Input
                    width="full"
                    type="event name"
                    placeholder="City or Zip Code"
                    onBlur={(e) => locationChange(e.target.value)}
                />
                <InputRightElement 
                    color="gray.300"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    children={
                        <AiFillCloseCircle
                            onClick={ () => locationChange('')}
                        />
                    }
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    height='100%'
                    display="flex"
                    alignItems="center"
                    children={<CalendarIcon />}
                />
                <RangePicker
                    allowClear={true}
                    format={"YYYY-MM-DD"}
                    onChange={dateChange}
                    size="large"
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    height='100%'
                    display="flex"
                    alignItems="center"
                    children={<Search2Icon />}
                />
                <Input
                    width="full"
                    type="event name"
                    placeholder="Search by Artist, Team, Event, or Venue"
                    onBlur={(e) => searchChange(e.target.value)}
                />
                <InputRightElement 
                    color="gray.300"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    children={
                        <AiFillCloseCircle 
                            onClick= { () => searchChange('')}
                        />
                    }
                />
            </InputGroup>
        </HStack>
    );
}

export default Filter;