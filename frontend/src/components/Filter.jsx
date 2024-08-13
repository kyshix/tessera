import React, {useState} from 'react';
import { DatePicker } from 'antd';
import {Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, HStack, VStack, Input, InputGroup, InputLeftElement, InputRightElement, Icon, IconButton} from '@chakra-ui/react'
// Chakra Icon: Search2Icon 

function Filter({sendDatesFilter}) {
    const { RangePicker } = DatePicker;

    function onChange(date, dateString) {
        sendDatesFilter(dateString);
    }

    return (
        <RangePicker allowClear={true} format={"YYYY-MM-DD"} onChange={onChange} />
    );
}

export default Filter;