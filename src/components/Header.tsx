"use client";

import { Box, Typography } from '@mui/material';
import NavBar from "@/components/NavBar";

const Header = () => {
    return (
        <Box component="header" sx={styles.header}>
            <Typography variant="h3" color="primary" align="center">
                Le Monde
            </Typography>
            <Box sx={{ mt: 2 }} />
            <NavBar />
        </Box>
    );
};

export default Header;

const styles = {
    header: {
        mt: 2,
        textAlign: 'center',
    }
};
