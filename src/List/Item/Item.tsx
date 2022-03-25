import {User} from '../../types';
import React, {ReactElement, useCallback} from 'react';
import classNames from 'classnames';
import styles from './Item.module.css';

type ListItemProps = {
    user: User;
    isActive: boolean;
    isHighLighted: boolean;
    onActivate: (id: number) => void;
};
const ListItem = React.memo(
    ({user, isActive, isHighLighted, onActivate}: ListItemProps): ReactElement => {
        const onClick = useCallback(() => {
            onActivate(user.id);
        }, [onActivate, user.id]);
        return (
            <div
                className={classNames(styles.item, {
                    [styles.item_active]: isActive,
                    [styles.item_highlight]: isHighLighted
                })}
                data-id={user.id}
                onClick={onClick}
            >
                {user.name}
            </div>
        );
    }
);

export default ListItem;
