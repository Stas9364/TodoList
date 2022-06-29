import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {EditableSpan} from '../common/EditableSpan';
import {updateTaskState, removeTask} from '../reducers/tasksReducer';
import {TasksStatuses} from './tasksAPI';
import style from '../../src/TodoList/Todolist.module.css'
import {Dispatch} from 'redux';

type TaskPropsType = {
    todoListId: string
    taskId: string
    status: number
    taskTitle: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             todoListId,
                                                             taskId,
                                                             status,
                                                             taskTitle
}) => {
    const dispatch: Dispatch<any> = useDispatch();

    const onInputCheckboxChange = useCallback(() => {

        let statusVal: number;

        if (status === TasksStatuses.New) {
            statusVal = TasksStatuses.Completed;
        }else {
            statusVal = TasksStatuses.New;
        }

        dispatch(updateTaskState(todoListId, taskId, {status: statusVal}));
    }, [status, todoListId, taskId]);

    const onInputTitleChange = useCallback((title: string) => {
        dispatch(updateTaskState(todoListId, taskId, {title}));
    }, [todoListId, taskId]);

    const onRemoveTask = useCallback(() => {
        dispatch(removeTask(todoListId, taskId));
    }, [todoListId, taskId]);

    return (
        <ListItem
            divider
            disablePadding
            key={taskId}
            className={status === TasksStatuses.Completed ? style.isDone : ''}
        >

            <IconButton
                color={'default'}
                onClick={onRemoveTask}>
                <Delete/>
            </IconButton>

            <Checkbox
                color={'secondary'}
                onClick={onInputCheckboxChange}
                checked={status === TasksStatuses.Completed}
            />

            <EditableSpan
                title={taskTitle}
                changeTitleHandler={(title) => onInputTitleChange(title)}
                key={taskId}
            />
        </ListItem>
    )
});