import React, { useEffect, useState, useRef } from 'react';
import editIcon from '../images/edit_icon.png';
import statusIcon from '../images/status_icon.png';

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
            <div className='task-creation__data'>

                <div className='task-creation__name-block'>
                    <p className='task-creation__name'>Task name</p>

                    <div className='task-creation__edit-block'>
                        <img className='icon' src={editIcon} alt='edit' />
                        <p className='task-creation__edit'>Edit task</p>
                    </div>
                </div>

                <div className='task-creation__details-block'>
                    <div className='task-creation__details'>
                        <div className=''>
                            <img className='icon' src={statusIcon} alt='status icon'/>
                            <p>Status</p>
                        </div>
                        <p></p>
                    </div>
                    <div className='task-creation__details'>

                    </div>
                    <div className='task-creation__details'>

                    </div>
                </div>
            </div>

            <div className='task-creation__activity'>

            </div>
        </div>
    );
}

export default TaskCreation;