import { Button,Stack } from '@mui/material';
function Btn({ value }) {
    return (

        <Stack flexDirection={'row-reverse'}>
            <Button type='submit' sx={{
                bgcolor: "#00796b",
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