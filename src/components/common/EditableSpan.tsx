import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    changeTitleHandler: (title: string) => void
    disabled?: boolean | undefined
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo ( ({title, changeTitleHandler, disabled=false}) => {
    const [editMode, setEditMode] = useState(false);
    const [titleValue, setTitleValue] = useState<string>(title);

    const activateEditMode = useCallback (() => {
        setEditMode(true);
        setTitleValue(title);
    }, [title]);

    const activateViewMode = () => {
        setEditMode(false);
        changeTitleHandler(titleValue);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.currentTarget.value);

    const onKeyDownPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && titleValue) {
            setEditMode(false);
            changeTitleHandler(titleValue);
        }
    };

        return(
        editMode
            ? <TextField
                disabled={disabled}
                value={titleValue}
                variant={'standard'}
                onBlur={activateViewMode}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyDownPressHandler}
                autoFocus
            />
            : <span
                onDoubleClick={activateEditMode}
            >{title}</span>
    );
} );