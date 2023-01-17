import { FC } from 'react';
import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

const loaderSizes: { small: number; medium: number; large: number } | any = {
    small: 16,
    medium: 24,
    large: 40,
};
export const Loader: FC<{ size: string; inverse?: boolean; minHeight?: boolean }> = ({
    size,
    inverse = false,
    minHeight = false,
}) => {
    const loaderColor = inverse ? '#fff' : '#4c4cff';

    const wrapperStyleKey = 'wrapper_' + size;
    return (
        <div className={style[wrapperStyleKey]} style={minHeight ? { minHeight: 0 } : {}}>
            <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
        </div>
    );
};
