import NavBar from "@/components/common/NavBar"
import { Typography } from '@mui/material';
import { Box } from '@mui/material';


export default function Header() {

    return (
        <Box sx={{ mt: 2 }}>
            <Typography align="center" variant="h3" color="primary"> Le Monde </Typography>
            <Box sx={{ mt: 2 }} />          
            <NavBar />
        </Box>
    )
}