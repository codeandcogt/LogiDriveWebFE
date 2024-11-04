export interface Area {
  idArea: number;
  name: string;
  description: string;
  status: boolean;
  creationDate: string;
  collaborators: any[];
}

export interface AreaRequest {
  name: string;
  description: string;
  status?: boolean;
}

export interface AreaCreate extends Omit<AreaRequest, 'status'> {}