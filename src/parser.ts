import { EBCDICEncoding } from './types';
import { validateInput, validateEncoding } from './validators';

export class EBCDICParser {
  private static readonly EBCDIC_TO_ASCII: { [key: number]: number } = {
    // Basic EBCDIC to ASCII mapping
    0x40: 0x20, // Space
    0x4A: 0x0A, // Line Feed
    0x4B: 0x2E, // Period
    0x4C: 0x3C, // Less Than
    0x4D: 0x28, // Left Parenthesis
    0x4E: 0x2B, // Plus
    0x4F: 0x7C, // Vertical Bar
    0x50: 0x26, // Ampersand
    // Add more mappings as needed
  };

  /**
   * Converts EBCDIC encoded data to the specified output encoding
   * @param input - Buffer containing EBCDIC encoded data
   * @param outputEncoding - Desired output encoding (UTF-8 or ASCII)
   * @returns Buffer containing the converted data
   */
  public static convert(input: Buffer, outputEncoding: EBCDICEncoding): Buffer {
    validateInput(input);
    validateEncoding(outputEncoding);

    const outputBuffer = Buffer.alloc(input.length);
    
    for (let i = 0; i < input.length; i++) {
      const ebcdicByte = input[i];
      const asciiByte = this.EBCDIC_TO_ASCII[ebcdicByte] || ebcdicByte;
      outputBuffer[i] = asciiByte;
    }

    return outputBuffer;
  }

  /**
   * Converts a file from EBCDIC to the specified encoding
   * @param filePath - Path to the EBCDIC encoded file
   * @param outputEncoding - Desired output encoding (UTF-8 or ASCII)
   * @returns Promise<Buffer> containing the converted data
   */
  public static async convertFile(filePath: string, outputEncoding: EBCDICEncoding): Promise<Buffer> {
    const fs = await import('fs/promises');
    const fileBuffer = await fs.readFile(filePath);
    return this.convert(fileBuffer, outputEncoding);
  }
} 