function addSeparatorToNumber(str: string, sep: string, n: number) {
   var result = '';
   for (let i = 0; i < str.length; i++) {
       if (i > 0 && i % n == 0) {
           result = sep + result;
       }
       result = str[str.length - 1 - i] + result;
   }
   return result;
}

export function addThousandsSeparator(str: string) {
   return addSeparatorToNumber(str, ',', 3);
}

export function addBytesSeparator(str: string) {
   return addSeparatorToNumber(str, ' ', 8);
}
export function addNibblesSeparator(str: string) {
   return addSeparatorToNumber(str, ' ', 4);
}
