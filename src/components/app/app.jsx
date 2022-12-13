import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    ForgotPasswordPage,
    ProfilePage,
    IngredientsPage,
    NotFound404,
} from './../../pages';
import globalStyles from './../../global.module.css';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from 'react-redux';
import { userGet } from '../../services/redux/auth/action';
import { useEffect } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/redux/ingredients/action';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        history.goBack();
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(userGet());
        }
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div>
            <AppHeader />
            <main className={globalStyles.container}>
                <Switch location={background || location}>
                    <Route path='/login' exact={true}>
                        <LoginPage />
                    </Route>
                    <Route path='/' exact={true}>
                        <h1 className='mt-10 mb-5 text text_type_main-large'>
                            Соберите бургер
                        </h1>
                        <DndProvider backend={HTML5Backend}>
                            <div className={globalStyles.row}>
                                <section className={globalStyles.column6}>
                                    <BurgerIngredients />
                                </section>
                                <section className={globalStyles.column6}>
                                    <BurgerConstructor />
                                </section>
                            </div>
                        </DndProvider>
                    </Route>

                    <Route path='/register' exact={true}>
                        <RegisterPage />
                    </Route>
                    <Route path='/forgot-password' exact={true}>
                        <ForgotPasswordPage />
                    </Route>
                    <Route path='/reset-password' exact={true}>
                        <ResetPasswordPage />
                    </Route>
                    <ProtectedRoute path='/profile' exact={true}>
                        <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/orders'>
                        <NotFound404 />
                    </ProtectedRoute>
                    <Route path='/ingredients/:id' exact={true}>
                        <IngredientsPage />
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>

                {background && (
                    <Route
                        path='/ingredients/:id'
                        children={
                            <Modal
                                handleClose={handleModalClose}
                                title='Детали ингредиента'
                            >
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                )}
            </main>
        </div>
    );
}

export default App;
