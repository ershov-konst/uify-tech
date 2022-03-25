import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import Item from './Item';
import styles from './List.module.css';
import {User} from '../types';

type ListProps = {
    list: User[];
    highlight: number | null;
};
export default function List({list, highlight}: ListProps): ReactElement {
    const [active_element, setActiveElement] = useState<number | null>(null);
    const root = useRef<HTMLDivElement>(null);

    const onActivate = useCallback((id: number) => {
        setActiveElement(id);
    }, []);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent): void {
            if (
                event.target instanceof Node &&
                !(root.current && root.current.contains(event.target))
            ) {
                setActiveElement(null);
            }
        }
        document.addEventListener('mouseup', handleDocumentClick, true);
        return () => {
            document.removeEventListener('mouseup', handleDocumentClick, true);
        };
    }, []);

    useEffect(() => {
        if (highlight && root.current) {
            const elem = root.current.querySelector(`[data-id="${highlight}"]`);
            if (elem) {
                elem.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, [highlight]);

    return (
        <div className={styles.list} ref={root}>
            {list.map((user: User) => {
                return (
                    <Item
                        key={user.id}
                        user={user}
                        isHighLighted={highlight === user.id}
                        isActive={active_element === user.id}
                        onActivate={onActivate}
                    />
                );
            })}
        </div>
    );
}
