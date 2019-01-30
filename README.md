<div align='center'>
  <img src='images/icon.png'>
</div>

# HexInspector

[![Installs](https://img.shields.io/visual-studio-marketplace/i/mateuszchudyk.hexinspector.svg?colorB=blue&style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=mateuszchudyk.hexinspector)
[![Release](https://img.shields.io/github/release/mateuszchudyk/vscode-hexinspector.svg?colorB=blue&style=for-the-badge)](https://github.com/mateuszchudyk/vscode-hexinspector/releases)
[![License](https://img.shields.io/badge/LIcense-MIT-blue.svg?colorB=blue&style=for-the-badge)](./LICENSE)

## Overview

**HexInspector** is an extension for [Visual Studio Code] provides fast and easy way to peek a hexadecimal value in different forms. The extension supports both `Little-Endian` and `Big-Endian` byte order. Hexadecimal values are recognized if they start with `0x` or `#` (e.g. `0x123`, `#1234`)

Hexadecimal value is converted to:
  - Decimal - unsigned and signed (only if the highest bit is set)
  - Binary
  - Float32
  - Float64
  - Char sequence

Extension can be downloaded from the [Marketplace].

## Screenshot

![](images/screenshot.png)

## License

[MIT]



[Visual Studio Code]: https://code.visualstudio.com/
[Marketplace]: https://marketplace.visualstudio.com/items?itemName=mateuszchudyk.hexinspector
[MIT]: LICENSE
