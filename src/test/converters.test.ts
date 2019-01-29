import * as assert from 'assert';
import * as converters from '../converters';

suite('Converters Tests', function () {
    test('hexToBytes', function() {
        assert.strictEqual(converters.hexToBytes(''), undefined);
        assert.strictEqual(converters.hexToBytes('0x'), undefined);
        assert.deepStrictEqual(converters.hexToBytes('0x0'), new Uint8Array([0x0]));
        assert.deepStrictEqual(converters.hexToBytes('0x1'), new Uint8Array([0x1]));
        assert.deepStrictEqual(converters.hexToBytes('0x7f'), new Uint8Array([0x7f]));
        assert.deepStrictEqual(converters.hexToBytes('0xff'), new Uint8Array([0xff]));
        assert.deepStrictEqual(converters.hexToBytes('0x123'), new Uint8Array([0x23, 0x1]));
        assert.deepStrictEqual(converters.hexToBytes('0x1234'), new Uint8Array([0x34, 0x12]));
        assert.deepStrictEqual(converters.hexToBytes('0x12345678'), new Uint8Array([0x78, 0x56, 0x34, 0x12]));

        assert.strictEqual(converters.hexToBytes(''), undefined);
        assert.strictEqual(converters.hexToBytes('#'), undefined);
        assert.deepStrictEqual(converters.hexToBytes('#0'), new Uint8Array([0x0]));
        assert.deepStrictEqual(converters.hexToBytes('#1'), new Uint8Array([0x1]));
        assert.deepStrictEqual(converters.hexToBytes('#7f'), new Uint8Array([0x7f]));
        assert.deepStrictEqual(converters.hexToBytes('#ff'), new Uint8Array([0xff]));
        assert.deepStrictEqual(converters.hexToBytes('#123'), new Uint8Array([0x23, 0x1]));
        assert.deepStrictEqual(converters.hexToBytes('#1234'), new Uint8Array([0x34, 0x12]));
        assert.deepStrictEqual(converters.hexToBytes('#12345678'), new Uint8Array([0x78, 0x56, 0x34, 0x12]));

        assert.strictEqual(converters.hexToBytes('', false), undefined);
        assert.strictEqual(converters.hexToBytes('0x', false), undefined);
        assert.deepStrictEqual(converters.hexToBytes('0x0', false), new Uint8Array([0x0]));
        assert.deepStrictEqual(converters.hexToBytes('0x1', false), new Uint8Array([0x1]));
        assert.deepStrictEqual(converters.hexToBytes('0x7f', false), new Uint8Array([0x7f]));
        assert.deepStrictEqual(converters.hexToBytes('0xff', false), new Uint8Array([0xff]));
        assert.deepStrictEqual(converters.hexToBytes('0x123', false), new Uint8Array([0x1, 0x23]));
        assert.deepStrictEqual(converters.hexToBytes('0x1234', false), new Uint8Array([0x12, 0x34]));
        assert.deepStrictEqual(converters.hexToBytes('0x12345678', false), new Uint8Array([0x12, 0x34, 0x56, 0x78]));

        assert.strictEqual(converters.hexToBytes('', false), undefined);
        assert.strictEqual(converters.hexToBytes('#', false), undefined);
        assert.deepStrictEqual(converters.hexToBytes('#0', false), new Uint8Array([0x0]));
        assert.deepStrictEqual(converters.hexToBytes('#1', false), new Uint8Array([0x1]));
        assert.deepStrictEqual(converters.hexToBytes('#7f', false), new Uint8Array([0x7f]));
        assert.deepStrictEqual(converters.hexToBytes('#ff', false), new Uint8Array([0xff]));
        assert.deepStrictEqual(converters.hexToBytes('#123', false), new Uint8Array([0x1, 0x23]));
        assert.deepStrictEqual(converters.hexToBytes('#1234', false), new Uint8Array([0x12, 0x34]));
        assert.deepStrictEqual(converters.hexToBytes('#12345678', false), new Uint8Array([0x12, 0x34, 0x56, 0x78]));
    });

    test('bytesToUnsignedDec', function() {
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0x1])), '1');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0x1, 0x2])), '513');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0x12, 0x34, 0xfc])), '16528402');
        assert.strictEqual(converters.bytesToUnsignedDec(new Uint8Array([0xdf, 0x59, 0x37, 0x5f])), '1597463007');
    });

    test('bytesToSignedDec', function() {
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0x81])), '-1');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0x1, 0x82])), '-513');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0x12, 0x34, 0xfc])), '-8139794');
        assert.strictEqual(converters.bytesToSignedDec(new Uint8Array([0xdf, 0x59, 0x37, 0xdf])), '-1597463007');
    });

    test('bytesToBin', function() {
        assert.strictEqual(converters.bytesToBin(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0x1])), '00000001');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0x1, 0x2])), '0000001000000001');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0x12, 0x34, 0xfc])), '111111000011010000010010');
        assert.strictEqual(converters.bytesToBin(new Uint8Array([0xdf, 0x59, 0x37, 0x5f])), '01011111001101110101100111011111');
    });

    test('bytesToFloat32', function() {
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToFloat32(new Uint8Array([0x0, 0x0, 0x20, 0x3e])), 0.15625);
    });

    test('bytesToFloat64', function() {
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToFloat64(new Uint8Array([0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0xd5, 0x3f])), 0.3333333333333333);
    });

    test('bytesToStr', function() {
        assert.strictEqual(converters.bytesToStr(new Uint8Array([])), '');
        assert.strictEqual(converters.bytesToStr(new Uint8Array([0x30, 0x39, 0x20, 0x41, 0x5a, 0x20, 0x61, 0x7a])), 'za ZA 90');
    });
});
