import * as assert from 'assert';
import * as converters from '../converters';

suite('Converters Tests', function () {
    test('hexToBytes', function() {
        assert.strictEqual(converters.hexToBytes(''), undefined);
        assert.deepStrictEqual(converters.hexToBytes('0'), new Uint8Array([0x00]));
        assert.deepStrictEqual(converters.hexToBytes('1'), new Uint8Array([0x01]));
        assert.deepStrictEqual(converters.hexToBytes('7f'), new Uint8Array([0x7f]));
        assert.deepStrictEqual(converters.hexToBytes('ff'), new Uint8Array([0xff]));
        assert.deepStrictEqual(converters.hexToBytes('123'), new Uint8Array([0x23, 0x01]));
        assert.deepStrictEqual(converters.hexToBytes('1234'), new Uint8Array([0x34, 0x12]));
        assert.deepStrictEqual(converters.hexToBytes('12345678'), new Uint8Array([0x78, 0x56, 0x34, 0x12]));
        assert.deepStrictEqual(converters.hexToBytes('123456789abcdef0'), new Uint8Array([0xf0, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12]));

        assert.strictEqual(converters.hexToBytes('', false), undefined);
        assert.deepStrictEqual(converters.hexToBytes('0', false), new Uint8Array([0x00]));
        assert.deepStrictEqual(converters.hexToBytes('1', false), new Uint8Array([0x01]));
        assert.deepStrictEqual(converters.hexToBytes('7f', false), new Uint8Array([0x7f]));
        assert.deepStrictEqual(converters.hexToBytes('ff', false), new Uint8Array([0xff]));
        assert.deepStrictEqual(converters.hexToBytes('123', false), new Uint8Array([0x01, 0x23]));
        assert.deepStrictEqual(converters.hexToBytes('1234', false), new Uint8Array([0x12, 0x34]));
        assert.deepStrictEqual(converters.hexToBytes('123456789abcdef0', false), new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0]));
    });

    test('bytesToUnsignedDec', function() {
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0x01])), '1');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0x01, 0x02])), '513');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0x12, 0x34, 0xfc])), '16528402');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0xdf, 0x59, 0x37, 0x5f])), '1597463007');
    });

    test('bytesToSignedDec', function() {
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0x81])), '-1');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0x01, 0x82])), '-513');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0x12, 0x34, 0xfc])), '-8139794');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0xdf, 0x59, 0x37, 0xdf])), '-1597463007');
    });

    test('bytesToBin', function() {
        assert.strictEqual(converters.bytesToBin(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0x01])), '00000001');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0x01, 0x02])), '0000001000000001');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0x12, 0x34, 0xfc])), '111111000011010000010010');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0xdf, 0x59, 0x37, 0x5f])), '01011111001101110101100111011111');
    });

    test('bytesToFloat16', function() {
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x01, 0x00])), 5.960464477539063e-8);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0xff, 0x03])), 6.097555160522461e-5);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0x04])), 6.103515625e-5);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0xff, 0x7b])), 65504);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0xff, 0x3b])), 0.99951171875);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0x3c])), 1);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x01, 0x3c])), 1.0009765625);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0xc0])), -2);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0x00])), 0);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0x80])), -0);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x55, 0x35])), 0.333251953125);
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0x7c])), 'infinity');
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x00, 0xfc])), '-infinity');
        assert.strictEqual(converters.bytesToFloat16(new Uint8Array([0x01, 0x7c])), 'NaN');
    });

    test('bytesToFloat32', function() {
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x01, 0x00, 0x00, 0x00])), 1.4012984643248170e-45);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0xff, 0xff, 0x7f, 0x00])), 1.1754942106924411e-38);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x80, 0x00])), 1.1754943508222875e-38);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0xff, 0xff, 0x7f, 0x7f])), 3.4028234663852885e+38);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0xff, 0xff, 0x7f, 0x3f])), 0.9999999403953552);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x80, 0x3f])), 1);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x01, 0x00, 0x80, 0x3f])), 1.0000001192092895);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x00, 0xc0])), -2);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x00, 0x00])), 0);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x00, 0x80])), -0);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0xdb, 0x0f, 0x49, 0x40])), 3.1415927410125732);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0xab, 0xaa, 0xaa, 0x3e])), 0.3333333432674408);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x20, 0x3e])), 0.15625);
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x80, 0x7f])), 'infinity');
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x00, 0x00, 0x80, 0xff])), '-infinity');
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x01, 0x00, 0x80, 0x7f])), 'NaN');
    });

    test('bytesToFloat64', function() {
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])), 4.9406564584124654e-324);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x0f, 0x00])), 2.2250738585072009e-308);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00])), 2.2250738585072014e-308);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0x7f])), 1.7976931348623157e+308);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f])), 1);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f])), 1.0000000000000002);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f])), 1.0000000000000004);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40])), 2);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0])), -2);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])), 0);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80])), -0);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x18, 0x2d, 0x44, 0x54, 0xfb, 0x21, 0x09, 0x40])), 3.1415926535897930);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0xd5, 0x3f])), 0.3333333333333333);
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x7f])), 'infinity');
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0xff])), '-infinity');
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x7f])), 'NaN');
    });

    test('bytesToStr', function() {
        assert.strictEqual(converters.bytesToStr(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToStr(new Uint8Array([0x30, 0x39, 0x20, 0x41, 0x5a, 0x20, 0x61, 0x7a])), 'za ZA 90');
    });

    test('bytesToSize', function() {
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0])), '0.000 B');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0x23, 0x01])), '291.000 B');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0x34, 0x12])), '4.551 KiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0x56, 0x34, 0x12])), '1.138 MiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0x78, 0x56, 0x34, 0x12])), '291.271 MiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0x9a, 0x78, 0x56, 0x34, 0x12])), '72.818 GiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])), '18.204 TiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])), '4.551 PiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xff, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])), '1.138 EiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xed, 0xff, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])), '291.271 EiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xcb, 0xed, 0xff, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])), '72.818 ZiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xa0, 0xcb, 0xed, 0xff, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])), '18.204 YiB');
        assert.strictEqual(converters.bytesToSize(new Uint8Array([0xdf, 0x59, 0x37, 0x5f])), '1.488 GiB');
    });
});
