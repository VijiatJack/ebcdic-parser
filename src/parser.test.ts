import { EBCDICParser } from './parser';
import { EBCDICParserError } from './types';

describe('EBCDICParser', () => {
  describe('convert', () => {
    it('should convert EBCDIC buffer to ASCII', () => {
      const input = Buffer.from([0x40, 0x4A, 0x4B]); // Space, LF, Period in EBCDIC
      const output = EBCDICParser.convert(input, 'ascii');
      expect(output).toEqual(Buffer.from([0x20, 0x0A, 0x2E]));
    });

    it('should throw error for invalid input', () => {
      expect(() => {
        EBCDICParser.convert(null as any, 'ascii');
      }).toThrow(EBCDICParserError);
    });

    it('should throw error for empty buffer', () => {
      expect(() => {
        EBCDICParser.convert(Buffer.alloc(0), 'ascii');
      }).toThrow(EBCDICParserError);
    });

    it('should throw error for invalid encoding', () => {
      expect(() => {
        EBCDICParser.convert(Buffer.from([0x40]), 'invalid' as any);
      }).toThrow(EBCDICParserError);
    });
  });

  describe('convertFile', () => {
    it('should convert file from EBCDIC to ASCII', async () => {
      const mockFs = {
        readFile: jest.fn().mockResolvedValue(Buffer.from([0x40, 0x4A, 0x4B]))
      };
      jest.mock('fs/promises', () => mockFs);

      const output = await EBCDICParser.convertFile('test.ebcdic', 'ascii');
      expect(output).toEqual(Buffer.from([0x20, 0x0A, 0x2E]));
    });
  });
}); 