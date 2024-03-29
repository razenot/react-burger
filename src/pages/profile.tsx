import { FC } from 'react';
import ProfileEdit from '../components/profile-edit/profile-edit';
import ProfileMenu from '../components/profile-menu/profile-menu';
import styles from './style.module.css';

export const ProfilePage: FC = () => {
    return (
        <div className={styles.profileWrapper}>
            <div className={`${styles.leftSidebar} mr-15`}>
                <ProfileMenu />
            </div>
            <div className={styles.profileContent}>
                <ProfileEdit />
            </div>
        </div>
    );
};
