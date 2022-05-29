import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Icon, TextField} from '@mui/material';
type AddItemFormPropsType = {
    addTodoListsElements: (value: string)=>void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    const onClickAddNewTaskHandler = () => {
        if (value.trim()) {
            props.addTodoListsElements(value.trim());
            setValue('');
        } else {
            setError('Title is required');
        }
    };

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            onClickAddNewTaskHandler();
        }
    };

    return (
        <div>

            <TextField
                onChange={onChangeInputHandler}
                onKeyDown={onKeyPress}
                error={!!error}
                helperText={error}
                value={value}
                label={'Type value'}
                variant={'standard'}
                onBlur={()=>setError(null)}
            />

            <Icon
                onClick={onClickAddNewTaskHandler}
                color="primary">add_circle
            </Icon>

        </div>
    );
};

export default AddItemForm;