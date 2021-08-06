'use strict';

import * as assert from 'assert';
import * as input_handler from '../input_handlers';

suite('Input Handler Tests', function () {
    test('InputHandlerHex (parse)', function() {
        let inputDataType = new input_handler.InputHandlerHex();

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

    test('InputHandlerHex (getFormsMap)', function() {
        let formsMap = new input_handler.InputHandlerHex().getFormsMap();

        assert.ok(!('hexadecimal' in formsMap));
    });

    test('InputHandlerBin (parse)', function() {
        let inputDataType = new input_handler.InputHandlerBin();

        assert.strictEqual(inputDataType.parse(''), undefined);
        assert.strictEqual(inputDataType.parse('0b'), undefined);
        assert.strictEqual(inputDataType.parse('01'), undefined);
        assert.strictEqual(inputDataType.parse('0b0'), '0');
        assert.strictEqual(inputDataType.parse('0b1'), '0');
        assert.strictEqual(inputDataType.parse('0b01'), '01');
    });

    test('InputHandlerBin (getFormsMap)', function() {
        let formsMap = new input_handler.InputHandlerBin().getFormsMap();

        assert.ok(!('binary' in formsMap));
    });

    test('InputHandlerDec (parse)', function() {
        let inputDataType = new input_handler.InputHandlerDec();

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

    test('InputHandlerDec (getFormsMap)', function() {
        let formsMap = new input_handler.InputHandlerDec().getFormsMap();

        assert.ok(!('decimal' in formsMap));
    });
});
