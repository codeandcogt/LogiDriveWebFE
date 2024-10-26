  export interface Municipality {
    idMunicipality: number;
    name: string
    idDepartment: number
    status: boolean
  }

  export interface MunicipalityRequest {
    name: string;
    description: string;
    status?: boolean;
  }
  
  export interface MunicipalityCreate extends Omit<MunicipalityRequest, 'status'> {}