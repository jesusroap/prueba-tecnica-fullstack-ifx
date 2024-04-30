import * as Yup from 'yup'

export const UserSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  email: Yup.string().required('Required').email(),
  phone: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
})