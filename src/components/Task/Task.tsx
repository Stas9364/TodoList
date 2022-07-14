import React, {useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {EditableSpan} from '../common/EditableSpan';
import {updateTaskState, removeTask} from '../../bll/reducers/tasksReducer';
import {TasksStatuses} from '../../api/tasksAPI';
import style from '../TodoList/Todolist.module.css'
import {useAppDispatch} from "../../App/app/hooks";
import {RequestStatusType} from "../../bll/reducers/appReducer";

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