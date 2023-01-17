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
    FeedPage,
    FeedDetailPage,
    ProfileOrdersPage,
    ProfileOrdersDetailPage,
} from '../../pages';
import globalStyles from './../../global.module.css';
import { ProtectedRoute } from '../protected-route/protected-route';
import { userGet } from '../../services/redux/actions/auth';
import { useEffect, FC } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/redux/actions/ingredients';
import { TModalState } from '../../services/utils/types';
import { useDispatch, useSelector } from '../../services/hooks/redux-hook';
import { FeedDetail } from '../feed-detail/feed-detail';

const App: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<TModalState>();
    const history = useHistory<TModalState>();
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
                        <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
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
                    <ProtectedRoute path='/profile/orders' exact={true}>
                        <ProfileOrdersPage />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/orders/:id' exact={true}>
                        <ProfileOrdersDetailPage />
                    </ProtectedRoute>
                    <Route path='/ingredients/:id' exact={true}>
                        <IngredientsPage />
                    </Route>
                    <Route path='/feed' exact={true}>
                        <FeedPage />
                    </Route>
                    <Route path='/feed/:id' exact={true}>
                        <FeedDetailPage />
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>

                {background && (
                    <>
                        <Route
                            path='/ingredients/:id'
                            children={
                                <Modal handleClose={handleModalClose} title='Детали ингредиента'>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                        <Route
                            path='/feed/:id'
                            children={
                                <Modal handleClose={handleModalClose}>
                                    <FeedDetail />
                                </Modal>
                            }
                        />
                        <Route
                            path='/profile/orders/:id'
                            children={
                                <Modal handleClose={handleModalClose}>
                                    <FeedDetail />
                                </Modal>
                            }
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default App;
