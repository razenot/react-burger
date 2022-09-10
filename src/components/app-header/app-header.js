import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header.module.css';
import globalStyles from './../../global.module.css';

function AppHeader() {
  return (
	<div className={styles.headerWrapper}>
		<div className={globalStyles.container}>
			<header className={styles.header}>
				<section className={styles.columnLeft}>
					<div className={styles.button}>
						<BurgerIcon type="primary" />
						<span className='text text_type_main-default ml-2'>Конструктор</span>
					</div>
					<div className={styles.button + ' ml-2'}>
						<ListIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
					</div>
				</section>
				<section className={styles.columnCenter}>
					<Logo />
				</section>
				<section className={styles.columnRight}>
					<div className={styles.button}>
						<ProfileIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
					</div>
				</section>
			</header>
		</div>
	</div>
  );
}

export default AppHeader;
