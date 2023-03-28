
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
  
const Schedule = (aid) => {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    const dispatch = useDispatch();
    const switchValue = useSelector((state) => state.area.switches[aid]) || false;

    const handleSwitchChange = (event) => {
        const { checked } = event.target;
        dispatch(setSwitchState({ id: aid, value: checked }));
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack sx={{ marginTop: "30px", marginLeft: "300px", marginRight: "300px" }} gap = "1rem" display="grid" gridTemplateColumns="1fr 1fr" gridGap="1rem">
                <DesktopDatePicker
                label="Date From"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                        />
                    <DesktopDatePicker
                label="Date To"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                label="Time Start Watering"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                        />
                <TimePicker
                label="Time End Watering"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
            <FormGroup sx={{ marginTop: "30px", marginLeft: "300px", marginRight: "300px" }} gap = "1rem">
                <FormControlLabel control={
                    <PinkSwitch
                    color="primary"
                    checked={switchValue}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }} />} label="Bật/Tắt Tưới Nước Tự Động"
                />
            </FormGroup>
            <Stack direction="row" spacing={2} sx={{ marginTop: "30px", marginLeft: "830px" }} gap = "1rem">
                <Button variant="contained" sx={{ width: "150px", height: "50px" }} >Save</Button>
            </Stack>
        </LocalizationProvider>
        
  )
}

export default Schedule