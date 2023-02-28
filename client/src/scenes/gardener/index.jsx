import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGardenerQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Gardener = () => {
    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetGardenerQuery({
        search,
    });
    const columns = [
      {
        field: "uid",
        headerName: "ID",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "name",
        headerName: "Họ và tên",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "phone",
        headerName: "Số điện thoại",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "managerID",
        headerName: "Manager quản lý",
        flex: 0.4,
        headerClassName: "uppercase",
      },
    ];
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Gardener" subtitle="Danh sách người làm vườn" />
        <Box
          height="75vh"
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
                getRowId={(row) => row.uid}
                rows={(data?.Gardeners)  || []}
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
  
  export default Gardener;