import React, {useContext, useState, useEffect } from 'react';
import { UserContext } from './context';

function Groups() {
    const { currentUser } = useContext(UserContext); 
    const [groups, setGroups] = useState([]);
    
    useEffect(() => {
        if (currentUser && currentUser.groups)
        {
            setGroups(currentUser.groups);
        }
    }, [currentUser]);

    return (
        <div>
            {currentUser ? <p>{currentUser.username}'s GROUPS PAGE</p> : <p>No user to display groups</p>}
        </div>
    );
}

export default Groups;