"use client";

import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer" 
            sx={{
                py: 3, 
                px: 2, 
                mt: 'auto',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {'Copyright © '}
                News App {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}