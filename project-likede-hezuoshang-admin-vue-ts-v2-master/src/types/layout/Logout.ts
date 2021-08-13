export interface PartnerRes {
  vmCount?: string;
}

export interface RouteObj {
  [platname: string]: unknown;
}

export interface DiaFormData {
  addr?: string | null;
  city?: string | null;
  contact?: string | null;
  county?: string | null;
  email?: string | null;
  id?: number;
  mobile?: string | null;
  name?: string | null;
  phone?: string | null;
  province?: string | null;
  ratio?: number;
  status?: boolean; 
}