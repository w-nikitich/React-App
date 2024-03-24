import React from 'react';
import plusIcon from '../images/plus_icon.png';
import Task from './Task';

type TaskStatusProps = {
    status: string,
    amount: number
}

function TaskStatus({status, amount} : TaskStatusProps) {
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

            <div className='task-status__add-new'>
                <img className='icon' src={plusIcon} alt='plus'/>
                <p>Add new card</p>
            </div>

            {/* TASK COMPONENT */}
            <Task name='Task name' description='your description' date='wed 14' priority='low'/>
        </div>
    );
}

export default TaskStatus;