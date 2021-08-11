'use strict';

import * as assert from 'assert';
import * as utils from '../utils';

suite('Utils Tests', function () {
    test('addSeparatorToNumber', function() {
        assert.strictEqual(utils.addSeparatorToNumber('', ',', 1), '');
        assert.strictEqual(utils.addSeparatorToNumber('1', ',', 1), '1');
        assert.strictEqual(utils.addSeparatorToNumber('12', ',', 1), '1,2');
        assert.strictEqual(utils.addSeparatorToNumber('123', ',', 1), '1,2,3');
        assert.strictEqual(utils.addSeparatorToNumber('-123', ',', 1), '-1,2,3');

        assert.strictEqual(utils.addSeparatorToNumber('', ',', 2), '');
        assert.strictEqual(utils.addSeparatorToNumber('1', ',', 2), '1');
        assert.strictEqual(utils.addSeparatorToNumber('12', ',', 2), '12');
        assert.strictEqual(utils.addSeparatorToNumber('123', ',', 2), '1,23');
        assert.strictEqual(utils.addSeparatorToNumber('1234', ',', 2), '12,34');
        assert.strictEqual(utils.addSeparatorToNumber('12345', ',', 2), '1,23,45');
        assert.strictEqual(utils.addSeparatorToNumber('123456', ',', 2), '12,34,56');
        assert.strictEqual(utils.addSeparatorToNumber('-123456', ',', 2), '-12,34,56');

        assert.strictEqual(utils.addSeparatorToNumber('', ',', 3), '');
        assert.strictEqual(utils.addSeparatorToNumber('1', ',', 3), '1');
        assert.strictEqual(utils.addSeparatorToNumber('12', ',', 3), '12');
        assert.strictEqual(utils.addSeparatorToNumber('123', ',', 3), '123');
        assert.strictEqual(utils.addSeparatorToNumber('1234', ',', 3), '1,234');
        assert.strictEqual(utils.addSeparatorToNumber('12345', ',', 3), '12,345');
        assert.strictEqual(utils.addSeparatorToNumber('123456', ',', 3), '123,456');
        assert.strictEqual(utils.addSeparatorToNumber('1234567', ',', 3), '1,234,567');
        assert.strictEqual(utils.addSeparatorToNumber('12345678', ',', 3), '12,345,678');
        assert.strictEqual(utils.addSeparatorToNumber('123456789', ',', 3), '123,456,789');
        assert.strictEqual(utils.addSeparatorToNumber('-123456789', ',', 3), '-123,456,789');
    });

    test('reverseString', function() {
        assert.strictEqual(utils.reverseString(''), '');
        assert.strictEqual(utils.reverseString('a'), 'a');
        assert.strictEqual(utils.reverseString('ab'), 'ba');
        assert.strictEqual(utils.reverseString('aba'), 'aba');
    });

    test('switchEndian', function() {
        assert.deepStrictEqual(utils.switchEndian(new Uint8Array([0x01])), new Uint8Array([0x01]));
        assert.deepStrictEqual(utils.switchEndian(new Uint8Array([0x01, 0x02])), new Uint8Array([0x02, 0x01]));
    });

    test('countBits', function() {
        assert.strictEqual(utils.countBits(new Uint8Array([])), 0);
        assert.strictEqual(utils.countBits(new Uint8Array([0b00000000])), 0);
        assert.strictEqual(utils.countBits(new Uint8Array([0b00000001])), 1);
        assert.strictEqual(utils.countBits(new Uint8Array([0b00000010])), 2);
        assert.strictEqual(utils.countBits(new Uint8Array([0b11111111, 0b11111111, 0b01000000])), 23);
    });

    test('shiftBytes', function() {
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001]), 0), new Uint8Array([0b00010001]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 0),new Uint8Array([0b00010001, 0b00100010]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 1),new Uint8Array([0b00001000, 0b00010001]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 2),new Uint8Array([0b10000100, 0b00001000]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 3),new Uint8Array([0b01000010, 0b00000100]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 4),new Uint8Array([0b00100001, 0b00000010]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 5),new Uint8Array([0b00010000, 0b00000001]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 6),new Uint8Array([0b10001000, 0b00000000]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 7),new Uint8Array([0b01000100, 0b00000000]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 8),new Uint8Array([0b00100010, 0b00000000]));
        assert.deepStrictEqual(utils.shiftBytes(new Uint8Array([0b00010001, 0b00100010]), 100),new Uint8Array([0b00000000, 0b00000000]));
    });
});
