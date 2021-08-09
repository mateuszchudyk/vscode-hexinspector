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
});
