import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, createNewTask, updateActivity, resetTask } from '../redux/reducers/taskSlice';
import plusIcon from '../images/plus_icon.png';
import Task from './Task';

type TaskStatusProps = {
    id: number,
    status: string,
    amount: number,
    visibilityChange: any   
}

type TaskTypes = {
    listId: number;
    id: number;
    name: string;
    description: any;
    date: any;
    priority: any;
}

function TaskStatus({ id, status, amount, visibilityChange }: TaskStatusProps) {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const lists = useSelector((state: RootState) => state.list.lists);
    const dispatch = useDispatch();
    const a: any = []
    const [visibility, setVisibility] = useState('hidden');
    const [tasksList, setTasksList] = useState(a)

    useEffect(() => {
        axios.get('http://localhost:8001/tasks').then((res) => {
            dispatch(updateTask(res.data))
            setTasksList(res.data)
        });
    }, [])

    const createTask = async () => {
        // const listId = lists.filter((list) => list.name == status);
        console.log(tasksList);


        const createdTask = await axios.post('http://localhost:8001/tasks', {
            name: 'New Task', listId: id, status: status, date: 'Wed, 19 Apr', priority: 'low', description: 'Your description'
        })
        setTasksList([...tasksList, createdTask.data])
        dispatch(createNewTask(createdTask.data))

    }

    // const filteredTasks =
    //     tasks.filter(task => {task.list?.name == status})
    //     .map(task => {
    //         return <Task
    //         id={task.id}
    //         name={task.name}
    //         description={task.description || 'Task descriptions should be unambiguous, accurate, factual.'}
    //         date={task.date || 'Wed, 19 Apr'}
    //         priority={task.priority || 'Low'}
    //         visibilityChange={visibilityChange}/>
    //     })

    // const filteredTasks = tasks.map(task => {
    //     // console.log(task);
    //     if(task.listId == id) {
    //         return <Task
    //         id={task.id}
    //         name={task.name}
    //         description={task.description || 'Task descriptions should be unambiguous, accurate, factual.'}
    //         date={task.date || 'Wed, 19 Apr'}
    //         priority={task.priority || 'Low'}
    //         visibilityChange={visibilityChange}/>
    //     }
    //     else {
    //         return null
    //     }


    return (
        <div className='task-status__column'>
            <div className='task-status__data-block'>
                <p className='task-status__name'>{status}</p>

                <div className='task-status__details'>
                    <p className='task-status__amount'>{amount}</p>
                    <p className='actions'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </p>
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
                                visibilityChange={visibilityChange} />
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