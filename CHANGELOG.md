# Change Log

## [1.3.0] (2022-03-11)

### Fixed
- Fix characters representation

## [1.2.0] (2021-08-10)

### Added
- Support for C/C++ integer literals (u/l/ll/ul/ull) for decimal input values
- Setting to select what input data types trigger the hover

### Fixed
- Fix coloring hexadecimal inputs
- Fix adding separator to a number

## [1.1.0] (2021-08-05)

### Added
- Support for binary inputs
- Support for decimal inputs
- Support for customization of the hover content

### Fixed
- Fix color of the input's length on the hover

## [1.0.1] (2019-07-13)

### Added
- Support for C/C++ integer literals (u/l/ll/ul/ull)

### Fixed
- Fix regexes that check if a hexadecimal value has a correct form
- Fix coloring hexadecimal value in syntax

## [1.0.0] (2019-04-28)

### Changed
- New hover layout colors

## [0.0.3] (2019-02-02)

### Added
- Conversion to size in a readable form with binary prefix (e.g. KiB, etc.)
- Display length of a hexadecimal value in bytes
- Conversion to Float16

### Fixed
- Make bytesToFloat32 compatible with IEEE 754
- Make bytesToFloat64 compatible with IEEE 754
- Fix bug in bytesToSignedDec (it unset the highest bit of the input)

## [0.0.2] (2019-01-25)

### Added
- Conversion to signed decimal
- Support for Big-Endian
- Unit tests

### Changed
- Improve readability of decimal and binary values

## [0.0.1] (2019-01-23)

Display a hover with following conversions of the pointed hexadecimal value:
  - Decimal
  - Binary
  - Float32
  - Float64
  - Char sequence



[1.3.0]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v0.0.3...v1.0.0
[0.0.3]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/mateuszchudyk/vscode-hexinspector/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/mateuszchudyk/vscode-hexinspector/commit/165f3ed7caeed85a803346ce4e36781e25abb1ce
