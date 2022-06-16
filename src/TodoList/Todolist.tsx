import React, {useCallback} from 'react';
import AddItemForm from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton, List} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../State/storeTodoList';
import {addNewTaskAC} from '../actions/tasksActions';
import {Task} from "./Task";
import {changeTodoListFilterValueAC, changeTodoListTitleAC, removeTodoListAC} from "../actions/todoListsActions";

export type FilterValueType = 'Active' | 'Completed' | 'All';
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
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

    const dispatch = useDispatch();

    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[id]);
    const addNewTask = useCallback((value: string) => {
        dispatch(addNewTaskAC(id, value));
    }, [id]);

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleAC(id, title));
    }, [id]);

    const changeFilter = useCallback((todoListId: string, filter: FilterValueType) => {
        dispatch(changeTodoListFilterValueAC(todoListId, filter));
    }, [dispatch]);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    }, [dispatch]);


    let allTasks = tasks;//default value
    if (filter === 'Completed') allTasks = allTasks.filter(el => el.isDone); //choose active tab
    if (filter === 'Active') allTasks = allTasks.filter(el => !el.isDone); //choose completed tab

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
                    onClick={() => removeTodoList(id)}
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
                            isDone={elem.isDone}
                            taskTitle={elem.title}
                            key={elem.id}
                        />)

                })}
            </List>
            <div>

                <Button
                    size={'small'}
                    color={'inherit'}
                    onClick={() => changeFilter(id, 'All')}
                    variant={filter === 'All' ? 'contained' : 'outlined'}
                >All</Button>
                <Button
                    size={'small'}
                    color={'primary'}
                    variant={filter === 'Active' ? 'contained' : 'outlined'}
                    onClick={() => changeFilter(id, 'Active')}
                >Active</Button>
                <Button
                    size={'small'}
                    color={'secondary'}
                    variant={filter === 'Completed' ? 'contained' : 'outlined'}
                    onClick={() => changeFilter(id, 'Completed')}
                >Completed</Button>

            </div>
        </>
    )
});


