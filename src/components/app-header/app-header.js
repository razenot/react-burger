import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header.module.css';
import globalStyles from './../../global.module.css';

function AppHeader() {
  return (
	<div className={styles.headerWrapper}>
		<div className={`${globalStyles.container} ${globalStyles.blackGrayBG}`}>
			<header className={styles.header}>
				<section className={styles.columnLeft}>
					<a href="#" className={styles.link}>
						<BurgerIcon type="primary" />
						<span className='text text_type_main-default ml-2'>Конструктор</span>
					</a>
					<a href="#" className={`${styles.link} ml-2`}>
						<ListIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
					</a>
				</section>
				<section className={styles.columnCenter}>
					<Logo />
				</section>
				<section className={styles.columnRight}>
					<a href="#" className={styles.link}>
						<ProfileIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
					</a>
				</section>
			</header>
		</div>
	</div>
  );
}

export default AppHeader;
