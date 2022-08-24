import React from 'react';
import {TasksStatuses} from '../../api/tasksAPI';
import {Task} from './Task';
import {useAppSelector} from '../../App';
import {FilterValueType} from '../TodoList';
import {getTodoListTasks} from './selectors';

type TasksListPropsType = {
    todoListId: string
    filter: FilterValueType
}

export const TasksList: React.FC<TasksListPropsType> = React.memo (({todoListId, filter}) => {

    let allTasks = useAppSelector(state => getTodoListTasks(state, todoListId));

    if (filter === 'Completed') {
        allTasks = allTasks.filter(el => el.status === TasksStatuses.Completed);
    }
    if (filter === 'Active') {
        allTasks = allTasks.filter(el => el.status === TasksStatuses.New);
    }

    return (
        <>
            {allTasks.map(elem => {
                return (

                    <Task
                        todoListId={todoListId}
                        taskId={elem.id}
                        status={elem.status}
                        taskTitle={elem.title}
                        key={elem.id}
                        entityStatus={elem.entityStatus}
                    />

                );
            })}
        </>
    );
} );

