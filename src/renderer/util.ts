/* eslint-disable import/prefer-default-export */
import React from 'react';

export function noOpListener(prevent: boolean): (e: React.UIEvent) => void {
  return (e) => {
    if (prevent) e.preventDefault();
    e.stopPropagation();
  };
}
