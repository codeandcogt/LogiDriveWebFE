export interface VehicleDetail {
  idVehicle: number;
  brand: string;
  plate: string;
  tyoe: string;
  year: string;
  mileage: string;
  capacity: number;
  statusVehicle: string;
  status: boolean;
  creationDate: string;
  partVehicles: any[];
  services: any[];
  vehicleAssignments: any[];
}

export interface RequestVehicleDetail {
  brand: string
  plate: string
  tyoe: string
  year: string
  mileage: string
  capacity: number
  statusVehicle: string
  status?: boolean
}

