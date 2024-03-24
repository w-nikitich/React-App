import React, { useEffect, useState } from 'react';
import TaskCreation from './TaskCreation';

type TaskComponentProps = {
    visibility?: string,
    visibilityChange?: any
} 

function TaskComponent({visibility, visibilityChange}: TaskComponentProps) {
    return (
        <div>
            <TaskCreation visibility={visibility}/>
        </div>
    ); 
}

export default TaskComponent;