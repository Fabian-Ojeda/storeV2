import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalToNumber'
})
export class VocalToNumberPipe implements PipeTransform {

  transform(value: string): string {
    const chain = value.split('')
    let result=''
    for (let i = 0; i < value.length; i++) {
      switch (chain[i]){
        case 'a':
          result+='4'
          break
        case 'e':
          result+='3'
          break
        case 'i':
          result+='1'
          break
        case 'o':
          result+='0'
          break
        case 'u':
          result+='2'
          break
        default:
          result+=chain[i]
      }
    }
    return result;
  }

}
