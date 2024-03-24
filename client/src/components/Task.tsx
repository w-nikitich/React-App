import React from 'react';
import calendarIcon from '../images/calendar_icon.png'

type TaskData = {
    name: string,
    description: string,
    date: string,
    priority: string
}

function Task({name, description, date, priority}:TaskData) {
    return (
        <div className='task__block'>
            <div className='task__name-block'>
                <p className='task__name'>{name}</p>

                <p className='actions'>
                    <span></span>
                    <span></span>
                    <span></span>
                </p>
            </div>

            <p className='task__description'>{description}</p>

            <div className='task__date-block'>
                <img className='icon' src={calendarIcon} alt='calendar icon'/>
                <p className='task__date'>{date}</p>
            </div>

            <div className='task__priority-block'>
                <span className={priority.toLowerCase()}></span>
                <p className='task__priority'>{priority}</p>
            </div>

            <div className='task__move'>
                <p>Move to:</p>
                <span></span>
            </div>
        </div>
    );
}

export default Task;