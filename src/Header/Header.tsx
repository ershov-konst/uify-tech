import React, {ReactElement, useCallback, useRef} from 'react';
import styles from './Header.module.css';
import {User} from '../types';

type HeaderProps = {
    onAddUser: (u: User) => void;
};

export default function Header({onAddUser}: HeaderProps): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);
    const onBtnClick = useCallback(() => {
        if (inputRef.current?.value) {
            onAddUser({
                id: Math.floor(Math.random() * 10000),
                name: inputRef.current.value
            });
            inputRef.current.value = '';
        }
    }, [onAddUser]);
    return (
        <div className={styles.root}>
            <input type="text" className={styles.input} ref={inputRef} />
            <button className={styles.btn} onClick={onBtnClick}>
                Add
            </button>
        </div>
    );
}
