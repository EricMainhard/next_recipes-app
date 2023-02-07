import style from './Ingredients.module.scss';
import { Title } from '../text/Title';

export const Ingredients = ({ingredients}) => {
    return (
        <div>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    <tr>
                    <td colSpan={3}>
                        <Title variant="secondary">Ingredients:</Title>
                    </td>
                    </tr>
                </thead>
                <tbody className={style.tableBody}>
                    {ingredients.map( ing => (
                        <tr key={ing.index} className={style.tableRow}>
                            <td>{ ing.ingredient }</td>
                            <td>{ ing.measure }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}