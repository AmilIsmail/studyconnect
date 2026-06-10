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