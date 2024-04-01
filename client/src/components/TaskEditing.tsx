import React, { useEffect, useState, useRef, KeyboardEvent, useReducer } from 'react';
import Calendar from 'react-calendar'
import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateAllTasks, updateTask, resetTask } from '../redux/reducers/taskSlice';
import { createNewActivity, updateHistory } from '../redux/reducers/historySlice';
import Activity from './Activity';
import editIcon from '../images/edit_icon.png';
import statusIcon from '../images/status_icon.png';
import calendarIcon from '../images/calendar_icon.png';
import priorityIcon from '../images/priority_icon.png';

type TaskCreationProps = {
    visibility?: string,
    visibilityChange?: any,
    defineId: any,
    id: number
}

type Task = {
    id: number,
    name: string,
    listId: number,
    date: string,
    priority: string,
    description: string
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function TaskEditing({ visibility, visibilityChange, defineId, id }: TaskCreationProps) {
    const tasks = useSelector((state: RootState) => state.task.tasks)
    const lists = useSelector((state: RootState) => state.list.lists)
    const history = useSelector((state: RootState) => state.history.history)
    const dispatch = useDispatch()

    const currentDate = new Date();

    const [isEditMode, setIsEditMode] = useState({
        isName: false,
        isStatus: false,
        isDate: false,
        isPriority: false,
        isDescription: false
    });
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [task, setTask] = useState<Task | null>(null);
    const [taskId, setTaskId] = useState(0);
    const [listObj, setListObj] = useState<any>([]);
    const [date, setDate] = useState<Value>(new Date());

    useEffect(() => {
        if (visibility === 'visible') {
            findTask();
            setName(tasks[taskId].name)

            axios.get('http://localhost:8001/history').then((res) => {
                dispatch(updateHistory(res.data))
            })
        }

    }, [visibility, taskId, listObj]);

    useEffect(() => {
        if (taskId !== -1 && tasks.length > 0) {
            const gettedObj = lists.filter((list) => list.id === tasks[taskId].listId)
            setListObj(gettedObj)

            setTask(prevState => (tasks[taskId] as Task))
        }

    }, [taskId, tasks])

    function findTask() {
        defineId(id)
        const findTaskId = tasks.findIndex(task => task.id === id)
        setTaskId(findTaskId);
    }

    async function handleKeyDown(e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            const oldTask = { ...task } as Task;
            const updatedTask = { ...task, name: name, description: description } as Task;
            setTask(updatedTask)

            if (description !== oldTask.description) {
                axios.patch(`http://localhost:8001/tasks/${id}`, {description: updatedTask.description })
                .then((res: any) => {
                    dispatch(updateTask({ id: id, updatedTask: updatedTask }))
                })
                .catch((error) => {
                    console.error(error);
                })

                axios.post('http://localhost:8001/history', { taskId: id, taskName: updatedTask.name, type: 'change description' }).then((res) => {
                    dispatch(createNewActivity({ createdLog: res.data }))
                })
            }
            else {
                axios.patch(`http://localhost:8001/tasks/${id}`, { name: updatedTask.name })
                    .then((res: any) => {
                        dispatch(updateTask({ id: id, updatedTask: updatedTask }))
                    })
                    .catch((error) => {
                        console.error(error);
                    })

                axios.post('http://localhost:8001/history', { taskId: id, taskName: updatedTask.name, type: 'rename task', oldData: `${oldTask.name}` }).then((res) => {
                    dispatch(createNewActivity({ createdLog: res.data }))
                })
            }

            setIsEditMode((prevState) => ({ ...prevState, isName: false, isDescription: false }));
        }
    }

    function handleDateChange(date: any) {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const chosenDate = `${dayOfWeek}, ${day} ${month}`;
        setDate(date)
        axios.patch(`http://localhost:8001/tasks/${id}`, { date: chosenDate }).then((res) => {
            dispatch(updateTask({ id: id, updatedTask: { ...task, date: chosenDate } }))
        })
    }

    function handlePriorityChange(priority: string, curPriority?: string) {
        axios.patch(`http://localhost:8001/tasks/${id}`, { priority: priority }).then(() => {
            dispatch(updateTask({ id: id, updatedTask: { ...task, priority: priority } }))
            setTask((prevState: any) => (
                { ...prevState, priority: priority }
            ))
        })

        axios.post('http://localhost:8001/history', { taskId: id, taskName: name, newData: priority, type: 'change priority', oldData: `${curPriority}` }).then((res) => {
            dispatch(createNewActivity({ createdLog: res.data }));
        })
    }

    return (
        <div className={`task-creation ${visibility}`}>
            <div className='task-creation__close-block'>
                <span
                    className='close'
                    onClick={() => {
                        visibilityChange('hidden'); setIsEditMode({ isName: false, isDate: false, isStatus: false, isPriority: false, isDescription: false });
                    }}>
                </span>
            </div>

            <div className='task-creation__info'>
                <div className='task-creation__data-block'>
                    <div className='task-creation__name-block'>
                        {/* PLACEHOLDER IS PREVIOUS STORE DATA */}
                        {isEditMode.isName
                            ?
                            <input
                                className='task-creation__name edit'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown} />
                            :
                            <p className='task-creation__name visible'>{name}</p>
                        }

                        <div className='task-creation__edit-block' onClick={() => {
                            if ((isEditMode.isName || isEditMode.isDate || isEditMode.isStatus || isEditMode.isPriority || isEditMode.isDescription) === true) {
                                setIsEditMode({ isName: false, isDate: false, isStatus: false, isPriority: false, isDescription: false });
                            }
                            else {
                                setIsEditMode({ isName: true, isDate: true, isStatus: false, isPriority: false, isDescription: true });
                            }
                        }}>
                            <img className='icon' src={editIcon} alt='edit' />
                            <p className='task-creation__edit'>Edit task</p>
                        </div>
                    </div>

                    <div className='task-creation__details-block'>
                        <div className='task-creation__details'>
                            <div className='task-creation__details-title'>
                                <img className='icon' src={statusIcon} alt='status icon' />
                                <p className='task-creation__title'>Status</p>
                            </div>

                            <div className='task-creation__data' onClick={() => { setIsEditMode((prevState) => ({ ...prevState, isStatus: !isEditMode.isStatus })) }}>
                                <p className='task-creation__status'>{listObj[0]?.name}</p>

                                {isEditMode.isStatus ?
                                    <div className='task-creation__status-change'>
                                        {lists.map((list, index) => {
                                            return <p
                                                className='task-creation__status'
                                                onClick={() => {
                                                    axios.patch(`http://localhost:8001/tasks/${id}`, { listId: list.id }).then(() => {
                                                        dispatch(updateTask({ id: id, updatedTask: { ...task, listId: list.id } }))
                                                        setListObj((prevState: any) => (
                                                            { ...prevState[0], name: list.name }
                                                        ))
                                                    })

                                                    axios.post('http://localhost:8001/history',
                                                        { taskId: id, taskName: name, listId: list.id, listName: list.name, type: 'move task', oldData: `${listObj[0]?.name}` }
                                                    ).then((res: any) => {
                                                        dispatch(createNewActivity({ createdLog: res.data }))
                                                    })
                                                }}>{list.name}</p>
                                        })}
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <div className='task-creation__details'>
                            <div className='task-creation__details-title'>
                                <img className='icon calendar' src={calendarIcon} alt='calendar icon' />
                                <p className='task-creation__title'>Due date</p>
                            </div>

                            {/* calendar */}
                            <div className='task-creation__data' onClick={() => { setIsEditMode((prevState) => ({ ...prevState, isDate: true })) }}>
                                <p className='task-creation__date'>{task?.date}</p>


                                {isEditMode.isDate ?
                                    <div className='task-creation__date-change'>
                                        <Calendar
                                            className='custom-calendar'
                                            value={date}
                                            onChange={handleDateChange}
                                        ></Calendar>
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <div className='task-creation__details'>
                            <div className='task-creation__details-title'>
                                <img className='icon priority' src={priorityIcon} alt='priority icon' />
                                <p className='task-creation__title'>Priority</p>
                            </div>

                            {/* Choose */}
                            <div className='task-creation__data' onClick={() => { setIsEditMode((prevState) => ({ ...prevState, isPriority: !isEditMode.isPriority })) }}>
                                <p className='task-creation__priority'>{task?.priority}</p>

                                {isEditMode.isPriority ?
                                    <div className='task-creation__priority-change'>
                                        <p
                                            className='task-creation__priority'
                                            onClick={() => { handlePriorityChange('Low', task?.priority) }}>Low</p>
                                        <p
                                            className='task-creation__priority'
                                            onClick={() => { handlePriorityChange('Medium', task?.priority) }}>Medium</p>
                                        <p
                                            className='task-creation__priority'
                                            onClick={() => { handlePriorityChange('High', task?.priority) }}>High</p>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>

                    <div className='task-creation__description-block'>
                        <p className='task-creation__description-title'>Description</p>

                        {isEditMode.isDescription
                            ?
                            <textarea
                                className='task-creation__description edit'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onKeyDown={handleKeyDown}></textarea>
                            :
                            <p className='task-creation__description'>{task?.description}</p>
                        }
                    </div>
                </div>

                <div className='task-creation__activity-block'>
                    <p className='task-creation__activity-title'>Activity</p>

                    {history.map((log, index) => {
                        if (log.taskId === id) {
                            return <Activity taskId={id} type={log.type} logObj={log}/>
                        }
                        else return null;
                    })} 

                </div>
            </div>
        </div>
    );
}

export default TaskEditing;