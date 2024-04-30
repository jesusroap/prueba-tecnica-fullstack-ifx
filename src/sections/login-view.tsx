import { Formik, Form, Field } from 'formik';
import { LoginSchema } from '../components/validation/login-schema.tsx'

import { alpha, useTheme } from '@mui/material/styles';

import {
    Box,
    Button,
    Typography,
    Stack,
    Card,
    Link,
    Divider,
    InputAdornment,
    IconButton
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { bgGradient } from '../theme/css';
import Logo from '../components/logo.tsx';
import Iconify from '../components/iconify.tsx';

import { TextField } from 'formik-mui';
import { useState } from 'react';

import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

export const LoginView = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const [errors, setErrors] = useState("")

    const [showPassword, setShowPassword] = useState(false);

    const decodeJWT = (token: string) => {
        const decodedJWT: any = decodeToken(token);
        fetch("https://fakestoreapi.com/users/" + decodedJWT.sub)
            .then((response) => response.json())
            .then((data: any) => {
                const newData = {
                    firstname: data.name.firstname,
                    lastname: data.name.lastname,
                    email: data.email
                }
                localStorage.setItem("user", JSON.stringify(newData))
            })
            .catch((error: any) => console.log(error));
    }

    const postData = (username: string, password: string) => {
        fetch("https://fakestoreapi.com/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    // console.log(response)
                    setErrors('username or password is incorrect')
                    throw new Error(`Error ${response.status}: username or password is incorrect`);
                }
                return response.json()
            })
            .then((data: any) => {
                localStorage.setItem("token", data.token)
                decodeJWT(data.token)
                navigate('/admin/users', {replace: true});
            })
            .catch((error) => {
                return console.error(error)
            });
    }

    const renderForm = (
        <>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        // console.log(values)
                        setErrors('')
                        postData(values.username, values.password)
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Stack spacing={3}>
                            <Field id="username" type="text" name="username" label="Username" component={TextField} />

                            <Field
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                component={TextField}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                            <Link variant="subtitle2" underline="hover">
                                Forgot password?
                            </Link>
                        </Stack>

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="inherit"
                            disabled={isSubmitting}
                        >
                            Login
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Sign in</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Don’t have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                            Get started
                        </Link>
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <Iconify icon="eva:google-fill" color="#DF3E30" />
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <Iconify icon="eva:facebook-fill" color="#1877F2" />
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
                        </Button>
                    </Stack>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            OR
                        </Typography>
                    </Divider>

                    <Typography variant="body2" sx={{ color: '#FF5630', marginBottom: '1rem' }}>
                        { errors }
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}