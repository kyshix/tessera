import React from 'react';
import { useParams } from 'react-router-dom';
import {
    chakra, Card, CardHeader, CardBody, Text, Heading, Divider, VStack, HStack
} from '@chakra-ui/react';
import UpdateProfileForm from '../components/UpdateProfileForm';
import ChangePasswordForm from '../components/ChangePasswordForm';

function UpdateUserInfo() {
    const {user_id} = useParams();
    return (
        <Card>
            <CardHeader>
                <Heading>
                    Update Profile
                </Heading>
            </CardHeader>
            <CardBody>
                <UpdateProfileForm user_id={user_id}></UpdateProfileForm>
                <ChangePasswordForm user_id={user_id}></ChangePasswordForm>
            </CardBody>
        </Card>
    );
}

export default UpdateUserInfo;