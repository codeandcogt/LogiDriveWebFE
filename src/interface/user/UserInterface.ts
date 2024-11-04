export interface UserInterface {
  appUserId: number;
  name: string;
  email: string;
  password: string;
  collaboratorName: string;
  collaboratorLastName: string;
  position: string;
  phone: string;
  idRole: number;
  idArea: number;
  areaName?: string
}

export interface RequestUser {
  name: string
  email: string
  password: string
  collaboratorName: string
  collaboratorLastName: string
  position: string
  phone: string
  idRole: number
  idArea: number
}

export interface Role {
  idRole: number
  name: string
  description: string
  status: boolean
  appUsers: any[]
  idPermissions: IdPermission[]
}

interface IdPermission {
  idPermission: number
  name: string
  description: string
  status: boolean
  creationDate: string
}
