import React, { useEffect, useState } from 'react';
import TaskEditing from './TaskEditing';

type TaskComponentProps = {
    visibility?: string,
    visibilityChange?: any
} 

function TaskComponent({visibility, visibilityChange}: TaskComponentProps) {
    return (
        <div>
            {/* <TaskEditing visibility={visibility}/> */}
        </div>
    ); 
}

export default TaskComponent;