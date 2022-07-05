import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../common/AddItemForm';
import {EditableSpan} from '../common/EditableSpan';
import {Button, IconButton, List} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {changeTodoListFilterValueAC} from '../../bll/actions/todoListsActions';
import {TasksStatuses} from '../../api/tasksAPI';
import {changeTitle, removeTodo} from '../../bll/reducers/todoListsReducer';
import {createTask, getTasks} from '../../bll/reducers/tasksReducer';
import {useAppDispatch, useAppSelector} from '../../App/app/hooks';
import {Task} from '../Task/Task';
import {RequestStatusType} from "../../bll/reducers/appReducer";

export type FilterValueType =
    | 'Active'
    | 'Completed'
    | 'All';

type PropsType = {
    id: string
    title: string
    filter: FilterValueType
    entityStatus: RequestStatusType
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                             id,
                                                             title,
                                                             filter,
                                                             entityStatus
                                                         }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasks(id));
    }, [id]);

    const tasks = useAppSelector(state => {
        return state.tasksInitState.tasks.filter(t => t.todoListId === id);
    });

    const addNewTask = useCallback((value: string) => {
        dispatch(createTask(id, value));
    }, [id]);

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTitle(id, title));
    }, [id]);

    const changeFilter = useCallback((filter: FilterValueType) => {
        dispatch(changeTodoListFilterValueAC(id, filter));
    }, [id]);

    const removeTodoList = useCallback(() => {
        dispatch(removeTodo(id));
    }, [id]);

    let allTasks = tasks;
    if (filter === 'Completed') {
        allTasks = allTasks.filter(el => el.status === TasksStatuses.Completed);
    }
    if (filter === 'Active') {
        allTasks = allTasks.filter(el => el.status === TasksStatuses.New);
    }

    return (
        <>
            <h3>
                <EditableSpan
                    title={title}
                    changeTitleHandler={(title) => changeTodoListTitle(title)}
                    key={id}
                />

                <IconButton
                    disabled={entityStatus === 'loading'}
                    color={'inherit'}
                    onClick={removeTodoList}
                >
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm
                addTodoListsElements={addNewTask}
                disabled={entityStatus === 'loading'}
            />

            <List>
                {allTasks.map(elem => {
                    return (

                        <Task
                            todoListId={id}
                            taskId={elem.id}
                            status={elem.status}
                            taskTitle={elem.title}
                            key={elem.id}
                            entityStatus={elem.entityStatus}
                        />

                    );
                })}
            </List>
            <div>

                <Button
                    size={'small'}
                    color={'inherit'}
                    onClick={() => changeFilter('All')}
                    variant={filter === 'All' ? 'contained' : 'outlined'}
                >All</Button>

                <Button
                    size={'small'}
                    color={'primary'}
                    variant={filter === 'Active' ? 'contained' : 'outlined'}
                    onClick={() => changeFilter('Active')}
                >Active</Button>

                <Button
                    size={'small'}
                    color={'secondary'}
                    variant={filter === 'Completed' ? 'contained' : 'outlined'}
                    onClick={() => changeFilter('Completed')}
                >Completed</Button>

            </div>
        </>
    );
});


