import axios from 'axios';
import { DeleteProcess } from '../types/types';

const handleCreateClick = async () => {
  try {
    //const response = await axios.get('http://127.0.0.1:3000/start');
    const response = await axios.get('http://backend:3000/start');
    //console.log('Proceso creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el proceso:', error);
    return 'Error al crear el proceso';
  }
};


const handleDeleteClick = async (pid: number) => {
    const processDel: DeleteProcess = { pid: pid.toString() };
    try {
      //const response = await axios.post('http://127.0.0.1:3000/kill', processDel);
      const response = await axios.post('http://backend:3000/kill', processDel);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el proceso:', error);
      return 'Error al eliminar el proceso';
    }
  };

export { handleCreateClick, handleDeleteClick };
