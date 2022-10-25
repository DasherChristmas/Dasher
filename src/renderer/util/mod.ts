export default function mod(num1: number, num2: number): number {
  return ((num1 % num2) + num2) % num2;
}
