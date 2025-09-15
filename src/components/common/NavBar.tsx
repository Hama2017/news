"use client";

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const navLinks = [
    { text: 'Accueil', path: '/' },
    { text: 'News', path: '/news' },
    { text: 'Profil', path: '/profil' },
];

export default function NavBar() {
    const currentPathname = usePathname();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            component="nav"
        >
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
}