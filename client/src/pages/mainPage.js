import { React, useContext } from 'react';
// import User from '../components/User';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';

function MainPage() {
    const { user } = useContext(UserContext);
    return (

        <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            If you see this, it means youre authenticated.<div>{user}</div>
        </div>
    )
}

export default withRouter(MainPage);