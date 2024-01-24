export enum CommandType {
  SET_EMIT_INTERVAL,
  SET_DATA_COUNT,
  START_PSEUDO_SOCKET
}

interface BaseCommand {
  type: CommandType;
}

export interface SetEmitIntervalCommand extends BaseCommand {
  type: CommandType.SET_EMIT_INTERVAL;
  emitIntervalMs: number;
}

export interface SetDataCountCommand extends BaseCommand {
  type: CommandType.SET_DATA_COUNT;
  dataCount: number;
}

export interface StartPseudoSocketCommand extends BaseCommand {
  type: CommandType.START_PSEUDO_SOCKET;
  emitIntervalMs: number;
  dataCount: number;
}

export type WorkerCommand = StartPseudoSocketCommand | SetEmitIntervalCommand | SetDataCountCommand;
