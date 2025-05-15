import React from 'react'; // <- essentieel!
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Block from '../src/Block';

describe('Block', () => {
  it('should be importable with props', () => {
    const dummyConfig = {
      text: {
        content: 'Test'
      }
    };

    expect(() => render(<Block blockConfig={dummyConfig} extraProps={{}} />)).not.toThrow();
  });
});
