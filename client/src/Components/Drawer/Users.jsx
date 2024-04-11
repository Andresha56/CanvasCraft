import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
// import ClearIcon from '@mui/icons-material/Clear';
const ListContainer = styled('div')({
  width: '10%',
  position: 'absolute',
  top: '21px',
  marginLeft: "20px",
  zIndex:9999,
});

export default function User() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <>
      <ListContainer>
        {open ?"" : <ListOutlinedIcon  cursor={'pointer'} sx={{color:"white"}} onClick={toggleDrawer}/>}
      </ListContainer>
      <Drawer anchor="left" open={open} onClose={toggleDrawer} PaperProps={{ style: { backgroundColor: '#202020' } }}> 
        <div>
          <List>
            {['Drawer Item 1', 'Drawer Item 2', 'Drawer Item 3'].map((text, index) => (
              <ListItem key={index}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
