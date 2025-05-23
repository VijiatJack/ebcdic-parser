# EBCDIC Parser

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/yourusername/ebcdic-parser)

A Node.js library for parsing and converting EBCDIC encoded files to UTF-8 or ASCII formats.

## Installation

```bash
npm install ebcdic-parser
```

## Requirements

- Node.js >= 14.0.0

## Usage

### Converting a Buffer

```typescript
import { EBCDICParser } from 'ebcdic-parser';

// Convert EBCDIC buffer to ASCII
const ebcdicBuffer = Buffer.from([0x40, 0x4A, 0x4B]); // Space, LF, Period in EBCDIC
const asciiBuffer = EBCDICParser.convert(ebcdicBuffer, 'ascii');
console.log(asciiBuffer.toString()); // Output: " \n."
```

### Converting a File

```typescript
import { EBCDICParser } from 'ebcdic-parser';

// Convert EBCDIC file to UTF-8
async function convertFile() {
  try {
    const utf8Buffer = await EBCDICParser.convertFile('input.ebcdic', 'utf-8');
    console.log(utf8Buffer.toString());
  } catch (error) {
    console.error('Error converting file:', error);
  }
}
```

## API Reference

### EBCDICParser.convert(input: Buffer, outputEncoding: 'utf-8' | 'ascii'): Buffer

Converts an EBCDIC encoded buffer to the specified output encoding.

- `input`: Buffer containing EBCDIC encoded data
- `outputEncoding`: Desired output encoding ('utf-8' or 'ascii')
- Returns: Buffer containing the converted data

### EBCDICParser.convertFile(filePath: string, outputEncoding: 'utf-8' | 'ascii'): Promise<Buffer>

Converts an EBCDIC encoded file to the specified output encoding.

- `filePath`: Path to the EBCDIC encoded file
- `outputEncoding`: Desired output encoding ('utf-8' or 'ascii')
- Returns: Promise<Buffer> containing the converted data

## Error Handling

The library throws `EBCDICParserError` for the following cases:

- Invalid input (non-Buffer or empty Buffer)
- Invalid output encoding
- File read errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 