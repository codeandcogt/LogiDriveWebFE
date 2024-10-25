export interface Departament {
    idDepartment: number
    name: string
    status: boolean
    towns: any[]
  }
  
  
  export interface DepartamentRequest {
    name: string;
    description: string;
    status?: boolean;
  }
  
  export interface DepartamentCreate extends Omit<DepartamentRequest, 'status'> {}