import { React, useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery} from "state/api";
import StatBox from "components/StatBox";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterIcon from '@mui/icons-material/Water';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    // const result = await fetch('https://dadn-hapa-222.onrender.com/client/avg')
    const result = await fetch('https://dadn-hapa-222.onrender.com/client/avg')
      .then(response => response.json())
      .then(data => setDashboardData(data))
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  setInterval(fetchDashboardData, 5000);
  const columns = [
    {
      field: "wid",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "arid",
      headerName: "Khu vực tưới",
      flex: 0.5,
    },
    {
      field: "wateramount",
      headerName: "Lượng nước tưới",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
        field: "createdAt",
        headerName: "Thời gian tưới",
        flex: 1,
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Thống kê sơ lược" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Nhiệt độ trung bình"
          value={String(dashboardData && dashboardData?.avg[0]?.temperature.toFixed(2)) + " C"}
          increase="+14%"
          description="So với hôm qua"
          icon={
            <LocalFireDepartmentIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Độ ẩm"
          value={String(dashboardData && dashboardData?.avg[0]?.humidity.toFixed(2)) + " %"}
          increase="-10%"
          description="So với hôm qua"
          icon={
            <WaterIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Ánh sáng"
          value={String(dashboardData && dashboardData?.avg[0]?.light.toFixed(0)) + " Lux"}
          increase="+5%"
          description="So với hôm qua"
          icon={
            <WbSunnyIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Tổng lượng nước tưới"
          value={"183 mm3"}
          increase="+43%"
          description="So với hôm qua"
          icon={
            <InvertColorsIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.wid}
            rows={(data && data?.waterings) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
              >
                <Typography
                p="0 0.6rem"
                fontSize="1rem"
                sx={{
                    color: theme.palette.secondary[100],
                    ml: '80px',
                }}
                >
                Thống kê số cây trong khuôn viên
                </Typography>
          <BreakdownChart isDashboard={true} />

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;