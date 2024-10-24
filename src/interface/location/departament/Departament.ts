export interface Departament {
    idDepartment: number
    name: string
    description: string;
    status: boolean
    towns: any[]
    creationDate: string;
    collaborators: any[];
  }
  
  export interface DepartamentRequest {
    name: string;
    description: string;
    status?: boolean;
  }
  
  export interface DepartamentCreate extends Omit<DepartamentRequest, 'status'> {}