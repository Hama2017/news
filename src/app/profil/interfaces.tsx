export interface PedestalsInPark{
  borne_id: number;
  borne_name: string;
  is_associated: boolean;
}


export interface PedestalsInParkEditForm{
  park_id: number;
  technician: string;
  pedestals_ids: number[];
}

export interface PedestalPark{
    park_id:number
    park_name:string
    technician:string
}