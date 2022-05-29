import React, {ChangeEvent} from 'react';
import AddItemForm from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type FilterValueType = 'Active' | 'Completed' | 'All';
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType

    addTodoListsElement: (newTodoListTitle: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    changeFilter: (todoListId: string, filter: FilterValueType) => void
    removeTodoList: (todoListId: string) => void

    addNewTask: (todoListId: string, text: string) => void
    checkboxChange: (todoListId: string, idTask: string, isDone: boolean) => void
    changeTasksTitle: (todoListId: string, id: string, title: string) => void
    removeTask: (todoListId: string, id: string) => void
}

export function Todolist(props: PropsType) {
    const addNewTask = (value: string) => props.addNewTask(props.id, value);

    const changeTodoListTitleHandler = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id);

    const OnClickRemoveTaskHandler = (elem: string) => props.removeTask(props.id, elem);

    const onAllClickHandler = () => props.changeFilter(props.id, 'All');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'Active');
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'Completed');


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
            {props.tasks.map(elem => {
                const onInputCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
                    props.checkboxChange(props.id, elem.id, event.target.checked);
                };

                const onInputTitleChange = (title: string) => {
                    props.changeTasksTitle(props.id, elem.id, title);
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

