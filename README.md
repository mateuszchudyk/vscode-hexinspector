<div align='center'>
  <img src='images/icon.png'>
</div>

# HexInspector

[![Installs](https://img.shields.io/visual-studio-marketplace/i/mateuszchudyk.hexinspector.svg?colorB=blue&style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=mateuszchudyk.hexinspector)
[![Release](https://img.shields.io/github/release/mateuszchudyk/vscode-hexinspector.svg?colorB=blue&style=for-the-badge)](https://github.com/mateuszchudyk/vscode-hexinspector/releases)
[![License](https://img.shields.io/badge/LIcense-MIT-blue.svg?colorB=blue&style=for-the-badge)](./LICENSE)

## Overview

**HexInspector** is an extension for [Visual Studio Code] that provides fast and easy way to peek other forms of a hexadecimal value. You just need to point a value and other forms will be summarized in a hover. Hexadecimal values are recognized if they start with `0x` or `#` (e.g. `0x123`, `#1234`). The extension supports both `Little-Endian` and `Big-Endian` byte order. You can choose endianness in settings.

Extension is available on the [Marketplace].

## Supported forms

| Form               | Display                                                                      |
|--------------------|------------------------------------------------------------------------------|
| Decimal            | Unsigned (always) / Signed (if the highest bit of the highest byte is set)   |
| Size               | With 3 decimal places                                                        |
| Binary             | With leading zeros                                                           |
| Float16 (IEEE 754) | Only if value has at most 2 bytes                                            |
| Float32 (IEEE 754) | Only if value has at most 4 bytes                                            |
| Float64 (IEEE 754) | Only if value has at most 8 bytes                                            |
| Chars              | Sequence of characters                                                       |

## Screenshot

![](images/screenshot.png)

## License

[MIT]



[Visual Studio Code]: https://code.visualstudio.com/
[Marketplace]: https://marketplace.visualstudio.com/items?itemName=mateuszchudyk.hexinspector
[MIT]: LICENSE
