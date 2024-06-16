import { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import useFetchSystemData from './Hooks/useRamData';
import { handleCreateClick, handleDeleteClick } from './Hooks/CRUDProceso';
import { mapStateToText } from './types/estados';

interface ChildProcess {
  name: string;
  pid: number;
  pidPadre: number;
  state: number;
}



function Processes() {
  const { data, loading, error } = useFetchSystemData();
  const [openPids, setOpenPids] = useState<number[]>([]);
  const [pidToDelete, setPidToDelete] = useState<number | ''>('');
  const [createMessage, setCreateMessage] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);


  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  // Verificar si data está definido y tiene las propiedades necesarias
  if (!data || !data.cpu || !data.cpu.processes) {
    return <Typography variant="h6">Información de procesos no disponible</Typography>;
  }

  const handlePidClick = (pid: number) => {
    setOpenPids((prevOpenPids) =>
      prevOpenPids.includes(pid)
        ? prevOpenPids.filter((openPid) => openPid !== pid)
        : [...prevOpenPids, pid]
    );
  };

  const handleCreate = async () => {
    const message = await handleCreateClick();
    setCreateMessage("Proceso creado: " +message);
    setTimeout(() => {
      setCreateMessage(null);
    }, 3000);
  };

  const handleDelete = async () => {
    if (pidToDelete !== '') {
      const message = await handleDeleteClick(pidToDelete);
      setDeleteMessage(message);
      setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4">Procesos</Typography>
      <Box mb={2} display="flex" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear
        </Button>
        <TextField
          label="PID"
          type="number"
          value={pidToDelete}
          onChange={(e) => setPidToDelete(Number(e.target.value))}
          sx={{ mx: 2 }}
        />
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Eliminar
        </Button>
        
      </Box>
      {createMessage && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {createMessage}
        </Alert>
      )}
      {deleteMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {deleteMessage}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nombre</TableCell>
              <TableCell>PID</TableCell>
              <TableCell>PID Padre</TableCell>
              <TableCell>Estado</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.cpu.processes.map((process: any) => (
              <>
                <TableRow key={process.pid}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handlePidClick(process.pid)}
                    >
                      {openPids.includes(process.pid) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{process.name}</TableCell>
                  <TableCell>{process.pid}</TableCell>
                  <TableCell>{process.pidPadre}</TableCell>                  
                  <TableCell>{mapStateToText(process.state)}</TableCell>
                </TableRow>
                {process.child && (
                  <TableRow>
                    <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={openPids.includes(process.pid)} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div">
                            Procesos Hijos
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>Nombre</TableCell>
                                <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>PID</TableCell>
                                <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>PID Padre</TableCell>
                                <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>Estado</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {process.child.map((childProcess: ChildProcess) => (
                                <TableRow key={childProcess.pid}>
                                  <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>{childProcess.name}</TableCell>
                                  <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>{childProcess.pid}</TableCell>
                                  <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>{childProcess.pidPadre}</TableCell>
                                  <TableCell sx={{ bgcolor: 'rgba(240, 240, 240, 0.5)' }}>{mapStateToText(childProcess.state)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Processes;
