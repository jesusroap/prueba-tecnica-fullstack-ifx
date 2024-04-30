import { Field, Form, Formik } from "formik";
import Stack from "@mui/material/Stack";
import { TextField } from "formik-mui";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserSchema } from "../../components/validation/user-schema";

export default function UserForm({ dataUser, context, newUser, handleCloseModal }: any) {

    const createUser = (values: any) => {
        fetch("https://fakestoreapi.com/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((data: any) => {
                console.log("Guardado Exitoso", data)
                newUser(values, 'create')
                handleCloseModal()
            })
            .catch((error) => console.log(error));
    }

    const updateUser = (values: any) => {
        fetch("https://fakestoreapi.com/users/" + values.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((data: any) => {
                handleCloseModal()
                newUser(data, 'update')
                console.log("Actualizacion Exitosa", data)
            })
            .catch((error) => console.log(error));
    }
    
    const saveUser = (values: any) => {
        const data = {
            name: {
                firstname: values.firstname,
                lastname: values.lastname,
            },
            id: dataUser.id,
            email: values.email,
            phone: values.phone,
            address: {
                city: values.city
            }
        }
        if (context == "update") {
            updateUser(data)
        } else {
            createUser(data)
        }
    }

    return (
        <>
          <Formik
            initialValues={{ firstname: dataUser.firstname, lastname: dataUser.lastname, email: dataUser.email, phone: dataUser.phone, city: dataUser.city }}
            validationSchema={UserSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                saveUser(values)
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={3}>
                  <Field type="text" name="firstname" label="Firstname" component={TextField} />
    
                  <Field name="lastname" label="Lastname" type="text" component={TextField} />

                  <Field name="email" label="Email" type="email" component={TextField} />

                  <Field name="phone" label="Phone" type="text" component={TextField} />

                  <Field name="city" label="City" type="text" component={TextField} />
                </Stack>
    
                <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}></Stack>
    
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  disabled={isSubmitting}
                >
                  { context.charAt(0).toUpperCase() + context.slice(1) }
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </>
      );
}