export interface AssigmentInterface {
  idLogReservation: number;
  idCollaborator: number;
  name: string;
  lastName: string;
  comment: string;
  idTown: number;
  numberPeople: number;
  statusReservation: string;
  justify: string;
  addres: string;
  status: boolean;
  creationDate: string;
}


export interface RequestAssigment {
  statusReservation: string
  justify: string
}

export interface RequestBooking {
  idVehicleAssignment?: number
  comment: string
  tripType: string
  startDate: string
  endDate: string
  idVehicle: number
  idLogReservation: number
  status: boolean
  creationDate?: string
  statusTrip?: boolean
  dayQuantity: number
}

export interface CreateBooking {
  comment: string
  tripType: string
  startDate: string
  endDate: string
  idVehicle: number
  idLogReservation: number
  status: boolean
  statusTrip?: boolean
  dayQuantity: number
}