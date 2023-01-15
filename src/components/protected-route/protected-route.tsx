import { FC, ReactNode } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks/redux-hook';
import { Loader } from '../../ui/loader/loader';

export const ProtectedRoute: FC<RouteProps & { children?: ReactNode }> = ({
    children,
    ...rest
}) => {
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
};
