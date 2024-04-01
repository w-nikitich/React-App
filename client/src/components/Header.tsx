import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { updateTask, createNewTask, updateActivity, resetTask } from '../redux/reducers/taskSlice';
import { updateList, createList } from '../redux/reducers/listSlice';
import { createNewActivity, resetHistory, updateHistory } from '../redux/reducers/historySlice';
import Container from 'react-bootstrap/Container';
import historyIcon from '../images/history_icon.png';
import plusIcon from '../images/plus_icon.png';
import History from './History';

function Header() {
    const tasks = useSelector((state: RootState) => state.task.tasks)
    const history = useSelector((state: RootState) => state.history.history);
    const dispatch = useDispatch()

    const [isHistoryOpened, setIsHistoryOpened] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8001/history').then((res) => {
            dispatch(updateHistory(res.data))
        })

        if (isHistoryOpened) {
            document.body.style.backgroundColor = '#dddcea'
        } else {
            document.body.style.backgroundColor = '#fff'
        }
    }, [isHistoryOpened,])

    function handleState(value: boolean) {
        setIsHistoryOpened(value)
    }

    async function createNewList(name: string, amount: number) {
        try {
            let createdList = {
                id: 0,
                name: name
            };
            await axios.post('http://localhost:8001/taskLists', { name: name, amount: amount }).then(res => {
                dispatch(createList(res.data))
                createdList = res.data;
            })
            axios.post('http://localhost:8001/history', { listId: createdList.id, listName: createdList.name, type: 'create list', text: `You created list ${createdList.name}` }).then((res) => {
                dispatch(createNewActivity({createdLog: res.data}))
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <header>
            <Container>
                <p className='header-name'>My task board</p>

                <div className='header-buttons'>
                    <div className='history-button' onClick={() => handleState(true)}>
                        <img className='icon' src={historyIcon} />
                        <p>History</p>
                    </div>
                    <div className='new-list-button' onClick={() => { createNewList('in progress', 0) }}>
                        <img className='icon' src={plusIcon} />
                        <p className=''>Create new list</p>
                    </div>
                </div>
            </Container>

            {isHistoryOpened ? <History handleState={handleState}/> : null}
            
        </header>
    );
}

export default Header;