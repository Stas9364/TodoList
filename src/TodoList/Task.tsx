import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {changeCheckboxStatusAC, changeTaskTitleAC, removeTaskAC} from '../actions/tasksActions';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {EditableSpan} from './EditableSpan';

type TaskPropsType = {
    todoListId: string
    taskId: string
    isDone: boolean
    taskTitle: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             todoListId,
                                                             taskId,
                                                             isDone,
                                                             taskTitle
}) => {
    const dispatch = useDispatch();

    const onInputCheckboxChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCheckboxStatusAC(todoListId, taskId, event.target.checked));
    }, [todoListId, taskId]);

    const onInputTitleChange = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, title));
    }, [todoListId, taskId]);

    const OnClickRemoveTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(todoListId, taskId));
    }, [todoListId, taskId]);


    return (
        <ListItem divider disablePadding key={taskId} className={isDone ? 'is-done' : ''}>

            <IconButton
                color={'default'}
                onClick={OnClickRemoveTaskHandler}>
                <Delete/>
            </IconButton>

            <Checkbox
                color={'secondary'}
                onChange={(e) => onInputCheckboxChange(e)}
                checked={isDone}
            />

            <EditableSpan
                title={taskTitle}
                changeTitleHandler={(title) => onInputTitleChange(title)}
                key={taskId}
            />
        </ListItem>
    )
});