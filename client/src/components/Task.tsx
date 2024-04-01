import React, { useEffect, useState } from 'react';
import calendarIcon from '../images/calendar_icon.png'
import Actions from './Actions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { updateTask, resetTask } from '../redux/reducers/taskSlice';
import { createNewActivity } from '../redux/reducers/historySlice';

type TaskData = {
    id: number,
    curListId?: number,
    defineId?: any,
    name: string,
    description: string,
    date: string,
    priority: string,
    visibilityChange: any
}

function Task({ id, curListId, defineId, name, description, date, priority, visibilityChange }: TaskData) {
    const history = useSelector((state: RootState) => state.history.history);
    const lists = useSelector((state: RootState) => state.list.lists);
    const dispatch = useDispatch();

    const [actions, setActions] = useState('hidden');
    const [isEditMode, setIsEditMode] = useState(false);
    const [moveTo, setMoveTo] = useState('hidden');
    const [clickCount, setClickCount] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        defineId(id)
    }, [])

    useEffect(() => {
        if (isEditMode) {
            editTask(id);
            setActions('hidden');
        }
    }, [isEditMode])

    useEffect(() => {
        if (clickCount % 2 === 0) {
            setMoveTo('hidden')
        }
        else {
            setMoveTo('visible')
        }
    }, [clickCount])

    function editTask(id: number) {
        visibilityChange('visible')
        defineId(id)
    }

    function handleActions() {
        if (actions === 'hidden') {
            setActions('visible')
        }
        else {
            setActions('hidden')
        }
    }

    function handleClick() {
        setClickCount(prevState => prevState + 1)
    }

    function updateState(isEditMode: any) {
        setIsEditMode(isEditMode);
    }

    function updateList(id: number, listId: number) {
        axios.patch(`http://localhost:8001/tasks/${id}`, { listId: listId }).then((res) => {
            dispatch(updateTask({ id: id, updatedTask: res.data }))
        })

        axios.post('http://localhost:8001/history', {taskId: id, taskName: name, listId: listId, listName: lists.filter(list => list.id === listId)[0].name, oldData: `${lists.filter(list => list.id === curListId)[0].name}`, type: 'move task'}).then((res) => {
            dispatch(createNewActivity({createdLog: res.data}))
        })
    }

    async function deleteTask() {
        const deletedTask = await axios.delete(`http://localhost:8001/tasks/${id}`);
        axios.post('http://localhost:8001/history', {taskId: deletedTask.data.id, taskName: deletedTask.data.name, listId: deletedTask.data.listId, listName: lists.filter(list => list.id === deletedTask.data.listId)[0].name, type: 'delete task'}).then((res) => {
            dispatch(createNewActivity({createdLog: res.data}))
        })
        dispatch(resetTask({ id: id }));
        setIsDeleted(true);
    }

    return (
        <div className='task__block'>
            <div className='task__name-block'>
                <p className='task__name'>{name}</p>

                <p className='actions' onClick={() => handleActions()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </p>

                {actions === 'visible' ? <Actions visibility={actions} isTaskList={false} isEditMode={isEditMode} setIsEditMode={updateState} deleteTask={deleteTask} nameOfBlock={'task'} /> : null}
            </div>

            <div className='task__data-wrapper' onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.target as HTMLElement;
                
                if (target !== e.currentTarget) {
                    e.stopPropagation();
                }
                else {
                    editTask(id)
                }
            }}>
                <p className='task__description'>{description}</p>

                <div className='task__date-block'>
                    <img className='icon' src={calendarIcon} alt='calendar icon' />
                    <p className='task__date'>{date}</p>
                </div>

                <div className='task__priority-block'>
                    <span className={priority.toLowerCase()}></span>
                    <p className='task__priority'>{priority}</p>
                </div>

                <div className='task__move' onClick={handleClick}>
                    <p>Move to:</p>
                    <span></span>


                    <div className={`task__move-list ${moveTo}`}>
                        {lists.map((list: any) => {
                            return <p onClick={() => updateList(id, list.id)}>{list.name}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;