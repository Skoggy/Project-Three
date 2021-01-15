import React from 'react';
// import User from '../components/User';
import { withRouter } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            If you see this, it means youre authenticated.
        </div>
    )
}

export default withRouter(MainPage);