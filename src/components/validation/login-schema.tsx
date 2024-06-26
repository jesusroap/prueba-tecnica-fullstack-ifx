import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  // email: Yup.string().email().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(3, 'Too Short!'),
})