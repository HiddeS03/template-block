import React from 'react';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { inject, unmount } from '../src/.base/AppInjector';
import * as ReactDOMClient from 'react-dom/client';
import { Block } from '../src/Block';

vi.mock('react-dom/client', async () => {
  const actual = await vi.importActual<typeof ReactDOMClient>('react-dom/client');
  return {
    ...actual,
    createRoot: vi.fn(() => ({
      render: vi.fn(),
      unmount: vi.fn(),
    })),
  };
});

describe('inject and unmount', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    unmount(); // reset internal `root`
  });

  it('should inject and render the Block component', () => {
    const props = { testProp: 'value' };
    inject('test-container', props);

    expect(ReactDOMClient.createRoot).toHaveBeenCalledTimes(1);
    const rootInstance = (ReactDOMClient.createRoot as any).mock.results[0].value;
    expect(rootInstance.render).toHaveBeenCalledWith(<Block {...props} />);
  });

  it('should not inject if container is not found', () => {
    inject('non-existent-id', {});
    expect(ReactDOMClient.createRoot).not.toHaveBeenCalled();
  });

  it('should unmount the component', () => {
    inject('test-container', {});
    unmount();
    const rootInstance = (ReactDOMClient.createRoot as any).mock.results[0].value;
    expect(rootInstance.unmount).toHaveBeenCalled();
  });

  it('should do nothing on unmount if root is null', () => {
    expect(() => unmount()).not.toThrow();
  });
});
