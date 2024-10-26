  export interface Municipality {
    idMunicipality: number;
    name: string
    status: boolean
    idDepartment: number
  }

  export interface MunicipalityRequest {
    idMunicipality: number;
    name: string;
    status?: boolean;
    idDepartment: number
  }

  
  export interface MunicipalityCreate{}
