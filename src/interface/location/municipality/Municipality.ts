  export interface Municipality {
    idTown: number;
    name: string
    status: boolean
    idDepartment: number
  }

  export interface MunicipalityRequest {
    idTown: number;
    name: string;
    status?: boolean;
    idDepartment: number
  }

  
  export interface MunicipalityCreate{}
