import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

const loaderSizes = {
    small: 16,
    medium: 24,
    large: 40,
};
export const Loader = ({ size, inverse = false, minHeight = false }) => {
    const loaderColor = inverse ? '#fff' : '#4c4cff';

    const wrapperStyleKey = 'wrapper_' + size;
    return (
        <div
            className={style[wrapperStyleKey]}
            style={minHeight ? { minHeight: 0 } : {}}
        >
            <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
        </div>
    );
};
