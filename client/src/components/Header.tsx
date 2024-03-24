import React from 'react';
import Container from 'react-bootstrap/Container';
import historyIcon from '../images/history_icon.png';
import plusIcon from '../images/plus_icon.png';

function Header() {
    return (
        <header>
            <Container>
                <p className='header-name'>My task board</p>
                
                <div className='header-buttons'>
                    <div className='history-button'>
                        <img className='icon' src={historyIcon} />
                        <p>History</p>
                    </div>
                    <div className='new-list-button'>
                        <img className='icon' src={plusIcon} />
                        <p className=''>Create new list</p>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;