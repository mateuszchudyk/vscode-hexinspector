'use strict';

import * as assert from 'assert';
import * as input_data_types from '../input_data_types';

suite('Input Data Types Tests', function () {
    test('InputDataTypeHex (parse)', function() {
        let inputDataType = new input_data_types.InputDataTypeHex();

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

    test('InputDataTypeHex (getFormsMap)', function() {
        let formsMap = new input_data_types.InputDataTypeHex().getFormsMap();

        assert.ok(!('hexadecimal' in formsMap));
    });

    test('InputDataTypeBin (parse)', function() {
        let inputDataType = new input_data_types.InputDataTypeBin();

        assert.strictEqual(inputDataType.parse(''), undefined);
        assert.strictEqual(inputDataType.parse('0b'), undefined);
        assert.strictEqual(inputDataType.parse('01'), undefined);
        assert.strictEqual(inputDataType.parse('0b0'), '0');
        assert.strictEqual(inputDataType.parse('0b1'), '0');
        assert.strictEqual(inputDataType.parse('0b01'), '01');
    });

    test('InputDataTypeBin (getFormsMap)', function() {
        let formsMap = new input_data_types.InputDataTypeBin().getFormsMap();

        assert.ok(!('binary' in formsMap));
    });

    test('InputDataTypeDec (parse)', function() {
        let inputDataType = new input_data_types.InputDataTypeDec();

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

    test('InputDataTypeDec (getFormsMap)', function() {
        let formsMap = new input_data_types.InputDataTypeDec().getFormsMap();

        assert.ok(!('decimal' in formsMap));
    });
});
