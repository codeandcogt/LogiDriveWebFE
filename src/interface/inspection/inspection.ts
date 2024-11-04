export interface InspectionInterface {
    idVehicleAssignment: number
    comment: string
    tripType: string
    startDate: string
    endDate: string
    idVehicle: number
    idLogReservation: number
    status: boolean
    creationDate: string
  }
export interface PartInspected {
  idPartVehicle: number;
  comment: string;
  status: boolean;
  image: string;
  dateInspection: string;
}
export interface LogProcess {
  idLogReservation: number;
  action: string;
  idCollaborator: number;
  idVehicleAssignment: number;
}

export interface CreateInspection {
  idCollaborator: number;
  idVehicleAssignment: number;
  comment: string;
  odometer: string;
  fuel: string;
  typeInspection: string;
  image: string;
  status: boolean;
  partsInspected: PartInspected[];
  logProcess: LogProcess;
}