import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import {updateTask, createNewTask,  updateActivity, resetTask} from '../redux/reducers/taskSlice';
import {updateList,  createList} from '../redux/reducers/listSlice';
import Container from 'react-bootstrap/Container';
import historyIcon from '../images/history_icon.png';
import plusIcon from '../images/plus_icon.png';

function Header() {
    const tasks = useSelector((state: RootState) => state.task.tasks)       
    const dispatch = useDispatch()

    async function createNewList(name: string, amount: number) {
        try {
            await axios.post('http://localhost:8001/taskLists', {name: name, amount: amount}).then(res => {
                dispatch(createList(res.data))
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
                    <div className='new-list-button' onClick={() => {createNewList('in progress', 0)}}>
                        <img className='icon' src={plusIcon} />
                        <p className=''>Create new list</p>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;