import { EBCDICEncoding, EBCDICParserError } from './types';

export function validateInput(input: Buffer): void {
  if (!Buffer.isBuffer(input)) {
    throw new EBCDICParserError('Input must be a Buffer');
  }

  if (input.length === 0) {
    throw new EBCDICParserError('Input buffer cannot be empty');
  }
}

export function validateEncoding(encoding: EBCDICEncoding): void {
  if (!['utf-8', 'ascii'].includes(encoding)) {
    throw new EBCDICParserError('Output encoding must be either "utf-8" or "ascii"');
  }
} 