import React from 'react';
import Container from 'react-bootstrap/Container';
import TaskStatus from './TaskStatus';

function Main() {
    return (
        <main>
            <Container>
                <TaskStatus status='To Do' amount={0}/>
                <TaskStatus status='Planned' amount={0}/>
                <TaskStatus status='In Propgress' amount={0}/>
                <TaskStatus status='Closed' amount={0}/>
            </Container>
        </main>
    );
}

export default Main;