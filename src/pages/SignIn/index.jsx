import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { signInFetch } from '../../api/user';
import { TOKEN } from '../../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import styles from './index.module.css'

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Required'),
  password: Yup.string().required('Required'),
});

export const SignIn = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem(TOKEN)
    if (token) navigate('/products')
  }, [navigate])

  const initialValues = {
    email: '',
    password: '',
  }

  const onSubmit = async (values) => {
    const res = await signInFetch(values)
    if (res.ok) {
      const responce = await res.json()
      localStorage.setItem(TOKEN, responce.token)
      return navigate('/products')
    }

    // return
  }

  return (
    <div className={styles.signInForm}>      
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
      >
        <Form className={styles.classForm}>
          <h1>Авторизация</h1>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" placeholder="password" type='password' />

          <button className={styles.logInBtn} type="submit">Подтвердить</button>
          <p>Если вы не зарегистрированы, <Link className = {styles.linkStyle} to={'/signup'}>Регистрация</Link></p>
        </Form>
      </Formik>
    </div>
  )
}
