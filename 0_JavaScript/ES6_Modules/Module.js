/*export const PI = 3.14;
export function getVolume(r){
    return (4/3) * PI * Math.pow(r, 3);
}*/
// Module.js
export default {
  PI: 3.14,
  getVolume(r) {
    return (4 / 3) * this.PI * Math.pow(r, 3);
  }
};