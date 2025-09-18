"use client";

import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { text: 'Accueil', path: '/' },
    { text: 'News', path: '/news' },
    { text: 'Profil', path: '/profil' },
];

const NavBar = () => {
    const currentPathname = usePathname();

    return (
        <Box component="nav" sx={styles.nav}>
            {navLinks.map((link) => (
                <Button
                    key={link.text}
                    component={Link}
                    href={link.path}
                    variant={currentPathname === link.path ? 'contained' : 'text'}
                >
                    {link.text}
                </Button>
            ))}
        </Box>
    );
};

export default NavBar;

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 2,
    }
};
