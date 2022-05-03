import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from './TodoList/Todolist';
import {v1} from 'uuid';
import AddItemForm from './TodoList/AddItemForm';

type TodoListsType = {
    id: string
    filter: FilterValueType
    title: string
}
type TasksStateType = {
    [idTodoList: string]: TaskType[]
}

function App() {

    const idTodoList1 = v1();
    const idTodoList2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: idTodoList1, filter: 'Active', title: 'What to do'},
        {id: idTodoList2, filter: 'All', title: 'What to buy'}
    ]);

    const addNewTodoList = ((title: string) => {
        const idTodoList = v1();
        const newTodoList: TodoListsType = {id: idTodoList, filter: 'All', title: title};
        if (title.trim()) {
            setTodoLists([newTodoList, ...todoLists]);
            setTasksObj({...tasksObj, [idTodoList]: []});
        }
    });

    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        todoLists = todoLists.map(list => list.id === todoListId ? {...list, title : newTitle} : list);
        setTodoLists([...todoLists]);

        todoLists = todoLists.map(list => !list.title ? {...list, title : '✏ set title... '} : list);
        setTodoLists([...todoLists]);
    };

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [idTodoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        [idTodoList2]: [
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'meat', isDone: false},
        ]
    });

    let changeFilter = (buttonName: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId);
        if (todoList) {
            todoList.filter = buttonName;
            setTodoLists([...todoLists]);
        }
    };

    const addNewTask = (text: string, todoListId: string) => {
        if (text.trim()) {
            let task = {id: v1(), title: text, isDone: false};
            tasksObj[todoListId] = [task, ...tasksObj[todoListId]];
            setTasksObj({...tasksObj});
        }
    };

    const checkboxChange = (id: string, isDone: boolean, todoListId: string) => {
        tasksObj[todoListId] = tasksObj[todoListId].map(task => task.id === id ? {...task, isDone: isDone} : task);
        setTasksObj({...tasksObj});
    };

    const changeTasksTitle = (id: string, newTitle: string, todoListId: string) => {
        tasksObj[todoListId] = tasksObj[todoListId].map(task => task.id === id ? {...task, title: newTitle} : task);
        setTasksObj({...tasksObj});

        tasksObj[todoListId] = tasksObj[todoListId].filter(task => task.title); ///remove task without title
        setTasksObj({...tasksObj});
    };

    const removeTodoList = (todoListId: string) => {
        let todoList = todoLists.filter(el => el.id !== todoListId);
        setTodoLists(todoList);
        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    };

    const removeTask = (id: string, todoListId: string) => {
        tasksObj[todoListId] = tasksObj[todoListId].filter(el => el.id !== id);
        setTasksObj({...tasksObj});
    };

    return (
        <div className="App">

            <AddItemForm addTodoListsElements={addNewTodoList}/>

            {todoLists.map(tl => {

                let allTasks = tasksObj[tl.id];//default value
                if (tl.filter === 'Completed') allTasks = allTasks.filter(el => el.isDone); //choose active tab
                if (tl.filter === 'Active') allTasks = allTasks.filter(el => !el.isDone); //choose completed tab

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={allTasks}
                    removeTask={removeTask}
                    addNewTask={addNewTask}
                    checkboxChange={checkboxChange}
                    changeTasksTitle={changeTasksTitle}
                    changeTodoListTitle={changeTodoListTitle}
                    changeFilter={changeFilter}
                    removeTodoList={removeTodoList}
                    filter={tl.filter}
                    addTodoListsElement={addNewTodoList}
                />;
            })}

        </div>
    );
}

export default App;
