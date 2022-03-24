import { Note, NoteGenInput } from '@webb-tools/sdk-core';
import utils from 'web3-utils';

import { u8aToHex } from '@polkadot/util';

import { WebbWeb3Provider } from './webb-provider';
import { createTornDeposit, Deposit } from '../contracts/utils/make-deposit';
import { DepositPayload as IDepositPayload, MixerDeposit, MixerSize } from '../abstracts';
import { ChainType, computeChainIdType, parseChainIdType } from '../chains';
import {getEVMChainName, getNativeCurrencySymbol} from "@webb-tools/api-providers/utils";

type DepositPayload = IDepositPayload<Note, [Deposit, number]>;

export class Web3MixerDeposit extends MixerDeposit<WebbWeb3Provider, DepositPayload> {
  async deposit({ note: depositPayload, params }: DepositPayload): Promise<void> {
    const chainId = Number(depositPayload.note.targetChainId);
    const evmChainId = parseChainIdType(chainId).chainId;
    this.inner.notificationHandler({
      name: 'Transaction',
      key: 'web3-mixer-deposit',
      level: 'loading',
      description: 'Depositing',
      data: {
        chain: getEVMChainName(this.inner.config, evmChainId),
        amount: String(Number(depositPayload.note.amount)),
        currency: depositPayload.note.tokenSymbol
      },
      message: 'mixer:deposit'
    });
    const [deposit, amount] = params;
    const providerEvmChainId = await this.inner.getChainId();
    const contract = await this.inner.getContractBySize(
      amount,
      getNativeCurrencySymbol(this.inner.config, providerEvmChainId)
    );
    try {
      await contract.deposit(deposit.commitment);
      this.inner.notificationHandler({
        name: 'Transaction',
        key: 'web3-mixer-deposit',
        level: 'success',
        description: 'Deposit succeed',
        message: 'mixer:deposit'
      });
    } catch (e) {
      if ((e as any)?.code === 4001) {
        this.inner.notificationHandler({
          name: 'Transaction',
          key: 'web3-mixer-deposit',
          level: 'error',
          description: 'User Rejected Deposit',
          message: 'mixer:deposit'
        });
      } else {
        this.inner.notificationHandler({
          name: 'Transaction',
          key: 'web3-mixer-deposit',
          level: 'error',
          description: 'Deposit Failed',
          message: 'mixer:deposit'
        });
      }
    }
  }

  async generateNote(mixerAddress: string): Promise<DepositPayload> {
    const contract = await this.inner.getContractByAddress(mixerAddress);
    const mixerInfo = this.inner.getMixers().getMixerInfoByAddress(mixerAddress);

    if (!mixerInfo) {
      throw new Error(`mixer not found from storage`);
    }
    const depositSizeBN = await contract.denomination;
    const depositSize = Number.parseFloat(utils.fromWei(depositSizeBN.toString(), 'ether'));
    const chainId = await this.inner.getChainId();
    const deposit = createTornDeposit();
    const noteChain = computeChainIdType(ChainType.EVM, chainId);
    const secrets = deposit.preimage;
    const noteInput: NoteGenInput = {
      protocol: 'mixer',
      exponentiation: '5',
      width: '3',
      targetChain: noteChain.toString(),
      sourceChain: noteChain.toString(),
      sourceIdentifyingData: mixerAddress,
      targetIdentifyingData: mixerAddress,
      amount: String(depositSize),
      denomination: '18',
      hashFunction: 'Poseidon',
      curve: 'Bn254',
      backend: 'Circom',
      version: 'v2',
      tokenSymbol: mixerInfo.symbol,
      secrets: u8aToHex(secrets)
    };
    const note = await Note.generateNote(noteInput);

    return {
      note: note,
      params: [deposit, mixerInfo.size]
    };
  }

  async getSizes(): Promise<MixerSize[]> {
    const chainId = await this.inner.getChainId();
    return this.inner.getMixerSizes(getNativeCurrencySymbol(this.inner.config, chainId));
  }
}
