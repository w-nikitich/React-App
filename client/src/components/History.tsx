import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { updateAllTasks } from '../redux/reducers/taskSlice';
import { createNewActivity, resetHistory, updateHistory } from '../redux/reducers/historySlice';
import { getAllLists } from '../redux/reducers/listSlice';
import { handleDate } from '../helpers/helpers';

type HistoryProps = {
    handleState?: any,
    id?: number
}

interface TaskList {
    id: number,
    name: string
}

interface Task {
    id: number,
    name: string,
    listId?: number
}

function History({ handleState, id }: HistoryProps) {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const lists = useSelector((state: RootState) => state.list.lists);
    const history = useSelector((state: RootState) => state.history.history);
    const dispatch = useDispatch()

    const [taskState, setTaskState] = useState<Task[]>(tasks);
    const [listState, setListState] = useState<TaskList[]>(lists);

    useEffect(() => {
        axios.get('http://localhost:8001/taskLists').then((res) => {
            dispatch(getAllLists(res.data));
            setListState(res.data);
        })
        axios.get('http://localhost:8001/tasks').then((res) => {
            dispatch(updateAllTasks(res.data));
            setTaskState(res.data);
        })
    }, [])

    return (
        <div className='history'>
            <div className='history__title'>
                <p className='history__title-text'>History</p>
                <span onClick={() => handleState(false)}></span>
            </div>

            {history.map((log: any) => {
                if (history.length > 0) {
                    return <div className='history__log'>
                        {(log.type === 'create list') ?
                            <p>You created list
                                <span className='history__log-decor list'>{log.listName}</span>
                            </p>
                            : null}
                        {(log.type === 'create task') ?
                            <p>You added
                                <span className='history__log-decor task'>{log.taskName}</span>
                                to the
                                <span className='history__log-decor list'>{log.listName}</span>
                            </p>
                            : null
                        }
                        {(log.type === 'delete list') ?
                            <p>You deleted
                                <span className='history__log-decor list'>{log.listName}</span>
                            </p>
                            : null
                        }
                        {log.type === 'delete task' ?
                            <p>You deleted
                                <span className='history__log-decor task'>{log.taskName}</span>
                                from
                                <span className='history__log-decor list'>{log.listName}</span>
                            </p>
                            : null
                        }
                        {(log.type === 'update list') ?
                            <p>You renamed
                                <span className='history__log-decor list'>{log.oldData}</span>
                                to
                                <span className='history__log-decor list'>{log.listName}</span>
                            </p>
                            : null
                        }
                        {log.type === 'move task' ?
                            <p>You moved
                                <span className='history__log-decor task'>{log.taskName}</span>
                                from
                                <span className='history__log-decor list'>{log.oldData}</span>
                                to
                                <span className='history__log-decor list'>{log.listName}</span>
                            </p>
                            : null
                        }
                        {log.type === 'rename task' ?
                            <p>You renamed
                                <span className='history__log-decor task'>{log.oldData}</span>
                                to
                                <span className='history__log-decor task'>{log.taskName}</span>
                            </p>
                            : null
                        }
                        {log.type === 'change priority' ?
                            <p>You changed the priority
                                <span className='history__log-decor task'>{log.taskName}</span>
                                from
                                <span className='history__log-decor list'>{log.oldData}</span>
                                to
                                <span className='history__log-decor list'>{log.newData}</span>
                            </p>
                            : null
                        }
                        {log.type === 'change description' ?
                            <p>You changed the description
                                <span className='history__log-decor task'>{log.taskName}</span>
                            </p>
                            : null
                        }

                        <p className='history__log-time'>{handleDate(log.createdAt)}</p>
                    </div>
                }
            })}
        </div>
    );
}

export default History;