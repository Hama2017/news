"use client";

import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={styles.footer}
        >
            <Typography variant="body2" color="text.secondary">
                {'Copyright © '} News App {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

export default Footer;

const styles = {
    footer: {
        py: 3,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
    }
}