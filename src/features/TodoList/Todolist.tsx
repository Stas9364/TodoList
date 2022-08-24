import React, {useCallback} from 'react';
import {Button, IconButton, List} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {removeTodo, updateTodoListStateAC} from './todoListsReducer';
import {RequestStatusType} from '../../App/appReducer';
import {createTask} from '../Task/tasksReducer';
import {TasksList} from '../Task/TasksList';
import {AddItemForm, EditableSpan} from '../../components';
import {useAppDispatch} from '../../App';

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

    const addNewTask = useCallback((value: string) => {
        dispatch(createTask({id, value}));
    }, [id]);

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodoListStateAC({id, model: {title}}));
    }, [id]);

    const changeFilter = useCallback((filter: FilterValueType) => {
        dispatch(updateTodoListStateAC({id, model: {filter}}));
    }, [id]);

    const removeTodoList = useCallback(() => {
        dispatch(removeTodo(id));
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
                <TasksList
                    todoListId={id}
                    filter={filter}
                />
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



