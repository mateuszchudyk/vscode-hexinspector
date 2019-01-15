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
   return 'Unimplemented';
}

export function bytesToBin(bytes: Uint8Array) {
   return 'Unimplemented';
}

export function bytesToFloat32(bytes: Uint8Array) {
   return 'Unimplemented';
}

export function bytesToFloat64(bytes: Uint8Array) {
   return 'Unimplemented';
}

export function bytesToStr(bytes: Uint8Array) {
   return 'Unimplemented';
}