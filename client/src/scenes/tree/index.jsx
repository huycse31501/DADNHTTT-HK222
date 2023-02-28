import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetTreeQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Tree = () => {
    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetTreeQuery({
        search,
      });
    const columns = [
      {
        field: "tid",
        headerName: "ID",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "type",
        headerName: "Loại Cây",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "areabelong",
        headerName: "Khu vực",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "age",
        headerName: "Tuổi của cây",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "humidity",
        headerName: "Độ ẩm hiện tại (%)",
        flex: 0.4,
        headerClassName: "uppercase",
      },
      {
        field: "light",
        headerName: "Ánh sáng hiện tại (Lux)",
        flex: 0.5,
        headerClassName: "uppercase",
      },
      {
        field: "temperature",
        headerName: "Nhiệt độ hiện tại (C)",
        flex: 0.5,
        headerClassName: "uppercase",
      },
    ];
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="TREES" subtitle="Danh sách cây trong trường" />
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
                getRowId={(row) => row.tid}
                rows={(data) || []}
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
  
  export default Tree;