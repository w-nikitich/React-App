import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import historyIcon from '../images/history_icon.png';
import plusIcon from '../images/plus_icon.png';

function Header() {
    async function createNewTask() {
        try {
            await axios.post('http://localhost:8001/taskLists', {}).then(res => {
                console.log('worked ', res.data);
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <Container>
                <p className='header-name'>My task board</p>
                
                <div className='header-buttons'>
                    <div className='history-button'>
                        <img className='icon' src={historyIcon} />
                        <p>History</p>
                    </div>
                    <div className='new-list-button' onClick={() => {createNewTask()}}>
                        <img className='icon' src={plusIcon} />
                        <p className=''>Create new list</p>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;