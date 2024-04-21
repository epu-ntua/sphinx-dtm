import React, {useEffect, useState} from 'react';
import {Redirect, Route} from "react-router-dom";
import Auth from "./Auth";

const PrivateRoute = ({component: Component, handleChildFunc, ...rest}) => {

    const [state, setState] = useState('loading');

    useEffect(() => {
        (async function () {
            try {
                /* Update effect logic to track correct state */
                const isUserLogged = await Auth.isAuthenticated();
                setState(isUserLogged ? 'loggedin' : 'redirect');
            }
            catch {
                setState('redirect');
            }
        })();
    }, []);

    if (state === 'loading') {
        return <div>Loading..</div>
    }

    return <Route {...rest} render={(props) => (
        (state === 'loggedin')
            ? <Component {...props} />
            : <Redirect to='/access-denied'/>
    )}
    />
}

export default PrivateRoute;