import { optionsWithEdgeware } from '@webb-tools/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { LoggerService } from '@webb-tools/app-util';

const ENDPOINT = 'ws://localhost:9944';
const apiLogger = LoggerService.get('Api');

async function main() {
  apiLogger.info('Connecting to ', ENDPOINT);
  const provider = new WsProvider([ENDPOINT]);
  const opts = optionsWithEdgeware({ provider });
  const api = await ApiPromise.create(opts);
  await api.isReady;
  const queries = await api.query.mixer;
  apiLogger.info('mixer queries: ' + JSON.stringify(queries));
  await api.disconnect();
}

main().catch(apiLogger.error);
