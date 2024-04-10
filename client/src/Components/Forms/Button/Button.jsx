import { Button,Stack } from '@mui/material';
function Btn({ value, mb }) {
    console.log(mb)
    return (
        
        <Stack flexDirection={'row-reverse'}>
            <Button type='submit'  sx={{
                bgcolor: "#00796b",
                marginBottom:mb,
                color: "#ffffff",
                "&:hover": {
                    bgcolor: "#00796b",
                },
            }} variant="outlined">{value}
            </Button>
        </Stack>
    )
}

export default Btn