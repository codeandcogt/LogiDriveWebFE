export interface Departament {
    idDepartment: number
    name: string
    status: boolean
    towns: any[]
  }
  
  
  export interface DepartamentRequest {
    idDepartment: number
    name: string;
    status?: boolean;
  }
  
  export interface DepartamentCreate{}