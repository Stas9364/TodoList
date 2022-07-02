import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../common/AddItemForm';
import {EditableSpan} from '../common/EditableSpan';
import {Button, IconButton, List} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from '../Task/Task';
import {changeTodoListFilterValueAC} from '../actions/todoListsActions';
import {TasksStatuses} from '../api/tasksAPI';
import {changeTitle, removeTodo} from '../reducers/todoListsReducer';
import {createTask, getTasks} from '../reducers/tasksReducer';
import {useAppDispatch, useAppSelector} from "../App/app/hooks";

export type FilterValueType =
    | 'Active'
    | 'Completed'
    | 'All';

type PropsType = {
    id: string
    title: string
    filter: FilterValueType
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                             id,
                                                             title,
                                                             filter
}) => {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector(state => {
        return state.tasksInitState.tasks.filter(t => t.todoListId === id)
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

    useEffect(()=>{
        dispatch(getTasks(id));
    }, [id]);

    return (
        <>
            <h3>
                <EditableSpan
                    title={title}
                    changeTitleHandler={(title) => changeTodoListTitle(title)}
                    key={id}
                />

                <IconButton
                    color={'inherit'}
                    onClick={removeTodoList}
                >
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addTodoListsElements={addNewTask}/>

            <List>
                {allTasks.map(elem => {
                    return (

                        <Task
                            todoListId={id}
                            taskId={elem.id}
                            status={elem.status}
                            taskTitle={elem.title}
                            key={elem.id}
                        />

                    )
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
    )
});


