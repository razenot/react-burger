import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from '../../ui/loader/loader';

export function ProtectedRoute({ children, ...rest }) {
    const { isAuth, isCheckedUser } = useSelector((state) => state.authReducer);

    if (localStorage.getItem('accessToken')) {
        if (!isCheckedUser) {
            return <Loader size='large' />;
        }
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
