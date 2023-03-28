import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {Route, Routes, HashRouter } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Area from "scenes/area";
import Tree from "scenes/tree"
import Watering from "scenes/watering"
import Overview from "scenes/overview"
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Gardener from "scenes/gardener";
import Schedule from "scenes/schedule";
// import Customers from "scenes/customers";
// import Transactions from "scenes/transactions";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/"  element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/area" element={<Area />} />
              <Route path="/tree" element={<Tree />} />
              <Route path="/watering" element={<Watering />} />
              <Route path ="/overview" element={<Overview />} />
              <Route path ="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/gardener" element={<Gardener />} />
              <Route path="/schedule" element={<Schedule />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}
export default App;