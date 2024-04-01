import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Container from 'react-bootstrap/Container';
import type { RootState } from '../redux/store';
import { updateAllTasks, resetTask, updateTask } from '../redux/reducers/taskSlice';
import { createList, updateList, getAllLists, resetList } from '../redux/reducers/listSlice';
import TaskStatus from './TaskStatus';
import TaskEditing from './TaskEditing';
import { createNewActivity } from '../redux/reducers/historySlice';

function Main() {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const lists = useSelector((state: RootState) => state.list.lists);
    const dispatch = useDispatch();

    const [visibility, setVisibility] = useState('hidden');
    const [listsState, setListsState] = useState(lists)
    const [id, setId] = useState(0);
    const [boardData, setBoardData] = useState(lists);

    useEffect(() => {
        axios.get('http://localhost:8001/taskLists').then((res) => {
            dispatch(getAllLists(res.data))
        });

        axios.get('http://localhost:8001/tasks').then((res) => {
            dispatch(updateAllTasks(res.data))
        });
    }, [visibility])

    function handleState(visibility: string) {
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

    const handleDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        try {   
            axios.patch(`http://localhost:8001/tasks/${draggableId}`, {listId: destination.droppableId}).then((res) => {
                console.log(res.data)
                dispatch(updateTask({id: draggableId, updatedTask: res.data}))
            })
    
            axios.post('http://localhost:8001/history', {taskId: draggableId, taskName: tasks.filter(task => task.id == draggableId)[0].name, listId: destination.droppableId, listName: lists.filter(list => list.id == destination.droppableId)[0].name, type: 'move task', oldData: `${lists.filter(list=> list.id == source.droppableId)[0].name}`}).then((res) => {
                dispatch(createNewActivity({createdLog: res.data}));
            })
        }
        catch(error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Container>
                {visibility ? <TaskEditing visibility={visibility} visibilityChange={handleState} defineId={handleId} id={id} /> : null}

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className='main__task-lists'>
                        {lists.map((value: any, index: any) => (
                            <div className='task-status__column'>
                                <TaskStatus id={value.id} status={value.name} amount={findAmount(value.id)} visibilityChange={handleState} defineId={handleId} />
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </Container>
        </main>
    );
}

export default Main;