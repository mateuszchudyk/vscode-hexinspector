'use strict';

import * as assert from 'assert';
import * as input_handler from '../input_handlers';

suite('Input Handler Tests', function () {
    test('Binary (parse)', function() {
        let inputDataType = input_handler.createInputHandler('binary');

        assert.strictEqual(inputDataType.parse(''), undefined);
        assert.strictEqual(inputDataType.parse('0b'), undefined);
        assert.strictEqual(inputDataType.parse('01'), undefined);
        assert.strictEqual(inputDataType.parse('0b0'), '0');
        assert.strictEqual(inputDataType.parse('0b1'), '1');
        assert.strictEqual(inputDataType.parse('0b01'), '01');
    });

    test('Binary (getFormsMap)', function() {
        let formsMap = input_handler.createInputHandler('binary').getFormsMap();

        assert.ok(!('binary' in formsMap));
    });

    test('Decimal (parse)', function() {
        let inputDataType = input_handler.createInputHandler('decimal');

        assert.strictEqual(inputDataType.parse(''), undefined);
        assert.strictEqual(inputDataType.parse('0123456789'), '0123456789');
        assert.strictEqual(inputDataType.parse('1234'), '1234');
        assert.strictEqual(inputDataType.parse('1234u'), '1234');
        assert.strictEqual(inputDataType.parse('1234U'), '1234');
        assert.strictEqual(inputDataType.parse('1234l'), '1234');
        assert.strictEqual(inputDataType.parse('1234L'), '1234');
        assert.strictEqual(inputDataType.parse('1234UL'), '1234');
        assert.strictEqual(inputDataType.parse('1234LL'), '1234');
        assert.strictEqual(inputDataType.parse('1234ULL'), '1234');
    });

    test('Decimal (getFormsMap)', function() {
        let formsMap = input_handler.createInputHandler('decimal').getFormsMap();

        assert.ok(!('decimal' in formsMap));
    });

    test('Hexadecimal (parse)', function() {
        let inputDataType = input_handler.createInputHandler('hexadecimal');

        assert.strictEqual(inputDataType.parse(''), undefined);
        assert.strictEqual(inputDataType.parse('0x'), undefined);
        assert.strictEqual(inputDataType.parse('0f'), undefined);
        assert.strictEqual(inputDataType.parse('0x0123456789abcdef'), '0123456789abcdef');
        assert.strictEqual(inputDataType.parse('0xdead'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadu'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadU'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadl'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadL'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadUL'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadLL'), 'dead');
        assert.strictEqual(inputDataType.parse('0xdeadULL'), 'dead');
    });

    test('Hexadecimal (getFormsMap)', function() {
        let formsMap = input_handler.createInputHandler('hexadecimal').getFormsMap();

        assert.ok(!('hexadecimal' in formsMap));
    });
});
