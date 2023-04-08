import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSwitchState } from "state/areaSlice";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetAreaQuery } from "state/api";
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { io } from "socket.io-client";

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
const AreaInfo = ({
  aid,
  name,
  description,
  size,
  typeoftree,
  numberoftree,
  posx,
  posy,
  monthlyData
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const switchValue = useSelector((state) => state.area.switches[aid]) || false;
  const handleSwitchChange = (event) => {
    const { checked } = event.target;
    dispatch(setSwitchState({ id: aid, value: checked }));
    const { io } = require("socket.io-client");
    const socket = io("http://localhost:6556/", { 
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });
        socket.on('connect', () => {
      console.log(`Connected to server with id ${socket.id}`);
      socket.emit('Hello', event.target.checked);
    });
    
    socket.on('Hello', (data) => {
      console.log(`Received from server: ${data}`);
    });
    
    socket.on('error', (error) => {
      console.log(`Error: ${error.message}`);
    });
    
    // console.log('curl -F \'value=42\' -H \"X-AIO-Key: aio_wtkb37j5NzWI9lD2akaSKdaZiew1" https://io.adafruit.com/api/v2/vananh2110211/feeds/bbc-pump/data')
  };
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        margin: "20px",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          ID: {aid}
        </Typography>
        <Typography sx={{ fontSize: 20 }} variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem", fontSize: 20}} color={theme.palette.secondary[400]}>
          Diện tích: {size}
        </Typography> 
        <FormGroup>
          <FormControlLabel control={
            <PinkSwitch
              color="primary"
              checked={switchValue}
              onChange={handleSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Bật/Tắt Vòi Nước"
          />
        </FormGroup>

        <Typography  sx={{ mt: "1.5rem", fontSize: 20 }} variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Xem thêm
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Tổng số cây trong khu vực: {numberoftree}</Typography>
          <Typography>
            Tổng lượng nước đã tưới trong năm: {monthlyData.reduce((a, v) => a = a + v.totaltree, 0)}
          </Typography>
          <Typography>
            Tổng số lần tưới nước cho cây trong năm: {monthlyData.reduce((a,v) =>  a = a + v.totalwater, 0 )}
          </Typography>
          <Typography>
            Tọa độ: ({posx}, {posy})
          </Typography>
          <Typography>
            Các loại cây có trong khuôn viên: {String(typeoftree)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
// 
// 
const Area = () => {


  const { data, isLoading } = useGetAreaQuery();    
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
    return <Box m="1.5rem 2.5rem">
      <Header title="Area" subtitle="Danh sách khuôn viên trong trường" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              aid,
              name,
              description,
              size,
              typeoftree,
              numberoftree,
              posx,
              posy,
              monthlyData,
              dailyData,
            }) => (
              <AreaInfo
                key={aid}
                aid={aid}
                name={name}
                description={description}
                size={size}
                numberoftree={numberoftree}
                typeoftree={typeoftree}
                posx={posx}
                posy={posy}
                monthlyData={monthlyData}
                dailyData = {dailyData}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
  </Box>
}

export default Area