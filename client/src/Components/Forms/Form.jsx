import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import "./Form.css";
import Btn from './Button/Button';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from './SnackBar/SnakBar';
import { useNavigate } from "react-router-dom";

const InitialValues = {
  username: "",
  Id: "",
}

function Form() {
  const [newRoom, setNewRoom] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [textToCopy, setTextToCopy] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);
  const [inputValues, setInputValues] = useState(InitialValues);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  // ----handle-form-inputs---
  const handleUserInputs = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues, [name]: value,
    })
  }
  // ----hanlde--form--submit---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //form submit 
    if (!newRoom) {
      if (inputValues.username && inputValues.Id) {
        const { username, Id } = inputValues;
        console.log(Id)
        navigate(`/text/editor/${inputValues.Id}`, {
          state: {
            username,
            roomId: Id,
            newRoom:false,
          },
        })
      }
    } else {
      if (inputValues.username){
        const { username } = inputValues;
        navigate(`/text/editor/${roomId}`,{
          state: {
            username,
            roomId,
            newRoom:true,
          },
        })
      }
    }

    //handle errors
    const errors = {};
    if (!inputValues.username) errors.username = 'Username is required!';
    if (!inputValues.Id) errors.Id = 'Room ID is required!';
    setFormErrors(errors);

  }
  // ----create---new---room----
  const handleNewRoom = () => {
    setNewRoom(!newRoom);
    uuidFromUuidV4();
  };

  // ----generate---uuid---for---the---newRoom
  const uuidFromUuidV4 = () => {
    const newUuid = uuid();
    setRoomId(newUuid);
    setTextToCopy(newUuid);
  };

  // -----copy---to---clipBoard----
  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <Box height={"100vh"} bgcolor={'inherit'} className='form-wrapper'>
      <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
        <form onSubmit={handleFormSubmit}>
          {newRoom ? (
            <Box key="new-room">
              <Typography color="initial">
                Share Room ID to join more people
              </Typography>
              <Stack flexDirection={'column'} gap={2} my={2}>
                <Stack flexDirection={'row'} gap={2}>
                  <input onChange={handleUserInputs} type="text" placeholder="ROOM ID" value={roomId} readOnly name='Id' />
                  <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
                    <button type='button'>Copy to Clipboard</button>
                  </CopyToClipboard>
                </Stack>
                {copyStatus && <SnackBar openSnackBar={copyStatus} message={"Copied Successfully!"} />}
                <input onChange={handleUserInputs} type="text" placeholder="USERNAME" name='username' />
                {formErrors.username && <p>{formErrors.username}</p>}
              </Stack>
              <Btn value={'JOIN'} />
              <span>
                Have invite &nbsp;
                <Link to="/" onClick={handleNewRoom}>
                  join room
                </Link>
              </span>
            </Box>
          ) : (
            <Stack key="join-room">
              <Typography color="initial">Paste invited Room ID</Typography>
              <Stack flexDirection={'column'} gap={2} my={2}>
                <input onChange={handleUserInputs} type="text" placeholder="ROOM ID" name='Id' />
                {formErrors?.Id && <p>{formErrors?.Id}</p>}
                <input onChange={handleUserInputs} type="text" placeholder="USERNAME" name='username' />
                {formErrors?.username && <p>{formErrors?.username}</p>}
              </Stack>
              <Btn value={'JOIN'} />
              <span>
                If you didn't have invite create &nbsp;
                <Link to="/" onClick={handleNewRoom}>
                  new room
                </Link>
              </span>
            </Stack>
          )}
        </form>
      </Stack>
    </Box>
  );
}
export default Form;
