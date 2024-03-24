import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import TaskStatus from './TaskStatus';
import TaskComponent from './TaskComponent';
import TaskCreation from './TaskCreation';

function Main() {
    const [visibility, setVisibility] = useState('hidden');

    function handleState(visibility:string) {
        setVisibility(visibility)
        const historyButton = document.getElementsByClassName('history-button')[0];
        
        if (visibility == 'visible') {
            document.body.style.backgroundColor = '#dddcea'
            historyButton.classList.add('hidden')
        }
        else {
            document.body.style.backgroundColor = '#fff'
            historyButton.classList.remove('hidden')
        }
    }

    return (
        <main>
            <Container>
                {visibility ? <TaskCreation visibility={visibility} visibilityChange={handleState}/> : null}

                <TaskStatus status='To Do' amount={0} visibilityChange={handleState}/>
                <TaskStatus status='Planned' amount={0} visibilityChange={handleState}/>
                <TaskStatus status='In Propgress' amount={0} visibilityChange={handleState}/>
                <TaskStatus status='Closed' amount={0} visibilityChange={handleState}/>    
            </Container>
        </main>
    );
}

export default Main;