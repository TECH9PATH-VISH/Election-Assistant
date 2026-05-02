/**
 * @file test-utils.tsx
 * @description Custom render function for Testing Library to wrap components in global context providers.
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Wrapper component to provide global contexts for tests.
 * @param {object} props - The component props containing children.
 * @returns {JSX.Element} The wrapped children.
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

/**
 * Custom render function that wraps the UI in necessary providers.
 * 
 * @param {ReactElement} ui - The React element to render.
 * @param {Omit<RenderOptions, 'wrapper'>} [options] - Additional render options.
 * @returns {RenderResult} The result of the testing-library render.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
