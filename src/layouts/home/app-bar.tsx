import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import { HEADER } from "../dashboard/config-layout";
import { alpha, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Iconify from "../../components/iconify";
import Logo from "../../components/logo";
// import MenuIcon from '@mui/icons-material/Menu';

export default function AppBarHome() {
    const navigate = useNavigate();

    const theme = useTheme();

    const [action, setAction] = useState({ name: '', link: '' })

    const pages = [{ name: 'Docs', url: 'https://github.com/jesusroap/prueba-tecnica-fullstack-ifx#funcionamiento-de-la-aplicación', id: 1 }];

    const navigator = (url: string) => {
        location.href=url
    }

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    useEffect(() => {
        // Realizar la lógica de actualización del estado
        if (!localStorage.getItem('token')) {
            setAction({ name: 'Login', link: '/login' });
        } else {
            setAction({ name: 'Dashboard', link: '/admin/users' });
        }
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{
                    boxShadow: 'none',
                    height: HEADER.H_MOBILE,
                    zIndex: theme.zIndex.appBar + 1,
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    backgroundColor: alpha(theme.palette.background.default, 0.8),
                    transition: theme.transitions.create(['height'], {
                        duration: theme.transitions.duration.shorter,
                    }),
                }}>
                    <Toolbar sx={{
                        height: 1,
                        px: { lg: 5 },
                    }}>
                        <Logo sx={{ mr: 4 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#212B36',
                                textDecoration: 'none',
                            }}
                        >
                            Store App
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true" onClick={handleOpenNavMenu} sx={{ mr: 1 }}>
                                <Iconify icon="eva:menu-2-fill" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#212B36',
                                textDecoration: 'none',
                            }}
                        >
                            Store App
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.id}
                                    onClick={() => { navigator(page.url) }}
                                    sx={{ my: 2, color: '#212B36', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Button variant="contained" color="inherit" onClick={() => { navigate(action.link) }}>{action.name}</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    )
}