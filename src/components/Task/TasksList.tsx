import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../App/app/hooks';
import {getTasks} from '../../bll/reducers/tasksReducer';
import {TasksStatuses} from '../../api/tasksAPI';
import {Task} from './Task';
import {FilterValueType} from '../TodoList/Todolist';

type TasksListPropsType = {
    todoListId: string
    filter: FilterValueType
}

export const TasksList: React.FC<TasksListPropsType> = React.memo (({todoListId, filter}) => {
    const dispatch = useAppDispatch();

    let allTasks = useAppSelector(state => {
        return state.tasksInitState.tasks.filter(t => t.todoListId === todoListId);
    });

    useEffect(() => {
        if (allTasks.length !== 0) {
            return ;
        }
        dispatch(getTasks(todoListId));
    }, [todoListId]);

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

