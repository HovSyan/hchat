import { memo } from 'react';

function UserPanel() {
    return <aside className="user-info">User info</aside>;
}

export default memo(UserPanel);