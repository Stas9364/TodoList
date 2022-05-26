import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    changeTitleHandler: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState<string>(props.title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.changeTitleHandler(title);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onKeyDownPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            setEditMode(false);
            props.changeTitleHandler(title);
        }
    };

        return(
        editMode
            ? <TextField
                value={title}
                variant={'standard'}
                onBlur={activateViewMode}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyDownPressHandler}
                autoFocus
            />
            : <span
                onDoubleClick={activateEditMode}
            >{props.title}</span>
    );
};