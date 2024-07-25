import { registerPlugin } from '@capacitor/core';

export interface EchoPlugin {
  echo(options: { value: any }): Promise<{ value: any }>;
}

const Echo = registerPlugin<any>('Echo');

export default Echo;