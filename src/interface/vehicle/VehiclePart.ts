export interface VehiclePart {
  idPartVehicle: number;
  name: string;
  description: string;
  statusPart: string;
  idVehicle: number;
  status: boolean;
  idVehicleNavigation: any;
  logInspectionParts: any[];
  maintenanceParts: any[];
}

export interface RequestVehiclePart {
  name: string;
  description: string;
  statusPart: string;
  idVehicle: number;
  status: boolean;
}
