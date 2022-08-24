import React, {useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {updateTaskState, removeTask} from './tasksReducer';
import {TasksStatuses} from '../../api/tasksAPI';
import {RequestStatusType} from '../../App/appReducer';
import {EditableSpan} from '../../components';
import {useAppDispatch} from '../../App';
import {style} from '../TodoList';

type TaskPropsType = {
    todoListId: string
    taskId: string
    status: number
    taskTitle: string
    entityStatus: RequestStatusType
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             todoListId,
                                                             taskId,
                                                             status,
                                                             taskTitle,
                                                             entityStatus
}) => {
    const dispatch = useAppDispatch();

    const onInputCheckboxChange = useCallback(() => {
        let statusVal: number;
        if (status === TasksStatuses.New) {
            statusVal = TasksStatuses.Completed;
        }else {
            statusVal = TasksStatuses.New;
        }
        dispatch(updateTaskState({todoListId, taskId, domainModel: {status: statusVal}}));
    }, [status, todoListId, taskId]);

    const onInputTitleChange = useCallback((title: string) => {
        dispatch(updateTaskState({todoListId, taskId, domainModel: {title}}));
    }, [todoListId, taskId]);

    const onRemoveTask = useCallback(() => {
        dispatch(removeTask({todoListId, taskId}));
    }, [todoListId, taskId]);

    return (

        <ListItem
            divider
            disablePadding
            key={taskId}
            className={status === TasksStatuses.Completed ? style.isDone : ''}
        >

            <IconButton
                disabled={entityStatus === 'loading'}
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
                disabled={entityStatus === 'loading'}
                title={taskTitle}
                changeTitleHandler={(title) => onInputTitleChange(title)}
                key={taskId}
            />

        </ListItem>
    );
});