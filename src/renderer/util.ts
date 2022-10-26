import React from 'react';

export function noOpListener(prevent: boolean): (e: React.UIEvent) => void {
  return (e) => {
    console.debug('call');
    if (prevent) e.preventDefault();
    e.stopPropagation();
  };
}

export function mod(num1: number, num2: number): number {
  return ((num1 % num2) + num2) % num2;
}
