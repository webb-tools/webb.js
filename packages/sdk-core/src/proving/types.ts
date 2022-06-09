// Copyright 2022 @webb-tools/
// SPDX-License-Identifier: Apache-2.0

import type { Backend, Curve, JsUtxo, Leaves, NoteProtocol } from '@webb-tools/wasm-utils';

import { Note } from '@webb-tools/sdk-core/note';
import { WasmUtxo } from '@webb-tools/sdk-core/wasm-utxo';

export type ProvingManagerSetupInput<T extends NoteProtocol> = ProvingManagerPayload[T];

export type PMEvents<T extends NoteProtocol = 'mixer'> = {
  proof: [T, ProvingManagerSetupInput<T>];
  destroy: undefined;
};

export interface ProvingManagerPayload extends Record<NoteProtocol, any> {
  mixer: MixerPMSetupInput;
  anchor: AnchorPMSetupInput;
  vanchor: VAnchorPMSetupInput;
}

/**
 * Proving Manager setup input for the proving manager over sdk-core
 * @param note - Serialized note representation
 * @param relayer - Relayer account id converted to hex string (Without a `0x` prefix)
 * @param recipient - Recipient account id converted to hex string (Without a `0x` prefix)
 * @param leaves - Leaves for generating the merkle path
 * @param leafIndex - The index of  the Leaf commitment
 * @param fee - The fee for the transaction
 * @param refund - The refund for the transaction
 * @param provingKey - Proving key bytes to pass in to the Zero-knowledge proof generation
 **/
export type MixerPMSetupInput = {
  note: string;
  relayer: string;
  recipient: string;
  leaves: Leaves;
  leafIndex: number;
  fee: number;
  refund: number;
  provingKey: Uint8Array;
};

/**
 * Proving Manager setup input for anchor API proving manager over sdk-core
 * @param note - Serialized note representation
 * @param relayer - Relayer account id converted to hex string (Without a `0x` prefix)
 * @param recipient - Recipient account id converted to hex string (Without a `0x` prefix)
 * @param leaves - Leaves for generating the merkle path
 * @param leafIndex - The index of  the Leaf commitment
 * @param fee - The fee for the transaction
 * @param refund - The refund for the transaction
 * @param provingKey - Proving key bytes to pass in to the Zero-knowledge proof generation
 * @param roots - Roots for anchor API
 * @param refreshCommitment - Refresh commitment in hex representation ( without prefix `0x` ) Required for anchor, ignored for the mixer
 * */
export type AnchorPMSetupInput = {
  note: string;
  relayer: string;
  recipient: string;
  leaves: Leaves;
  leafIndex: number;
  fee: number;
  refund: number;
  provingKey: Uint8Array;
  roots: Leaves;
  refreshCommitment: string;
};

export interface JSUtxoParams {
  curve: Curve,
  backend: Backend,
  inputSize: number,
  anchorSize: number,
  amount: string,
  chainId: string,
  index?: string,
  privateKey: Uint8Array,
  blinding: Uint8Array
}

/**
 * Proving Manager setup input for anchor API proving manager over sdk-core
 * @param inputNotes - VAnchor notes representing input UTXOs for proving
 * @param leavesMap - Leaves for generating the merkle path, it's indexed by the chain_id and for each entry the values are list of leaves for this chain
 * @param indices -  Leaf indices for input UTXOs leaves
 * @param roots - Roots set for every anchor
 * @param chainId - The chain id where the input UTXOs being spent
 * @param outputConfigs - Configuration to shape the output UTXOs
 * @param publicAmount - Amount the is used to tell the transaction type : Sum. of inputs + public amount = Sum. of outputs
 * @param externalDataHash - The hash of external data which contains other values (EX fees,relayer ,..etc)
 * @param provingKey - Proving key bytes to pass in to the Zero-knowledge proof generation
 * */
export type VAnchorPMSetupInput = {
  inputNotes: string[];
  leavesMap: Record<string, Leaves>;
  indices: number[];
  roots: Leaves;
  chainId: string;
  outputParams?: [JSUtxoParams, JSUtxoParams];
  output?: [JsUtxo, JsUtxo];
  encryptedCommitments: [Uint8Array, Uint8Array],
  publicAmount: string;
  provingKey: Uint8Array;
  relayer: Uint8Array;
  recipient: Uint8Array;
  extAmount: string;
  fee: string;
};

// At worker level
export type WorkerProof<T extends NoteProtocol> = T extends 'vanchor'
  ? VAnchorProof
  : T extends 'mixer'
    ? MixerProof
    : AnchorProof;
// At manger level
export type ProvingManagerProof<T extends NoteProtocol> = T extends 'vanchor'
  ? DeserializeVAnchorProof
  : T extends 'mixer'
    ? MixerProof
    : AnchorProof;

export type VAnchorProof = {
  readonly inputUtxos: Array<string>;
  readonly outputNotes: Array<string>;
  readonly proof: string;
  readonly publicInputs: Array<string>;
  readonly publicAmount: Uint8Array
  readonly extDataHash: Uint8Array
};
export type DeserializeVAnchorProof = {
  inputUtxos: Array<WasmUtxo>;
  outputNotes: Array<Note>;
  readonly proof: string;
  readonly publicInputs: Array<string>;
  readonly publicAmount: Uint8Array
  readonly extDataHash: Uint8Array
};

export type AnchorProof = {
  readonly nullifierHash: string;
  readonly proof: string;
  readonly root: string;
  readonly roots: Array<string>;
};

export type MixerProof = {
  readonly nullifierHash: string;
  readonly proof: string;
  readonly root: string;
};