export type EBCDICEncoding = 'utf-8' | 'ascii';

export class EBCDICParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EBCDICParserError';
  }
} 