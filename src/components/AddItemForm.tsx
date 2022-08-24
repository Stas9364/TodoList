import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormPropsType = {
    addTodoListsElements: (value: string) => void
    disabled?: boolean | undefined
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addTodoListsElements, disabled = false}) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    const onClickAddNewTaskHandler = useCallback(() => {
        if (value.trim()) {
            addTodoListsElements(value.trim());
            setValue('');
        } else {
            setError('Title is required');
        }
    }, [addTodoListsElements, value]);

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === 'Enter') {
            onClickAddNewTaskHandler();
        }
    };

    return (
        <div>

            <TextField
                disabled={disabled}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyPress}
                error={!!error}
                helperText={error}
                value={value}
                label={'Type value'}
                variant={'standard'}
                onBlur={() => setError(null)}
            />

            <IconButton
                disabled={disabled}
                onClick={onClickAddNewTaskHandler}
                color="primary"
            >
                <AddBox/>
            </IconButton>

        </div>
    );
});

