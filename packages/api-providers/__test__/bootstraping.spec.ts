import { expect } from 'chai';
import { initPolkadotProvider } from './utils/init-polkadot-provider';

describe('Bootstrap providers', () => {
  it('Should init Polkadot provider', async () => {
    const provider = await initPolkadotProvider();
    const chainProperties = await provider.api.rpc.system.properties();
    expect(chainProperties).not.equal(null);
  });
});
