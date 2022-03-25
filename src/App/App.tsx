import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import Header from '../Header';
import List from '../List';
import {User} from '../types';
import styles from './App.module.css';

function sort(list: User[]): User[] {
    return list.sort(({name: n1 = ''}: User, {name: n2 = ''}: User) =>
        n1.localeCompare(n2)
    );
}

export default function App(): ReactElement {
    const [list, setList] = useState<User[]>([]);
    const [hl, setHL] = useState<number | null>(null);
    const onAddUser = useCallback(
        (u: User) => {
            setList(sort([...list, u]));
            setHL(u.id);
        },
        [list]
    );

    // initial request
    useEffect(() => {
        (async (): Promise<void> => {
            const fetch_result = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            if (fetch_result.ok) {
                const result = await fetch_result.json();
                setList(sort(result));
            }
        })();
    }, []);

    return (
        <div className={styles.root}>
            <Header onAddUser={onAddUser} />
            <List list={list} highlight={hl} />
        </div>
    );
}
