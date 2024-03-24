import React, { useEffect, useState, useRef } from 'react';
import editIcon from '../images/edit_icon.png';
import statusIcon from '../images/status_icon.png';
import calendarIcon from '../images/calendar_icon.png';
import priorityIcon from '../images/priority_icon.png';

type TaskCreationProps = {
    visibility?: string,
    visibilityChange?: any
}

function TaskCreation({ visibility, visibilityChange }: TaskCreationProps) {

    return (
        <div className={`task-creation ${visibility}`}>
            <div className='task-creation__close-block'>
                <span className='close' onClick={() => { visibilityChange('hidden') }}></span>
            </div>

            <div className='task-creation__info'>
                <div className='task-creation__data-block'>
                    <div className='task-creation__name-block'>
                        <p className='task-creation__name'>Task name</p>

                        <div className='task-creation__edit-block'>
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

export default TaskCreation;