export type PsuedoSocketDtoId = string;
export type PsuedoSocketColor = string;

export interface PsuedoSocketDtoChild {
  id: PsuedoSocketDtoId;
  color: PsuedoSocketColor;
}

export interface PsuedoSocketDtoItem {
  id: PsuedoSocketDtoId;
  int: number;
  float: number;
  color: PsuedoSocketColor;
  child: PsuedoSocketDtoChild;
}

export type PsuedoSocketDto = PsuedoSocketDtoItem[];
