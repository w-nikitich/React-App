import React, { useEffect, useState, useRef,KeyboardEvent } from 'react';
import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, resetTask } from '../redux/reducers/taskSlice';
import editIcon from '../images/edit_icon.png';
import statusIcon from '../images/status_icon.png';
import calendarIcon from '../images/calendar_icon.png';
import priorityIcon from '../images/priority_icon.png';

type TaskCreationProps = {
    visibility?: string,
    visibilityChange?: any,
    defineId: any
    id: number
}

function TaskEditing({ visibility, visibilityChange, defineId, id }: TaskCreationProps) {
    const tasks = useSelector((state: RootState) => state.task.tasks)
    const dispatch = useDispatch()

    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('')

    useEffect(() => {
        findTask()
    }, [])

    function findTask() {
        const taskId =  tasks.findIndex(task => task.id == id)
        console.log(tasks)
        // setName(tasks[taskId].name)
    }   

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key ===  'Enter') {
            // state save
            // const newTaskObject = 
            // dispatch(updateTask({name: name}))
            // console.log(task)
            // setIsEditMode(false);
        }
    }

    return (
        <div className={`task-creation ${visibility}`}>
            <div className='task-creation__close-block'>
                <span className='close' onClick={() => { visibilityChange('hidden') }}></span>
            </div>

            <div className='task-creation__info'>
                <div className='task-creation__data-block'>
                    <div className='task-creation__name-block'>
                        {/* PLACEHOLDER IS PREVIOUS STORE DATA */}
                        {isEditMode
                            ?
                            <input
                                className='task-creation__name edit'
                                type='text'
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}/>
                            :
                            <p className='task-creation__name visible'>{name}</p>
                        }

                        <div className='task-creation__edit-block' onClick={() => setIsEditMode(!isEditMode)}>
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

                            <div className='task-creation__data'>
                                <p className='task-creation__status'>In propgress</p>
                            </div>
                        </div>
                        <div className='task-creation__details'>
                            <div className='task-creation__details-title'>
                                <img className='icon calendar' src={calendarIcon} alt='calendar icon' />
                                <p className='task-creation__title'>Due date</p>
                            </div>

                            {/* calendar */}
                            <div className='task-creation__data'>
                                <p className='task-creation__date'>Wed, 14</p>
                            </div>
                        </div>
                        <div className='task-creation__details'>
                            <div className='task-creation__details-title'>
                                <img className='icon priority' src={priorityIcon} alt='priority icon' />
                                <p className='task-creation__title'>Priority</p>
                            </div>

                            {/* Choose */}
                            <div className='task-creation__data'>
                                <p className='task-creation__priority'>Low</p>
                            </div>
                        </div>
                    </div>

                    <div className='task-creation__description-block'>
                        <p className='task-creation__description-title'>Description</p>
                        <p className='task-creation__description'>My description, What I whant that I and write here !!!!! THIS IS MY DESCRIPTION!!!!! DO NOW!!!!! MINE DESCRIPTION121!!! gjhdfjgh  aaguhdaughduf dfg dfuigh adudfg njddgh dg dg ydg udgudg </p>
                    </div>
                </div>

                <div className='task-creation__activity-block'>
                    <p className='task-creation__activity-title'>Activity</p>
                </div>
            </div>
        </div>
    );
}

export default TaskEditing;