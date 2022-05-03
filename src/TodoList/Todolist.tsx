import React, {ChangeEvent} from 'react';
import style from './Todolist.module.css';
import {Button} from './Button';
import {SuperInput} from './Input';
import AddItemForm from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    removeTask: (id: string, todoListId: string) => void
    addNewTask: (text: string, todoListId: string) => void
    checkboxChange: (id: string, isDone: boolean, todoListId: string) => void
    changeTasksTitle: (id: string, title: string, todoListId: string) => void
    changeTodoListTitle: (id: string, title: string) => void
    changeFilter: (buttonName: FilterValueType, id: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    addTodoListsElement: (title: string) => void
}

export function Todolist(props: PropsType) {

    const addNewTask = (value: string) => props.addNewTask(value, props.id);

    const OnClickRemoveTaskHandler = (elem: string) => props.removeTask(elem, props.id);

    const changeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id);
    };

    return <div>
        <h3>

            <EditableSpan
                title={props.title}
                changeTitleHandler={(title)=>changeTodoListTitleHandler(title)}
                key={props.id}/>

            <button
                onClick={() => props.removeTodoList(props.id)}
            >X
            </button>
        </h3>

        <AddItemForm
            addTodoListsElements={addNewTask}
        />

        <ul>
            {props.tasks.map(elem => {

                const onInputCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
                    props.checkboxChange(elem.id, event.target.checked, props.id);
                };

                const onInputTitleChange = (title: string) => {
                    props.changeTasksTitle(elem.id, title, props.id);
                };

                return (
                    <li key={elem.id}
                        className={elem.isDone ? style.isDone : ''}>

                        <button
                            onClick={() => OnClickRemoveTaskHandler(elem.id)}
                        >X
                        </button>

                        <SuperInput
                            type="checkbox"
                            onChange={onInputCheckboxChange}
                            checked={elem.isDone}
                        />

                        <EditableSpan
                            title={elem.title}
                            changeTitleHandler={(title)=>onInputTitleChange(title)}
                            key={elem.id}
                        />
                    </li>);
            })}
        </ul>
        <div>
            <Button
                onClick={(name) => {
                    props.changeFilter(name, props.id);
                }}
                name={'All'}
                styleName={props.filter === 'All' ? style.activeButton : ''}
            />
            <Button
                onClick={(name) => {
                    props.changeFilter(name, props.id);
                }}
                name={'Active'}
                styleName={props.filter === 'Active' ? style.activeButton : ''}
            />
            <Button
                onClick={(name) => {
                    props.changeFilter(name, props.id);
                }}
                name={'Completed'}
                styleName={props.filter === 'Completed' ? style.activeButton : ''}
            />
        </div>
    </div>;
}

