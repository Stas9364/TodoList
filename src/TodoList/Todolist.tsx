import React, {ChangeEvent} from 'react';
import AddItemForm from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../State/storeTodoList';
import {addNewTaskAC, changeCheckboxStatusAC, changeTaskTitleAC, removeTaskAC} from '../actions/tasksActions';

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

    addTodoListsElement: (newTodoListTitle: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    changeFilter: (todoListId: string, filter: FilterValueType) => void
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();

    const addNewTask = (value: string) => dispatch(addNewTaskAC(props.id, value));
    const changeTodoListTitleHandler = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id);
    const OnClickRemoveTaskHandler = (idTask: string) => dispatch(removeTaskAC(props.id, idTask));

    const onAllClickHandler = () => props.changeFilter(props.id, 'All');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'Active');
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'Completed');

    let allTasks = tasks;//default value
    if (props.filter === 'Completed') allTasks = allTasks.filter(el => el.isDone); //choose active tab
    if (props.filter === 'Active') allTasks = allTasks.filter(el => !el.isDone); //choose completed tab

    return <div>
        <h3>
            <EditableSpan
                title={props.title}
                changeTitleHandler={(title) => changeTodoListTitleHandler(title)}
                key={props.id}/>

            <IconButton
                color={'inherit'}
                onClick={() => props.removeTodoList(props.id)}>
                <Delete />
            </IconButton>

        </h3>

        <AddItemForm
            addTodoListsElements={addNewTask}
        />

        <List>
            {allTasks.map(elem => {

                const onInputCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeCheckboxStatusAC(props.id, elem.id, event.target.checked));
                };

                const onInputTitleChange = (title: string) => {
                    dispatch(changeTaskTitleAC(props.id, elem.id, title));
                };

                return (
                    <ListItem divider disablePadding key={elem.id} className={elem.isDone ? 'is-done' : ''}>

                        <IconButton
                            color={'default'}
                            onClick={() => OnClickRemoveTaskHandler(elem.id)}>
                            <Delete />
                        </IconButton>

                        <Checkbox
                            color={'secondary'}
                            onChange={onInputCheckboxChange}
                            checked={elem.isDone}
                        />

                        <EditableSpan
                            title={elem.title}
                            changeTitleHandler={(title) => onInputTitleChange(title)}
                            key={elem.id}
                        />
                    </ListItem>);
            })}
        </List>
        <div>

            <Button
                size={'small'}
                color={'inherit'}
                onClick={onAllClickHandler}
                variant={props.filter === 'All' ? 'contained' : 'outlined'}
            >All</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                onClick={onActiveClickHandler}
            >Active</Button>
            <Button
                size={'small'}
                color={'secondary'}
                variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                onClick={onCompletedClickHandler}
            >Completed</Button>

        </div>
    </div>;
}

