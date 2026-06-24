export interface Module {
  id: number;
  faculty: string;
  program: string;
  semester: number;
  name: string;
}

export interface Partner {
  id: number;
  name: string;
  program: string;
  semester: number;
  format: string;
  module: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  program: string;
}

export interface StudyRequest {
  id: number;
  senderName: string;
  partnerName?: string;
  module: string;
  semester: number;
  message: string;
  status: string;
}
