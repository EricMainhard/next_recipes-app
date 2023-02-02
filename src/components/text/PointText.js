import style from './PointText.module.scss';
import clsx from 'clsx';
import { Text } from './Text';

export const PointText = ({ className, children }) => {
    return (
        <div className={clsx(style.pointText, className)}>
            <div className={style.circle}>
                <Text>
                    {children}
                </Text>
            </div>
        </div>
    )
}