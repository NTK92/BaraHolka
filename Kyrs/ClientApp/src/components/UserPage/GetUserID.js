import React from 'react';
import { useParams } from "react-router-dom";
import {UserPage} from './UserPage';

export function GetUserID() {

    const {id} = useParams();
    return (
        <div>
            <UserPage userId={id} />
        </div>
    );
}
