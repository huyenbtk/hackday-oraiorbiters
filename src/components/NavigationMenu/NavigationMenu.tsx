import { Box, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { menu } from 'src/layout/menu';

export default function NavigationMenu() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handleNavigate = (url: string) => {
        navigate(url);
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '500px', width: '100%', mb: 3, ml: 0.5 }}>
            <Grid container>
                {menu.map((item) => (
                    <Grid item sx={{ pr: 4 }} key={item.title} onClick={() => handleNavigate(item.url)} style={{ cursor: 'pointer' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: item.url === pathname ? 'text.primary' : 'text.secondary',
                                '&:hover': { color: '#99A9BA' },
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <SettingsOutlinedIcon sx={{ fontSize: '32px', cursor: 'pointer' }} />
        </Box>
    );
}
