import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { handleDate } from '../helpers/helpers';

type ActivityProps = {
    taskId: number,
    type: string,
    logObj: any
}

function Activity({ taskId, type, logObj }: ActivityProps) {
    return (
        <div className='activity__log'>
            {type === 'create task' ?
                <p>You added
                    <span className='activity__log-decor task'>{logObj.taskName}</span>
                    to the
                    <span className='activity__log-decor list'>{logObj.listName}</span>
                </p>
                : null
            }
            {type === 'delete task' ?
                <p>You deleted
                    <span className='activity__log-decor task'>{logObj.taskName}</span>
                    from
                    <span className='activity__log-decor list'>{logObj.listName}</span>
                </p>
                : null
            }
            {type === 'move task' ?
                <p>You moved
                    <span className='activity__log-decor task'>{logObj.taskName}</span>
                    from
                    <span className='activity__log-decor list'>{logObj.oldData}</span>
                    to
                    <span className='activity__log-decor list'>{logObj.listName}</span>
                </p>
                : null
            }
            {type === 'rename task' ?
                <p>You renamed
                    <span className='activity__log-decor task'>{logObj.oldData}</span>
                    to
                    <span className='activity__log-decor task'>{logObj.taskName}</span>
                </p>
                : null
            }
            {type === 'change priority' ?
                <p>You changed the priority
                    <span className='activity__log-decor task'>{logObj.taskName}</span>
                    from
                    <span className='activity__log-decor list'>{logObj.oldData}</span>
                    to
                    <span className='activity__log-decor list'>{logObj.newData}</span>
                </p>
                : null
            }
            {type === 'change description' ?
                <p>You changed the description
                    <span className='activity__log-decor task'>{logObj.taskName}</span>
                </p>
                : null
            }

            <p className='activity__log-time'>{handleDate(logObj.createdAt)}</p>
        </div>
    );
}

export default Activity;