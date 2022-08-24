import React from 'react';
import {FilterValueType} from '../features/TodoList';

type ButtonProps = {
    onClick: (name: FilterValueType) => void
    name: FilterValueType
    styleName?: string
}

export const Button: React.FC<ButtonProps> = ({onClick, name, styleName}) => {
    const onClickHandler = () => onClick(name);

    return (
        <button
            className={styleName}
            onClick={onClickHandler}
        >{name}
        </button>
    );
};
