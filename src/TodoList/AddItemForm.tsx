import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {SuperInput} from './Input';
import style from './Todolist.module.css';

type AddItemFormPropsType = {
    addTodoListsElements: (value: string)=>void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    const onClickAddNewTaskHandler = () => {
        props.addTodoListsElements(value);
        setValue('');
        titleError();
    };

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            props.addTodoListsElements(value);
            setValue('');
            titleError();
        }
    };

    const titleError = () => {
        if (value === '') {
            return setError('Title is required');
        } else {
            return setError(null);
        }
    };

    return (
        <div>
            <SuperInput
                onChange={onChangeInputHandler}
                onKeyDown={onKeyPress}
                className={error ? style.warning : ''}
                value={value}
            />

            <button onClick={onClickAddNewTaskHandler}>+</button>

            {error && <div className={style.message_warning}>{error}</div>}
        </div>
    );
};

export default AddItemForm;