import { ClearRounded } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, Typography } from '@mui/material';
import { useModalContext } from 'src/contexts/modal-context/modal-context';

export default function ModalCustom() {
    const { open, closeModal, content, title, modalProps } = useModalContext();
    function closeDialog() {
        closeModal();
    }

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            fullWidth
            scroll="paper"
            maxWidth={modalProps?.maxWidth || 'xs'}
            sx={(theme) => ({
                [theme.breakpoints.down('xsm')]: { '& .MuiPaper-root': { maxWidth: '100%!important', margin: '0!important', width: 'calc(100% - 16px)' } },
            })}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, alignItems: 'center' }}>
                <Typography variant="h5" color={'text.primary'}>
                    {title}
                </Typography>
                <ClearRounded onClick={closeDialog} sx={{ color: 'text.secondary', fontSize: '26px', cursor: 'pointer' }} />
            </DialogTitle>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    p: 2,
                }}
            >
                {content}
            </Box>
        </Dialog>
    );
}
