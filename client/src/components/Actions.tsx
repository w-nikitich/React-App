import React, { useEffect, useState } from 'react';
import editIcon from '../images/edit_icon.png';
import plusIcon from '../images/plus_icon.png'
import trashIcon from '../images/trash_icon.png';

type ActionsProps = {
    visibility: string,
    isTaskList: boolean,
    isEditMode: boolean,
    setIsEditMode: any,
    nameOfBlock: string
    createTask?: any,
    deleteList?: any,
    deleteTask?: any
}

function Actions({ visibility, isTaskList, isEditMode, setIsEditMode, nameOfBlock, createTask, deleteList, deleteTask }: ActionsProps) {

    function handleCange() {
        setIsEditMode(true)
    }

    return (
        <div className={`actions-block ${visibility} ${nameOfBlock}`}>
            <div className='actions__edit' onClick={handleCange}>
                <img className='icon' src={editIcon} />
                <p className='actions__edit-text'>Edit</p>
            </div>

            { isTaskList === true ?
            <div className='actions__add' onClick={createTask}>
                <img className='icon plus' src={plusIcon} />
                <p className='actions__add-text'>Add new card</p>
            </div>
            : null}


            {nameOfBlock === 'list' ? 
                <div className='actions__delete' onClick={deleteList}>
                    <img className='icon' src={trashIcon} />
                    <p className='actions__delete-text'>Delete</p>
                </div>
                :
                <div className='actions__delete' onClick={deleteTask}>
                <img className='icon' src={trashIcon} />
                <p className='actions__delete-text'>Delete</p>
            </div>
            }

        </div>
    )
}

export default Actions;