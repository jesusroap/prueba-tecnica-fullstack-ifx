import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginSchema } from '../components/validation/login-schema.tsx'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import { bgGradient } from '../theme/css';
import Logo from '../components/logo.tsx';
import Iconify from '../components/iconify.tsx';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const styles = {
    label: 'block text-sm font-bold pt-2 pb-1',
    field: 'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button: 'bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
    errorMsg: 'text-red-500 text-sm',
}

export const LoginView = () => {
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        // router.push('/dashboard');
    };

    const renderForm = (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values)
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {/* <label className={styles.label} htmlFor="email">Email</label>
                        <Field className={styles.field} id="email" type="email" name="email" />
                        <ErrorMessage className={styles.errorMsg} name="email" component="div" />

                        <label className={styles.label} htmlFor="password">Password</label>
                        <Field className={styles.field} id="password" type="password" name="password" />
                        <ErrorMessage className={styles.errorMsg} name="password" component="div" />

                        <div className='mt-8'>
                            <button className={styles.button} type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div> */}

                        <Stack spacing={3}>
                            <TextField name="email" label="Email address" />

                            <TextField
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
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
                    <Typography variant="h4">Sign in to Minimal</Typography>

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

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}