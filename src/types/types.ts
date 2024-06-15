
export interface ChildProcess {
    name: string;
    pid: number;
    pidPadre: number;
    state: number;
  }
  
  export interface Process {
    child: ChildProcess[];
    name: string;
    pid: number;
    ram: number;
    state: number;
    user: number;
  }
  
  export interface CpuData {
    Cpu_Libre: number;
    Cpu_en_Uso: number;
    Porcentaje_en_uso: number;
    Total_Cpu: number;
    processes: Process[];
    running: number;
    sleeping: number;
    stopped: number;
    total: number;
    zombie: number;
  }
  
  export interface RamData {
    Porcentaje_en_uso: number;
    Ram_en_Uso: number;
    Ram_libre: number;
    Total_Ram: number;
  }
  
  export interface SystemData {
    cpu: CpuData;
    ram: RamData;
  }
  