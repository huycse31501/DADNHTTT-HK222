
import { setSwitchState } from "state/areaSlice";
import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ width: 400}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Schedule = (aid) => {
    const [valuefrom, setValuefrom] = React.useState(dayjs('2023-04-7'));

    const handleChangefrom = (newValue) => {
      setValuefrom(newValue);
    };
    const [valueto, setValueto] = React.useState(dayjs('2023-04-7'));

    const handleChangeto = (newValue) => {
      setValueto(newValue);
    };

    const [valuestart, setValuestart] = React.useState(dayjs('12'));

    const handleChangestart = (newValue) => {
      setValuestart(newValue);
    };

    const [valueend, setValueend] = React.useState(dayjs('12'));

    const handleChangeend = (newValue) => {
      setValueend(newValue);
    };

    const dispatch = useDispatch();
    const switchValue = useSelector((state) => state.area.switches[aid]) || false;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleSwitchChange = (event) => {
        const { checked } = event.target;
        dispatch(setSwitchState({ id: aid, value: checked }));
      // if (event.target.checked == false) {
      //   }
  };

  const [temp, setTemp] = useState('');
  const [humid, setHumid] = useState('');
  const [light, setLight] = useState('');
  const senddata = () => {
    const { io } = require("socket.io-client");
    const socket = io("http://localhost:6556/", { 
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });
    socket.on('connect', () => {
      console.log(`Connected to server with id ${socket.id}`);
      console.log(`Da gui nhiet do:  ${temp}`);
      socket.emit('hereistemp', temp);
    });
    
    socket.on('whereishumid', () => {
      console.log(`Da gui do am: ${humid}`);
      socket.emit('hereishumid', humid)
    });

    socket.on('whereislight', () => {
      console.log(`Da gui anh sang: ${light}`);
      socket.emit('hereislight', light)
    });
    socket.on('whereistimefrom', () => {
      console.log(`Da gui ngay bat dau tuoi: ${String(valuefrom?.$d).split(' ').slice(0,4).join('-')}`);
      socket.emit('hereistimefrom', String(valuefrom?.$d).split(' ').slice(0,4).join('-'))
    });
    socket.on('whereistimeto', () => {
      console.log(`Da gui ngay ket thuc tuoi: ${String(valueto?.$d).split(' ').slice(0,4).join('-')}`);
      socket.emit('hereistimeto', String(valueto?.$d).split(' ').slice(0,4).join('-'))
    });
    socket.on('whereistimestart', () => {
      console.log(`Da gui thoi gian bat dau tuoi: ${String(valuestart?.$d).split(' ')[4]}`);
      socket.emit('hereistimestart', String(valuestart?.$d).split(' ')[4])
    });
    socket.on('whereistimeend', () => {
      console.log(`Da gui thoi gian ket thuc tuoi: ${String(valueend?.$d).split(' ')[4]}`);
      socket.emit('hereistimeend', String(valueend?.$d).split(' ')[4])
    });
    socket.on('all', (data) => {
      console.log(`${data}`);
    });
    socket.on('error', (error) => {
      console.log(`Error: ${error.message}`);
    });
    dispatch(setSwitchState({ id: aid, value: true }));
    setOpen(false);
  };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack sx={{ marginTop: "30px", marginLeft: "300px", marginRight: "300px" }} gap = "1rem" display="grid" gridTemplateColumns="1fr 1fr" gridGap="1rem">
                <DesktopDatePicker
                label="Date From"
                inputFormat="MM/DD/YYYY"
                value={valuefrom}
                onChange={handleChangefrom}
                disabled={switchValue}
                renderInput={(params) => <TextField {...params} />}
                        />
                    <DesktopDatePicker
                label="Date To"
                inputFormat="MM/DD/YYYY"
                value={valueto}
                onChange={handleChangeto}
                disabled={switchValue}
                renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                label="Time Start Watering"
                value={valuestart}
                onChange={handleChangestart}
                disabled={switchValue}
                renderInput={(params) => <TextField {...params} />}
                        />
                <TimePicker
                label="Time End Watering"
                value={valueend}
                onChange={handleChangeend}
                disabled={switchValue}
                renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
            <FormGroup sx={{ marginTop: "30px", marginLeft: "300px", marginRight: "300px" }} gap = "1rem" id = "waterswitch">
                <FormControlLabel control={
                    <PinkSwitch
                    color="primary"
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }} />} label="Bật/Tắt Tưới Nước Thông Minh"
                />
        </FormGroup>
          <Box 
            component="form"
            sx={{
              
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              marginTop: "30px", marginLeft: "300px", marginRight: "300px"
            }
            }
            gap = "1rem"
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
                
                id="boxtemp"
                label="Nhiệt độ kích hoạt (C)"
                multiline
              disabled={switchValue}
              onChange={(event) => {setTemp(event.target.value)}}
              maxRows={4}
              />
            </div>
        </Box>
        <Box 
            component="form"
            sx={{
              
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              marginTop: "30px", marginLeft: "300px", marginRight: "300px"
            }
            }
            gap = "1rem"
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
                
                id="boxhumid"
                label="Độ ẩm kích hoạt (%)"
                multiline
                disabled={switchValue}
                onChange={(event) => {setHumid(event.target.value)}}
              maxRows={4}
              />
            </div>
        </Box>
        <Box 
            component="form"
            sx={{
              
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              marginTop: "30px", marginLeft: "300px", marginRight: "300px"
            }
            }
            gap = "1rem"
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
                
                id="boxlight"
                label="Ánh sáng kích hoạt (LUX)"
                multiline
                disabled={switchValue}
                onChange={(event) => {setLight(event.target.value)}}
              maxRows={4}
              />
            </div>
          </Box>
            <Stack direction="row" spacing={2} sx={{ marginTop: "30px", marginLeft: "830px" }} gap = "1rem">
                <Button variant="contained" sx={{ width: "150px", height: "50px" }} onClick={handleClickOpen} >Save</Button>
        </Stack>
            <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              Xác nhận các thông số tự động
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Nhiệt độ: {temp} C
              </Typography>
              <Typography gutterBottom>
                Độ ẩm: {humid} %
              </Typography>
              <Typography gutterBottom>
                Ánh sáng: {light} LUX
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={senddata}>
                Kích hoạt ngưỡng tự chọn
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </LocalizationProvider>
      
        
  )
}

export default Schedule


