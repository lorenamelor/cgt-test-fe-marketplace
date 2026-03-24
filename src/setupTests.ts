import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from 'util';
import {
  TransformStream as NodeTransformStream,
  ReadableStream as NodeReadableStream,
  WritableStream as NodeWritableStream,
} from 'stream/web';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom') as typeof import('react-router-dom');
  const React = jest.requireActual('react') as typeof import('react');

  return {
    ...actual,
    MemoryRouter: (props: Record<string, unknown>) =>
      React.createElement(actual.MemoryRouter, {
        ...props,
        future: {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
          ...(props.future as Record<string, unknown> | undefined),
        },
      }),
  };
});

configure({ asyncUtilTimeout: 10000 });
jest.setTimeout(15000);

type TestGlobals = Omit<
  typeof globalThis,
  | 'TextEncoder'
  | 'TextDecoder'
  | 'BroadcastChannel'
  | 'TransformStream'
  | 'ReadableStream'
  | 'WritableStream'
> & {
  TextEncoder?: unknown;
  TextDecoder?: unknown;
  BroadcastChannel?: unknown;
  TransformStream?: unknown;
  ReadableStream?: unknown;
  WritableStream?: unknown;
};

const globalForTests = globalThis as TestGlobals;

if (!globalForTests.TextEncoder) globalForTests.TextEncoder = NodeTextEncoder as unknown;
if (!globalForTests.TextDecoder) globalForTests.TextDecoder = NodeTextDecoder as unknown;

if (!globalForTests.BroadcastChannel) {
  class BroadcastChannelMock {
    name: string;

    onmessage: ((event: MessageEvent) => void) | null = null;

    onmessageerror: ((event: MessageEvent) => void) | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_message: unknown): void {
      return;
    }

    close(): void {
      return;
    }

    addEventListener(): void {
      return;
    }

    removeEventListener(): void {
      return;
    }

    dispatchEvent(_event: Event): boolean {
      return true;
    }
  }

  globalForTests.BroadcastChannel = BroadcastChannelMock as unknown;
}

if (!globalForTests.TransformStream) {
  globalForTests.TransformStream = NodeTransformStream as unknown;
}
if (!globalForTests.ReadableStream) globalForTests.ReadableStream = NodeReadableStream as unknown;
if (!globalForTests.WritableStream) globalForTests.WritableStream = NodeWritableStream as unknown;

let server: typeof import('./mocks/server').server;

beforeAll(async () => {
  ({ server } = await import('./mocks/server'));
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
