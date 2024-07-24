import { IconButton, useColorMode, useColorModeValue, DarkMode } from "@chakra-ui/react";
import {FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.900')

    return (
        <DarkMode>
            <IconButton onClick={() => toggleColorMode()} bg={bg} color={color}>
                {colorMode === 'light' ? <FaMoon/> : <FaSun/>}
            </IconButton>
        </DarkMode>
    )
}

export default ColorModeSwitch;