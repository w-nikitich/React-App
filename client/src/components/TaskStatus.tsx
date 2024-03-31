import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllTasks, createNewTask, updateActivity, resetTask } from '../redux/reducers/taskSlice';
import { resetList, updateList } from '../redux/reducers/listSlice';
import plusIcon from '../images/plus_icon.png';
import Task from './Task';
import Actions from './Actions';

type TaskStatusProps = {
    id: number,
    status: string,
    amount: number,
    visibilityChange: any,
    defineId: any
}

type TaskTypes = {
    listId: number;
    id: number;
    name: string;
    description: any;
    date: any;
    priority: any;
}

function TaskStatus({ id, status, amount, visibilityChange,defineId }: TaskStatusProps) {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const lists = useSelector((state: RootState) => state.list.lists);
    const dispatch = useDispatch();

    // LOCAL STATES
    const [visibility, setVisibility] = useState('hidden');
    const [actions, setActions] = useState('hidden');
    const [tasksList, setTasksList] = useState<any>([])
    const [isEditMode, setIsEditMode] = useState(false);
    const [statusName, setStatusName] = useState(status);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8001/tasks').then((res) => {
            dispatch(updateAllTasks(res.data))
            setTasksList((prevState: any) => {
                const updatedList = prevState.filter((task: any) => res.data.includes(task))
                return [...updatedList, ...res.data.filter((task: any) => !updatedList.includes(task))]
            }); 
        });  
    }, [amount, lists])         

    useEffect(() => {
        console.log(isDeleted)
        setIsDeleted(false);
    }, [isDeleted])

    const createTask = async () => {
        const createdTask = await axios.post('http://localhost:8001/tasks', {
            name: 'New Task', listId: id, status: status, date: 'Wed, 19 Apr', priority: 'low', description: 'Your description'
        })
        dispatch(updateList({data: {id: id, name: status, amount: amount++}}))
        setTasksList([...tasksList, createdTask.data])
        dispatch(createNewTask(createdTask.data))
    }

    const deleteList = async () => {
        await axios.delete(`http://localhost:8001/taskLists/${id}`)
        const toDeleteTasks = tasksList.filter((task: any) => task.listId === id)
        toDeleteTasks.forEach((task: any) => {
            axios.delete(`http://localhost:8001/tasks/${id}`).then((res) => {
                dispatch(resetTask({id: id}));
            })
        })

        dispatch(resetList({id: id})); 
        setIsDeleted(true);
    }

    function handleActions() {
        if (actions === 'hidden') {
            setActions('visible')
        }
        else {
            setActions('hidden')
        }
    }

    function updateState(isEditMode: any) {
        setIsEditMode(isEditMode);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            console.log(statusName)
            axios.patch(`http://localhost:8001/taskLists/${id}`, {name: statusName})
            .then((res) => {
                console.log(res.data)
                dispatch(updateList({data: {id: id, name: res.data.name, amount: res.data.amount}}))
            })
            .catch((error) => {
                console.error(error)
            })
            setIsEditMode(false)
        }
    }

    function handleId(id: number) {
        defineId(id)
    }

    return (
        <div className='task-status__column'>
            <div className='task-status__data-block'>

                {isEditMode ? 
                    <input
                        className='task-status__name-change'
                        type='text'
                        value={statusName}
                        onChange={(e) => setStatusName(e.target.value)}
                        onKeyDown={handleKeyDown}/>
                    : <p className='task-status__name'>{status}</p>
                }

                <div className='task-status__details'>
                    <p className='task-status__amount'>{amount}</p>
                    <p className='actions' onClick={() => {handleActions()}}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </p>  

                    {actions === 'visible' ? <Actions visibility={actions} isTaskList={true} isEditMode={isEditMode} setIsEditMode={updateState} createTask={createTask} deleteList={deleteList} nameOfBlock={'list'}/> : null}

                </div>
            </div>

            <div className='task-status__add-new' onClick={createTask}>
                <img className='icon' src={plusIcon} alt='plus' />
                <p>Add new card</p>
            </div>

            <div>
                {tasksList.map((task: TaskTypes) => {
                    try {
                        if (task?.listId == id) {
                            return <Task
                                id={task.id}
                                name={task.name}
                                description={task.description || 'Task descriptions should be unambiguous, accurate, factual.'}
                                date={task.date || 'Wed, 19 Apr'}
                                priority={task.priority || 'Low'}
                                visibilityChange={visibilityChange}
                                defineId={(id: number) => handleId(task.id)}/>
                        }
                    }
                    catch (error) {
                        console.error(error)
                    }
                })}
            </div>
        </div>
    );
}
export default TaskStatus;