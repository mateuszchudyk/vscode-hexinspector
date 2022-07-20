<div align='center'>
  <img src='images/icon.png'>
</div>

# HexInspector

[![Installs](https://img.shields.io/visual-studio-marketplace/i/mateuszchudyk.hexinspector.svg?colorB=blue&style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=mateuszchudyk.hexinspector)
[![Release](https://img.shields.io/github/release/mateuszchudyk/vscode-hexinspector.svg?colorB=blue&style=for-the-badge)](https://github.com/mateuszchudyk/vscode-hexinspector/releases)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?colorB=blue&style=for-the-badge)](./LICENSE)

## Overview

**HexInspector** is an extension for [Visual Studio Code] that provides fast and easy way to peek other forms of an input value. The extension supports many different input/output formats and both little/big endianness. See more in `Settings` section below. The order of displayed formats can be also customized.

Extension is available on the [Marketplace].

<img src='images/screenshot.png'>

## Settings

Default values are bolded.

- `hexinspector.inputDataTypes` defines which data types trigger the hover.

  | Indentifier        | Description                                                                                |
  |--------------------|--------------------------------------------------------------------------------------------|
  | **"binary"**       | Token is recognized if it starts with `0b` and then contains only `0` and `1`.             |
  | **"decimal"**      | Token is recognized if it contains only digits.                                            |
  | **"hexadecimal"**  | Token is recognized if it starts with `0x` or `#` and then contains only `0`-`9`,`a`-`f`.  |

- `hexinspector.hoverContent` defines which data types are displayed on a hover.

  | Indentifier           | Description                                                                            |
  |-----------------------|----------------------------------------------------------------------------------------|
  | **"ascii"**           | Sequence of ASCII characters.                                                          |
  | **"binary"**          | Binary nuber with leading zeros.                                                       |
  | "bits set"            | List of set bits.                                                                      |
  | **"decimal"**         | Decimal number as unsigned/signed. Signed is displayed only if the highest bit is set. |
  | **"float16"**         | Float16 (IEEE 754). Displayed only if a value has at most 2 bytes.                     |
  | **"float32"**         | Float16 (IEEE 754). Displayed only if a value has at most 4 bytes.                     |
  | **"float64"**         | Float16 (IEEE 754). Displayed only if a value has at most 8 bytes.                     |
  | **"hexadecimal"**     | Hexadecimal number with leading zeros.                                                 |
  | **"size"**            | Size with 3 decimal places (if a unit is bigger than byte).                            |

- `hexinspector.endianness`
   Indentifier     | Description   |
  |----------------|---------------|
  | **true**       | Little Endian |
  | false          | Big Endian    |


## License

[MIT]



[Visual Studio Code]: https://code.visualstudio.com/
[Marketplace]: https://marketplace.visualstudio.com/items?itemName=mateuszchudyk.hexinspector
[MIT]: LICENSE
