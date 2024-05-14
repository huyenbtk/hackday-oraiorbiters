import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
    subTitle?: string;
    endElement: ReactNode;
    value: string;
    onChange: (value: string) => void;
    subValue?: string;
};
export default function InputCustom({ subTitle, endElement, value, onChange, subValue }: Props) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                borderRadius: '16px',
                backgroundColor: '#EFF2F8',
                py: 2,
                px: { xs: 1, md: 2.5 },
                justifyContent: 'space-between',
                width: '100%',
                height: '120px',
                marginBottom: '16px',
                boxShadow: '0px 0px 6px 0px #B0CCDA80',
                placeItems: 'center',
            }}
        >
            <Box sx={{ width: '-webkit-fill-available' }}>
                <Typography variant="h6" color={'#787E7E'} sx={{ mb: 1 }}>
                    {subTitle}
                </Typography>
                <input
                    style={{ display: 'block', border: 'none', outline: 'none', background: 'none', fontSize: '24px', fontFamily: 'inherit', fontWeight: '700', width: '100%', color: '#303030' }}
                    type="number"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                ></input>
                {subValue ? (
                    <Typography variant="body3" color={'#787E7E'}>
                        {subValue}
                    </Typography>
                ) : (
                    <></>
                )}
            </Box>
            {endElement}
        </Box>
    );
}
