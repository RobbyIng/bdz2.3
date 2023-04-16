import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.css'
import { useEffect, useState } from 'react'
import { TOKEN } from '../../utils/constants'
import { fetchCurrentProduct } from '../../api/products'

export const CurrentProduct = () => {
  const { idOfProduct } = useParams()

  const navigate = useNavigate()

  const [prodCurrentItem, setprodCurrentItem] = useState({})

  useEffect(() => {
    const token = localStorage.getItem(TOKEN)
    fetchCurrentProduct(setprodCurrentItem, token, idOfProduct)
  }, [idOfProduct])

  return (
    <div className={styles.cardProduct}>
      <h3 className={styles.userDataForm}>Подробная информация о продукте</h3>
      <img
        src={prodCurrentItem.pictures}
        className={styles.imgCurrent}
        alt="Изображение корма для собак"
      />
      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>Цена: {prodCurrentItem.price}</p>
        <p className={styles.cardAmount}>{prodCurrentItem.stock} шт</p>
        <p className={styles.pcardBody}>{prodCurrentItem.name}</p>
      </div>
      <button
        className={styles.btnBin}
        type="button"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </div>
  )
}
