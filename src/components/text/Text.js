import clsx from 'clsx';
import style from './Text.module.scss';

export const Text = ({children, variant = "primary"}) => {
    return (
        <p className={clsx(style.text, style[`text__${variant}`])}>
            {children}
        </p>
    )
}