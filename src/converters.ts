import * as utils from './utils';

//
// From X to bytes.
//
export function fromBinary(str: string, isLittleEndian: boolean) {
   if (!str) {
      return undefined;
   }
   str = utils.reverseString(str);

   var result = new Uint8Array((str.length + 7) / 8);
   for (let i = 0; i < result.length; i++) {
      result[i] = 0;
      for (let j = 0; j < 8 && 8 * i + j < str.length; j++) {
         result[i] += (str[i * 8 + j] == '1' ? 1 : 0) << j;
      }
   }

   if (!isLittleEndian) {
      result = utils.switchEndian(result);
   }
   return result;
}

function decToBin(str: string) {
   let result = '';

   let lastDigitIndex = 0;
   let dec = new Uint8Array(str.length);
   for (let i = 0; i < str.length; i++) {
      dec[str.length - i - 1] = parseInt(str[i]);
      if (dec[i] != 0)
         lastDigitIndex = i;
   }

   while (lastDigitIndex >= 0) {
      result = (dec[0] % 2) + result;
      for (let i = lastDigitIndex; i >= 0; i--) {
         if (dec[i] % 2 != 0 && i > 0) {
            dec[i - 1] += 10
         }
         dec[i] /= 2;
      }

      while (dec[lastDigitIndex] == 0)
         --lastDigitIndex;
   }

   return result;
}

export function fromDecimal(str: string, isLittleEndian: boolean) {
   if (!str) {
      return undefined;
   }

   return fromBinary(decToBin(str), isLittleEndian);
}

export function fromHexadecimal(str: string, isLittleEndian: boolean) {
   if (!str) {
      return undefined;
   }
   str = utils.reverseString(str);

   var result = new Uint8Array((str.length + 1) / 2);
   for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(str[2 * i], 16) + (2 * i + 1 < str.length ? 16 * parseInt(str[2 * i + 1], 16) : 0);
   }

   if (!isLittleEndian) {
      result = utils.switchEndian(result);
   }
   return result;
}

//
// From bytes to X.
//
export function toDecimalUnsigned(bytes: Uint8Array) {
   if (bytes.length == 0) {
      return '';
   }

   var dec = new Uint8Array(3 * bytes.length);
   for (let i = 0; i < bytes.length; i++) {
      var temp = new Uint32Array(3 * bytes.length);
      temp[0] = bytes[i] % 10;
      temp[1] = (bytes[i] / 10) % 10;
      temp[2] = (bytes[i] / 100) % 10;

      for (let j = 0; j < i; j++) {
         for (let k = 0; k < temp.length; k++) {
            temp[k] *= 256;
         }

         for (let k = 0; k < temp.length - 1; k++) {
            if (temp[k] >= 10) {
               temp[k + 1] += temp[k] / 10;
               temp[k] %= 10;
            }
         }
      }

      for (let j = 0; j < dec.length; j++) {
         dec[j] += temp[j];
      }
      for (let j = 0; j < dec.length - 1; j++) {
         if (dec[j] >= 10) {
            dec[j + 1] += dec[j] / 10;
            dec[j] %= 10;
         }
      }
   }

   var length = 0;
   for (let j = 0; j < dec.length; j++) {
      if (dec[j] != 0) {
         length = j;
      }
   }

   var result = '';
   for (let j = 0; j <= length; j++) {
      result = dec[j] + result;
   }

   return result;
}

export function toDecimalSigned(bytes: Uint8Array) {
   if (bytes.length == 0) {
      return '';
   }

   let copy = new Uint8Array(bytes.length);
   for (let i = 0; i < bytes.length; ++i) {
      copy[i] = bytes[i];
   }

   let sign = copy[copy.length - 1] >> 7;
   copy[copy.length - 1] &= 0x7f;
   return (sign ? '-' : '') + toDecimalUnsigned(copy);
}

export function toBinary(bytes: Uint8Array) {
   var result = '';
   for (const byte of bytes) {
      for (let i = 0; i < 8; i++) {
         result = ((byte >> i) % 2) + result;
      }
   }
   return result;
}

export function toHexadecimal(bytes: Uint8Array) {
   var result = '';
   for (const byte of bytes) {
      result = ('0' + byte.toString(16)).slice(-2) + result;
   }
   return result;
}

export function toFloat16(bytes: Uint8Array) {
   if (bytes.length > 2 || bytes.length == 0) {
      return '';
   }

   var sign = bytes.length == 2 ? bytes[1] >> 7 : 0;
   var exponent = (bytes.length == 2 ? bytes[1] & 0x7c : 0) >> 2;
   var significand = ((bytes.length == 2 ? bytes[1] & 0x3 : 0) << 8) + bytes[0];

   if (exponent == 0x00) {
      if (significand == 0) {
         return sign * 0;
      }
      else {
         return (sign ? -1.0 : 1.0) * Math.pow(2, -14) * (significand / (1 << 10));
      }
   }
   else if (exponent == 0x1f) {
      if (significand == 0) {
         return (sign ? '-' : '') + 'infinity';
      }
      else {
         return 'NaN';
      }
   }
   else {
      return (sign ? -1.0 : 1.0) * Math.pow(2, exponent - 15) * (1 + significand / (1 << 10));
   }
}

