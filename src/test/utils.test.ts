import * as assert from 'assert';
import * as utils from '../utils';

suite('Utils Tests', function () {
    test('addThousandsSeparator', function() {
        assert.strictEqual(utils.addThousandsSeparator(''), '');
        assert.strictEqual(utils.addThousandsSeparator('1'), '1');
        assert.strictEqual(utils.addThousandsSeparator('12'), '12');
        assert.strictEqual(utils.addThousandsSeparator('123'), '123');
        assert.strictEqual(utils.addThousandsSeparator('1234'), '1,234');
        assert.strictEqual(utils.addThousandsSeparator('12345'), '12,345');
        assert.strictEqual(utils.addThousandsSeparator('123456'), '123,456');
        assert.strictEqual(utils.addThousandsSeparator('1234567'), '1,234,567');
    });

    test('addBytesSeparator', function() {
        assert.strictEqual(utils.addBytesSeparator(''), '');
        assert.strictEqual(utils.addBytesSeparator('0'), '0');
        assert.strictEqual(utils.addBytesSeparator('00'), '00');
        assert.strictEqual(utils.addBytesSeparator('000'), '000');
        assert.strictEqual(utils.addBytesSeparator('0000'), '0000');
        assert.strictEqual(utils.addBytesSeparator('00000'), '00000');
        assert.strictEqual(utils.addBytesSeparator('000000'), '000000');
        assert.strictEqual(utils.addBytesSeparator('0000000'), '0000000');
        assert.strictEqual(utils.addBytesSeparator('00000000'), '00000000');
        assert.strictEqual(utils.addBytesSeparator('100000000'), '1 00000000');
        assert.strictEqual(utils.addBytesSeparator('1100000000'), '11 00000000');
        assert.strictEqual(utils.addBytesSeparator('11100000000'), '111 00000000');
        assert.strictEqual(utils.addBytesSeparator('111100000000'), '1111 00000000');
        assert.strictEqual(utils.addBytesSeparator('1111100000000'), '11111 00000000');
        assert.strictEqual(utils.addBytesSeparator('11111100000000'), '111111 00000000');
        assert.strictEqual(utils.addBytesSeparator('111111100000000'), '1111111 00000000');
        assert.strictEqual(utils.addBytesSeparator('1111111100000000'), '11111111 00000000');
        assert.strictEqual(utils.addBytesSeparator('01111111100000000'), '0 11111111 00000000');
    });
});
