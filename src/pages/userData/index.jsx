import { userDataFetch } from '../../api/user';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import styles from './index.module.css'
import { TOKEN } from '../../utils/constants';

export const UserData = () => {

  const navigate = useNavigate()
  const [userCabinetData, setUserCabinetData] = useState({})

  useEffect(() => {
      const token = localStorage.getItem(TOKEN)
      if (!token) navigate('/')
    }, [navigate])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN)
    userDataFetch(setUserCabinetData,token)
  }, [])

  return (
    <div className={styles.userDataForm}>
      <div className={styles.userDataList}>
        <h1>Личный кабинет</h1>
        <p className={styles.pName}>{userCabinetData.name}</p>
        <img className={styles.imgAvatar} src={userCabinetData.avatar} alt="" />
        <p className={styles.p}>Группа: {userCabinetData.group}</p>
        <p className={styles.p}>email: {userCabinetData.email}</p>
        <p className={styles.p}>О себе: {userCabinetData.about}</p>
        <Link className = {styles.linkStyle} to={'/products'}>Главная страница</Link>
        <Link id='exit' 
          className={styles.linkStyle} 
          to='/' 
          onClick={()=>{localStorage.removeItem(TOKEN)                            
          }}>
            Выход из сервисов
          </Link> 
      </div>
    </div>
  )
}
