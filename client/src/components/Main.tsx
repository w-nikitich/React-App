import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import type { RootState } from '../redux/store';
import { updateAllTasks, resetTask } from '../redux/reducers/taskSlice';
import { createList, updateList, getAllLists, resetList } from '../redux/reducers/listSlice';

import TaskStatus from './TaskStatus';
import TaskComponent from './TaskComponent';
import TaskEditing from './TaskEditing';

function Main() {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const lists = useSelector((state: RootState) => state.list.lists);
    const dispatch = useDispatch();

    const [visibility, setVisibility] = useState('hidden');
    const [id, setId] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8001/taskLists').then((res) => {
            dispatch(getAllLists(res.data))
        });

        axios.get('http://localhost:8001/tasks').then((res) => {
            dispatch(updateAllTasks(res.data))
        });  
    }, [visibility])

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

    function findAmount(listId: number) {
        let amount = 0;

        tasks.forEach(task => {
            if (task?.listId === listId) {
                amount++;
            }
        })

        return amount;
    }

    function handleId(id: number) {
        setId(id);
    }

    return (
        <main>
            <Container>
                {visibility ? <TaskEditing visibility={visibility} visibilityChange={handleState} defineId={handleId} id={id}/> : null}
                
                <div className='main__task-lists'>
                    {lists.map((value:any, index:any) => (
                        <TaskStatus id={value.id} status={value.name} amount={findAmount(value.id)} visibilityChange={handleState} defineId={handleId}/>
                    ))}  
                </div> 
            </Container>
        </main>
    );
}

export default Main;