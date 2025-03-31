export class UtilsHelper {
  generateRandInt(length: number = 6) {
    let code = '';

    for(let i = 0; i < length; i++) {
      code = code + '' + Math.floor(Math.random() * (9 - 0 + 1) + 0);
    }

    return code;
  }
}
