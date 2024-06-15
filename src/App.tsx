
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Processes from './Procesos';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText, CssBaseline, Grid } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useFetchSystemData from './Hooks/useRamData';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


function Home() {

  const { data, loading, error } = useFetchSystemData();

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

    // Verificar si data está definido y tiene las propiedades necesarias
    if (!data || !data.cpu || !data.ram) {
      return <Typography variant="h6">Información de ram y CPU no disponible</Typography>;
    }

 // Datos para la gráfica de CPU
 const cpuData = {
  labels: ['CPU uso '+data.cpu.Porcentaje_en_uso+'%','CPU Libre '+(100-data.cpu.Porcentaje_en_uso)+'%'],
  datasets: [
    {
      label: 'CPU Rendimiento',
      data: [data?.cpu.Porcentaje_en_uso, 100 - data?.cpu.Porcentaje_en_uso],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
};

// Datos para la gráfica de RAM
const ramData = {
  labels: ['RAM Uso '+data.ram.Porcentaje_en_uso+'%', 'RAM libre '+(100-data.ram.Porcentaje_en_uso)+'%'],
  datasets: [
    {
      label: 'RAM Rendimiento',
      data: [data?.ram.Porcentaje_en_uso, 100 - data?.ram.Porcentaje_en_uso],
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
  ],
};



    return (
    <Box p={2}>
      <Typography variant="h3">Gráficas e Información</Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="h4">RAM</Typography>
          <Pie data={ramData} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">CPU</Typography>
          <Pie data={cpuData} />
        </Grid>
        <Grid item xs={6}>
          <Box mt={4}>
            <Typography variant="h4">Información de RAM</Typography>
            <Typography variant="body1">Porcentaje en uso: {data.ram.Porcentaje_en_uso}%</Typography>
            <Typography variant="body1">RAM en uso: {data.ram.Ram_en_Uso/1000000} MB</Typography>
            <Typography variant="body1">RAM libre: {data.ram.Ram_libre/1000000} MB</Typography>
            <Typography variant="body1">Total RAM: {data.ram.Total_Ram/1000000} MB</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={4}>
            <Typography variant="h4">Información de CPU</Typography>
            <Typography variant="body1">Porcentaje en uso: {data.cpu.Porcentaje_en_uso}%</Typography>
            <Typography variant="body1">CPU en uso: {data.cpu.Cpu_en_Uso/1000000} MB</Typography>
            <Typography variant="body1">CPU libre: {data.cpu.Cpu_Libre/1000000} MB</Typography>
            <Typography variant="body1">Total CPU: {data.cpu.Total_Cpu/1000000} MB</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function Menu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Gráfica" />
          </ListItem>
          <ListItem button component={Link} to="/processes">
            <ListItemText primary="Procesos" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Vite + React + MUI
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/processes" element={<Processes />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
