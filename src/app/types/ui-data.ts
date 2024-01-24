import {
  PsuedoSocketColor,
  PsuedoSocketDtoChild,
  PsuedoSocketDtoId,
  PsuedoSocketDtoItem
} from './psuedo-socket-dto';

export type OverrideId = string;

export class UiData implements PsuedoSocketDtoItem {
  static from(raw: PsuedoSocketDtoItem, overrideId: PsuedoSocketDtoId | undefined): UiData {
    return new UiData(
      raw.child,
      raw.color,
      raw.float,
      raw.id,
      raw.int,
      overrideId ?? raw.id
    );
  }

  private constructor(
    public readonly child: Readonly<PsuedoSocketDtoChild>,
    public readonly color: PsuedoSocketColor,
    public readonly float: number,
    public readonly id: PsuedoSocketDtoId,
    public readonly int: number,
    public readonly overrideId: OverrideId = id
  ) {
  }
}
