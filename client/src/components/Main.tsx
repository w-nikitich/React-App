import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import type { RootState } from '../redux/store';
import { updateTask, resetTask } from '../redux/reducers/taskSlice';
import TaskStatus from './TaskStatus';
import TaskComponent from './TaskComponent';
import TaskCreation from './TaskCreation';

function Main() {
    const task = useSelector((state: RootState) => state.task)
    const dispatch = useDispatch()

    const [visibility, setVisibility] = useState('hidden');

    useEffect(() => {
        
        // dispatch(updateTask({name: name}))
    }, [task])

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
                
                <div className='main__task-lists'>
                    {task.list?.map((value,index) => (
                        <TaskStatus status={value.name} amount={value.amount} visibilityChange={handleState}/>
                    ))}  
                </div> 
            </Container>
        </main>
    );
}

export default Main;