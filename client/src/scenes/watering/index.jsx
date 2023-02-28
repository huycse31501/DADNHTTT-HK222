
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetWateringQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Waterings = () => {
    const theme = useTheme();
  
    // values to be sent to the backend

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetWateringQuery({
      search,
    });

    const columns = [
      {
        field: "wid",
        headerName: "ID",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "arid",
        headerName: "Tưới tại khu vực",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "createdAt",
        headerName: "Thời gian tưới nước",
        flex: 1,
        headerClassName: "uppercase",
      },
      {
        field: "updatedAt",
        headerName: "Thời gian cập nhật",
        flex: 1,
        headerClassName: "uppercase",
        },
      {
        field: "wateramount",
        headerName: "Lượng nước tưới",
        flex: 1,
        headerClassName: "uppercase",
      },
    ];
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Watering History" subtitle="Lịch sử tưới nước" />
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
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
              backgroundColor: theme.palette.primary.light,
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
            rows={(data && data.Waterings) || []}
            columns={columns}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      </Box>
    );
  };
  
  export default Waterings;