export function toFloat32(bytes: Uint8Array) {
   if (bytes.length > 4 || bytes.length == 0) {
      return '';
   }

   var sign = bytes.length == 4 ? bytes[3] >> 7 : 0;
   var exponent =
      ((bytes.length == 4 ? bytes[3] & 0x7f : 0) << 1) +
      (bytes.length >= 3 ? bytes[2] >> 7 : 0);
   var significand =
      ((bytes.length >= 3 ? bytes[2] & 0x7f : 0) << 16) +
      ((bytes.length >= 2 ? bytes[1] : 0) << 8) +
      bytes[0];

   if (exponent == 0x00) {
      if (significand == 0) {
         return sign * 0;
      }
      else {
         return (sign ? -1.0 : 1.0) * Math.pow(2, -126) * (significand / (1 << 23));
      }
   }
   else if (exponent == 0xff) {
      if (significand == 0) {
         return (sign ? '-' : '') + 'infinity';
      }
      else {
         return 'NaN';
      }
   }
   else {
      return (sign ? -1.0 : 1.0) * Math.pow(2, exponent - 127) * (1 + significand / (1 << 23));
   }
}

export function toFloat64(bytes: Uint8Array) {
   if (bytes.length > 8 || bytes.length == 0) {
      return '';
   }

   var sign = bytes.length == 8 ? bytes[7] >> 7 : 0;
   var exponent =
      ((bytes.length == 8 ? bytes[7] & 0x7f : 0) << 4) +
      (bytes.length >= 7 ? bytes[6] >> 4 : 0);
   var significand_hi =
      ((bytes.length >= 7 ? bytes[6] & 0x0f : 0) << 16) +
      ((bytes.length >= 6 ? bytes[5] : 0) << 8) +
      (bytes.length >= 5 ? bytes[4] : 0);
   var significand_low =
      (bytes.length >= 4 ? bytes[3] : 0) +
      (bytes.length >= 3 ? bytes[2] : 0) / (1 << 8) +
      (bytes.length >= 2 ? bytes[1] : 0) / (1 << 16) +
      bytes[0] / (1 << 24);

   if (exponent == 0x000) {
      if (significand_hi == 0 && significand_low == 0) {
         return sign * 0;
      }
      else {
         return (sign ? -1.0 : 1.0) * Math.pow(2, -1022) * (significand_hi / (1 << 20) + significand_low / (1 << 28));
      }
   }
   else if (exponent == 0x7ff) {
      if (significand_hi == 0 && significand_low == 0) {
         return (sign ? '-' : '') + 'infinity';
      }
      else {
         return 'NaN';
      }
   }
   else {
      return (sign ? -1.0 : 1.0) * Math.pow(2, exponent - 1023) * (1 + significand_hi / (1 << 20) + significand_low / (1 << 28));
   }
}

export function toAscii(bytes: Uint8Array) {
   var result = '';
   for (const byte of bytes) {
      result += String.fromCharCode(byte);
   }
   return result;
}

export function toSize(bytes: Uint8Array) {
   let prefixes = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];
   let bits = utils.countBits(bytes);
   let prefix_index = Math.min(prefixes.length - 1, Math.trunc(bits / 10));

   let shifted_bytes = bytes;
   let right = '.000';

   if (prefix_index == 1) {
      right = ((shifted_bytes[0] + 256 * (shifted_bytes[1] & 0x03)) / (1 << 10)).toFixed(3).substr(1);
      shifted_bytes = utils.shiftBytes(shifted_bytes, 10);
   }
   else if (prefix_index >= 2) {
      shifted_bytes = utils.shiftBytes(shifted_bytes, prefix_index * 10 - 16);
      right = ((shifted_bytes[0] + 256 * shifted_bytes[1]) / (1 << 16)).toFixed(3).substr(1);
      shifted_bytes = shifted_bytes.slice(2);
   }

   let left = toDecimalUnsigned(shifted_bytes);
   if (left == '') {
      left = '0';
   }

   if (prefix_index == 0)
      right = '';

   return left + right + ' ' + prefixes[prefix_index] + 'B';
}

export function toBitSet(bytes: Uint8Array) {
   let result = '';
   let bit_no = 0;
   for (const byte of bytes) {
      for (let i = 0; i < 8; i++) {
         if ((byte >> i) & 1) {
            result += (result != '' ? ', ' : '') + bit_no;
         }
         bit_no += 1;
      }
   }
   return result;
}
