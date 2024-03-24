import React, { useEffect, useState } from 'react';
import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, resetTask } from '../redux/reducers/taskSlice';
import plusIcon from '../images/plus_icon.png';
import Task from './Task';

type TaskStatusProps = {
    status: string,
    amount: number,
    visibilityChange: any
}

function TaskStatus({ status, amount, visibilityChange }: TaskStatusProps) {
    const task = useSelector((state: RootState) => state.task)
    const dispatch = useDispatch()

    const [visibility, setVisibility] = useState('hidden');

    function createTask() {
        visibilityChange('visible')
    }

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

            <div className='task-status__add-new' onClick={() => createTask()}>
                <img className='icon' src={plusIcon} alt='plus' />
                <p>Add new card</p>
            </div>

            {/* TASK COMPONENT */}
            <Task
                name={task.name}
                description={task.description || 'Task descriptions should be unambiguous, accurate, factual.'}
                date={task.date || 'Wed, 19 Apr'}
                priority={task.priority || 'Low'} />
        </div>
    );
}

export default TaskStatus;