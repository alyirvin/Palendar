import React, {useContext, useState, useEffect } from 'react';
import { UserContext } from './context';
import './groups.css'
import { initialCalendar } from './datatypes';
import { Route, Routes, useNavigate } from 'react-router-dom';

function Groups() {
    const { currentUser } = useContext(UserContext); 
    const [groups, setGroups] = useState([]);
    const [createFormVisible, setCreateFormVisible] = useState(false);
    const [calMenuVisible, setCalMenuVisible] = useState(false);
    const initialCalState = { name: '', desc: '', pass: '' };
    const [joinExistingVisible, setJoinExistingVisible] = useState(false);
    const navigate = useNavigate(); 
    
    useEffect(() => {
        if (currentUser && currentUser.groups)
        {
            setGroups(currentUser.groups);
        }
    }, [currentUser]);

    const [currentCal, setCurrentCal] = useState(initialCalendar);
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCurrentCal({
          ...currentCal,
          [id]: value
        });
    };
    
    const handleCreate = async (e) => {
        e.preventDefault();

        try {
        const calExists = groups.some(group => group.name === currentCal.name);
        if (calExists)
        {
            alert('Calendar name has already been used');
            return;
        }

        setGroups([...groups, currentCal]);
        alert('Calendar created');
        setCreateFormVisible(false);
        setCurrentCal(initialCalState);
        // setGlobalUser(currentUser);
        // navigate('/Calendar');

        } catch (error) {
        console.error(error);
        }
    };

    const handleExistJoin = async (e) => {
        e.preventDefault();

        try {
        const calExists = groups.some(group => group.name === currentCal.name && group.pass === currentCal.pass);
        if (calExists)
        {
            alert('Calendar located');
            setJoinExistingVisible(false);
            setGroups([...groups, currentCal]);
            setCurrentCal(initialCalState);
        }
        else
        {
            alert('Calendar not found');
            return;
        }

        } catch (error) {
        console.error(error);
        }
    };

    const handleMenuSelect = async (e) => {
        e.preventDefault();
        setCalMenuVisible(true);
    };

    const handleSelectCreate = async (e) => {
        e.preventDefault();
        setCalMenuVisible(false);
        setCreateFormVisible(true);
    };

    const handleSelectExistJoin= async (e) => {
        e.preventDefault();
        setCalMenuVisible(false);
        setJoinExistingVisible(true);
    };

    return (
        <div className="happy-monkey-regular" style={{width: '100%'}}>
                <div>
                    {currentUser ? <p>{currentUser.username}'s GROUPS PAGE</p> : <p>No user to display groups</p>}
                </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
                    {groups.length > 0 ? (
                        <ul style={{display: 'flex', width: '100%', flexDirection: 'row'}}>
                            {groups.map((group, index) => (
                                <li key={index} style={{marginRight: '20px'}}><button className="calGroups">{group.name}</button></li>
                            ))}
                            <li><button id="addGroup" onClick={handleMenuSelect}>Add a Group</button></li>
                        </ul>
                    ) : (
                        <div>
                            <ul>
                            <li><button id="addGroup" onClick={handleMenuSelect}>Add a Group</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {calMenuVisible && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="addGroupMenu">
                        <div className="instructions">
                            I am instructing you. pick now
                        </div>
                        <div className="createNew">
                            <button onClick={handleSelectCreate}>Create New</button>
                        </div>
                        <div className="joinExisting">
                            <button onClick={handleSelectExistJoin}>Join Existing</button>
                        </div>
                    </div>
                </div>
            )}
            {createFormVisible && (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="createGroup">
                    <div className="createGroupTitle">Create a Calendar</div>
                    <div className="createGroupInstruct">Create your own Palendar group with just a name! For extra security, you may include an optional password. Keep your Palendars organized, write a short description about your Palendar!</div>
                    <div className="divider"></div>
                    <form id="createGroupForm" onSubmit={handleCreate}>
                        <label>Calendar Name<div className="reqInput">*</div></label>
                        <input value={currentCal.name} onChange={handleInputChange} placeholder="Calendar Name" id="name" autoComplete="off" required/>
                        <label>Calendar Description<div className="optInput">(optional)</div></label>
                        <input value={currentCal.desc} onChange={handleInputChange} placeholder="Calendar Description" id="desc" autoComplete="off" />
                        <label>Calendar Password<div className="optInput">(optional)</div></label>
                        <input value={currentCal.pass} onChange={handleInputChange} placeholder="Calendar Password" id="pass" autoComplete="off" />
                        <button type="submit" value="Submit">CREATE CALENDAR</button>
                    </form>
                </div>
            </div>
            )}
            {joinExistingVisible && (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="existJoinGroup">
                    <div className="existJoinGroupTitle">Join an Existing Calendar</div>
                    <div className="existJoinGroupInstruct">Join a Palendar that's already been created! Search by the Palendar's name and input the password if necessary.</div>
                    <div className="divider"></div>
                    <form id="existJoinGroupForm" onSubmit={handleExistJoin}>
                        <label>Calendar Name<div className="reqInput">*</div></label>
                        <input value={currentCal.name} onChange={handleInputChange} placeholder="Calendar Name" id="name" autoComplete="off" required/>
                        <label>Calendar Password<div className="optInput">(optional)</div></label>
                        <input value={currentCal.pass} onChange={handleInputChange} placeholder="Calendar Password" id="pass" autoComplete="off" />
                        <button type="submit" value="Submit">JOIN CALENDAR</button>
                    </form>
                </div>
            </div>
             )}
        </div>
    );
}

export default Groups;