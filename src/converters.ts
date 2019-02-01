function stringReverse(str: string) {
   return str.split('').reverse().join('');
}

function switchEndian(bytes: Uint8Array) {
   var result = new Uint8Array(bytes.length);
   for (let i = 0; i < result.length; i++) {
      result[i] = bytes[bytes.length - 1 - i];
   }
   return result;
}

export function hexToBytes(str: string, little_endian: boolean = true) {
   var rules = new Map<string, (str: string) => string>();

   rules.set('0x[0-9a-fA-F]+', (str: string) => { return str.substr(2); });
   rules.set('#[0-9a-fA-F]+', (str: string)  => { return str.substr(1); });

   var hex = undefined;
   for (let regex of rules.keys()) {
      if (str.match('^' + regex + '$')) {
         hex = rules.get(regex)(str);
         break;
      }
   }

   if (!hex) {
      return undefined;
   }
   hex = stringReverse(hex);

   var result = new Uint8Array((hex.length + 1) / 2);
   for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(hex[2 * i], 16) + (2 * i + 1 < hex.length ? 16 * parseInt(hex[2 * i + 1], 16) : 0);
   }

   if (!little_endian) {
      result = switchEndian(result);
   }
   return result;
}

export function bytesToUnsignedDec(bytes: Uint8Array) {
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

export function bytesToSignedDec(bytes: Uint8Array) {
   if (bytes.length == 0) {
      return '';
   }

   var sign = bytes[bytes.length - 1] >> 7;
   bytes[bytes.length - 1] &= 0x7f;
   return (sign ? '-' : '') + bytesToUnsignedDec(bytes);
}

export function bytesToBin(bytes: Uint8Array) {
   var result = '';
   for (const byte of bytes) {
      for (let i = 0; i < 8; i++) {
         result = ((byte >> i) % 2) + result;
      }
   }
   return result;
}

export function bytesToFloat32(bytes: Uint8Array) {
   if (bytes.length > 4 || bytes.length == 0) {
      return '';
   }

   var sign = bytes.length == 4 ? bytes[3] >> 7 : 0;
   var exponent =
      ((bytes.length == 4 ? bytes[3] & 0x7f : 0) << 1) +
      (bytes.length >= 3 ? bytes[2] >> 7 : 0);
   var mantissa =
      ((bytes.length >= 3 ? bytes[2] & 0x7f : 0) << 16) +
      ((bytes.length >= 2 ? bytes[1] : 0) << 8) +
      bytes[0];

   return (sign ? -1.0 : 1.0) * Math.pow(2, exponent - 127) * (1 + mantissa / (1 << 23));
}

export function bytesToFloat64(bytes: Uint8Array) {
   if (bytes.length > 8 || bytes.length == 0) {
      return '';
   }

   var sign = bytes.length == 8 ? bytes[7] >> 7 : 0;
   var exponent =
      ((bytes.length == 8 ? bytes[7] & 0x7f : 0) << 4) +
      (bytes.length >= 7 ? bytes[6] >> 4 : 0);
   var mantissa_hi =
      ((bytes.length >= 7 ? bytes[6] & 0x0f : 0) << 16) +
      ((bytes.length >= 6 ? bytes[5] : 0) << 8) +
      (bytes.length >= 5 ? bytes[4] : 0);
   var mantissa_low =
      (bytes.length >= 4 ? bytes[3] : 0) +
      (bytes.length >= 3 ? bytes[2] : 0) / (1 << 8) +
      (bytes.length >= 2 ? bytes[1] : 0) / (1 << 16) +
      bytes[0] / (1 << 24);

   return (sign ? -1.0 : 1.0) * Math.pow(2, exponent - 1023) * (1 + mantissa_hi / (1 << 20) + mantissa_low / (1 << 28));
}

export function bytesToStr(bytes: Uint8Array) {
   var result = '';
   for (const byte of bytes) {
      result = String.fromCharCode(byte) + result;
   }
   return result;
}

function countBits(bytes: Uint8Array) {
   let i = bytes.length - 1;
   while (i >= 0 && bytes[i] == 0) {
      i--;
   }
   if (i == -1) {
      return 0;
   }
   return i * 8 + Math.trunc(Math.log2(bytes[i]) + 1);
}

function shiftBytes(bytes: Uint8Array, shift: number) {
   if (!Number.isInteger(shift) || shift < 0) {
      return undefined;
   }

   var result = new Uint8Array(bytes.length);

   let bits = shift % 8;
   for (let i = 0, j = Math.trunc(shift / 8); j < bytes.length; ++i, ++j) {
      result[i] = bytes[j] >> bits;
      if (j + 1 < bytes.length) {
         result[i] += bytes[j + 1] << (8 - bits);
      }
   }

   return result;
}

export function bytesToSize(bytes: Uint8Array) {
   let prefixes = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];
   let bits = countBits(bytes);
   let prefix_index = Math.min(prefixes.length - 1, Math.trunc(bits / 10));

   let shifted_bytes = bytes;
   let right = '.000';

   if (prefix_index == 1) {
      right = ((shifted_bytes[0] + 256 * (shifted_bytes[1] & 0x03)) / (1 << 10)).toFixed(3).substr(1);
      shifted_bytes = shiftBytes(shifted_bytes, 10);
   }
   else if (prefix_index >= 2) {
      shifted_bytes = shiftBytes(shifted_bytes, prefix_index * 10 - 16);
      right = ((shifted_bytes[0] + 256 * shifted_bytes[1]) / (1 << 16)).toFixed(3).substr(1);
      shifted_bytes = shifted_bytes.slice(2);
   }

   let left = bytesToUnsignedDec(shifted_bytes);
   if (left == '') {
      left = '0';
   }

   return left + right + ' ' + prefixes[prefix_index] + 'B';
}
