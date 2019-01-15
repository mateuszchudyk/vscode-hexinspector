function stringReverse(str: string) {
   return str.split('').reverse().join('');
}

export function hexToBytes(str: string) {
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
   return result;
}

export function bytesToDec(bytes: Uint8Array) {
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

   var result = "";
   for (let j = 0; j <= length; j++) {
      result = dec[j] + result;
   }

   return result;
}

export function bytesToBin(bytes: Uint8Array) {
   var result = "";
   for (const byte of bytes) {
      for (let i = 0; i < 8; i++) {
         result = ((byte >> i) % 2) + result;
      }
   }
   return result;
}

export function bytesToFloat32(bytes: Uint8Array) {
   return 'Unimplemented';
}

export function bytesToFloat64(bytes: Uint8Array) {
   return 'Unimplemented';
}

export function bytesToStr(bytes: Uint8Array) {
   var result = "";
   for (const byte of bytes) {
      result = String.fromCharCode(byte) + result;
   }
   return result;
}