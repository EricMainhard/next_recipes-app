import style from './Title.module.scss';
import clsx from 'clsx';

export const Title = ({children, className, variant = 'primary'}) => {
    return (
        <h2 className={clsx(style.title, className, style[`title__${variant}`])}>
            {children}
        </h2>
    )
}