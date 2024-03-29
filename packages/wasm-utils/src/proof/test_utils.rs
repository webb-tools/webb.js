use std::collections::BTreeMap;

use ark_bn254::{Bn254, Fr as Bn254Fr};
use ark_ff::{BigInteger, PrimeField, Zero};
use arkworks_native_gadgets::poseidon::Poseidon;
use arkworks_setups::common::{setup_keys_unchecked, setup_params, setup_tree_and_create_path};
use arkworks_setups::{Curve as ArkCurve, VAnchorProver};
use js_sys::{Array, JsString, Uint8Array};
use rand::rngs::OsRng;
use wasm_bindgen::prelude::*;

use crate::note::JsNote;
use crate::proof::{JsProofInputBuilder, LeavesMapInput, ProofInputBuilder, VAnchorProofInput};
use crate::types::{Backend, Curve, Indices, Leaves, Protocol, WasmCurve, BE};
use crate::utxo::JsUtxo;
use crate::{
	MixerR1CSProverBn254_30, VAnchorR1CSProverBn254_30_2_16_2, VAnchorR1CSProverBn254_30_2_2_2, DEFAULT_LEAF,
	TREE_HEIGHT,
};

pub const MIXER_NOTE_V1_X5_5:&str  = "webb://v1:mixer/2:2/2:2/fd717cfe463b3ffec71ee6b7606bbd0179170510abf41c9f16c1d20ca9923f0e:18b6b080e6a43262f00f6fb3da0d2409c4871b8f26d89d5c8836358e1af5a41c/?curve=Bn254&width=3&exp=5&hf=Poseidon&backend=Arkworks&token=EDG&denom=18&amount=10&index=10";
pub const VANCHOR_NOTE_V1_X5_4:&str  ="webb://v1:vanchor/2:3/2:3/0300000000000000000000000000000000000000000000000000000000000000:0a00000000000000000000000000000000000000000000000000000000000000:7798d054444ec463be7d41ad834147b5b2c468182c7cd6a601aec29a273fca05:bf5d780608f5b8a8db1dc87356a225a0324a1db61903540daaedd54ab10a4124/?curve=Bn254&width=5&exp=5&hf=Poseidon&backend=Arkworks&token=EDG&denom=18&amount=10&index=10";

pub const DECODED_SUBSTRATE_ADDRESS: &str = "644277e80e74baf70c59aeaa038b9e95b400377d1fd09c87a6f8071bce185129";
pub fn new_utxo_bn254_2_2(curve: Curve, amount: u128, chain_id: u64) -> JsUtxo {
	let curve: WasmCurve = JsValue::from(curve.to_string()).into();
	let backend: BE = JsValue::from(Backend::Arkworks.to_string()).into();
	JsUtxo::construct(
		curve.clone(),
		backend.clone(),
		JsString::from(amount.to_string()),
		JsString::from(chain_id.to_string()),
		None,
		None,
		None,
		None,
	)
	.unwrap()
}
pub struct MixerTestSetup {
	pub(crate) relayer: Vec<u8>,
	pub(crate) recipient: Vec<u8>,
	pub(crate) proof_input_builder: JsProofInputBuilder,
	pub(crate) root: Vec<u8>,
	pub(crate) leaf_bytes: Vec<u8>,
	pub(crate) leaf_index: u64,
	pub(crate) vk: Vec<u8>,
}

pub struct VAnchorTestSetup {
	pub(crate) proof_input_builder: JsProofInputBuilder,
	pub(crate) roots_raw: Vec<Vec<u8>>,
	pub(crate) notes: Vec<JsUtxo>,
	pub(crate) leaf_index: u64,
	pub(crate) vk: Vec<u8>,
}
pub fn generate_mixer_test_setup(
	relayer_decoded_ss58: &str,
	recipient_decoded_ss58: &str,
	note: &str,
) -> MixerTestSetup {
	let (c, ..) = MixerR1CSProverBn254_30::setup_random_circuit(ArkCurve::Bn254, DEFAULT_LEAF, &mut OsRng).unwrap();
	let (pk, vk) = setup_keys_unchecked::<Bn254, _, _>(c, &mut OsRng).unwrap();
	let index = 0;
	let note = JsNote::js_deserialize(JsString::from(note)).unwrap();
	let leaf = note.get_leaf_commitment().unwrap();
	let leaf_bytes: Vec<u8> = leaf.to_vec();

	let leaves_ua: Array = vec![leaf].into_iter().collect();
	let protocol: Protocol = JsValue::from("mixer").into();
	let mut js_builder = JsProofInputBuilder::new(protocol).unwrap();

	js_builder.set_leaf_index(JsString::from("0")).unwrap();
	js_builder.set_leaves(Leaves::from(JsValue::from(leaves_ua))).unwrap();

	js_builder.set_fee(JsString::from("5")).unwrap();
	js_builder.set_refund(JsString::from("1")).unwrap();

	js_builder.set_relayer(JsString::from(relayer_decoded_ss58)).unwrap();
	js_builder
		.set_recipient(JsString::from(recipient_decoded_ss58))
		.unwrap();

	js_builder.set_pk(JsString::from(hex::encode(&pk))).unwrap();

	js_builder.set_metadata_from_note(&note).unwrap();

	MixerTestSetup {
		relayer: hex::decode(relayer_decoded_ss58).unwrap(),
		recipient: hex::decode(recipient_decoded_ss58).unwrap(),
		vk,
		root: vec![],
		leaf_bytes,
		proof_input_builder: js_builder,
		leaf_index: index,
	}
}

pub fn generate_vanchor_utxo(amount: i128, in_chain_id: u64, index: Option<u64>) -> JsUtxo {
	// If the index is passed on generation - assume it is constructing an input
	// JsUtxo
	let utxo = match index {
		Some(val) => JsUtxo::construct(
			WasmCurve::from(JsValue::from("Bn254")),
			BE::from(Backend::Arkworks),
			JsString::from(amount.to_string()),
			JsString::from(in_chain_id.to_string()),
			None,
			None,
			None,
			Some(JsString::from(val.to_string())),
		),
		None => JsUtxo::construct(
			WasmCurve::from(JsValue::from("Bn254")),
			BE::from(Backend::Arkworks),
			JsString::from(amount.to_string()),
			JsString::from(in_chain_id.to_string()),
			None,
			None,
			None,
			None,
		),
	};

	utxo.unwrap()
}

pub fn compute_chain_id_type(chain_id: u64, chain_type: [u8; 2]) -> u64 {
	let chain_id_value: u32 = chain_id.try_into().unwrap_or_default();
	let mut buf = [0u8; 8];
	buf[2..4].copy_from_slice(&chain_type);
	buf[4..8].copy_from_slice(&chain_id_value.to_be_bytes());
	u64::from_be_bytes(buf)
}

pub fn generate_vanchor_test_js_setup() -> VAnchorTestSetup {
	let curve = ArkCurve::Bn254;

	let chain_type = [2, 0];
	let chain_id = compute_chain_id_type(0, chain_type);

	// Create the utxos that are assumed to already be deposited
	let input_utxo1 = generate_vanchor_utxo(5, chain_id, Some(0));
	let input_utxo2 = generate_vanchor_utxo(5, chain_id, Some(1));
	// output configs

	let output_1 = new_utxo_bn254_2_2(Curve::Bn254, 10, chain_id);
	let output_2 = new_utxo_bn254_2_2(Curve::Bn254, 2, chain_id);
	let index = 0;

	let c = VAnchorR1CSProverBn254_30_2_2_2::setup_random_circuit(ArkCurve::Bn254, DEFAULT_LEAF, &mut OsRng).unwrap();
	let (pk, vk) = setup_keys_unchecked::<Bn254, _, _>(c, &mut OsRng).unwrap();

	let params3 = setup_params::<Bn254Fr>(curve, 5, 3);

	let poseidon3 = Poseidon::new(params3);

	// Output leaf commitment
	let note1_com: Vec<u8> = input_utxo1.get_commitment();
	let note2_com: Vec<u8> = input_utxo2.get_commitment();
	// Insert commitments
	let leaves_f: Vec<_> = vec![note1_com, note2_com]
		.iter()
		.map(|c| Bn254Fr::from_be_bytes_mod_order(&c))
		.collect();
	// tree 0
	let (_tree0, in_path0) = setup_tree_and_create_path::<Bn254Fr, Poseidon<Bn254Fr>, TREE_HEIGHT>(
		&poseidon3,
		&vec![leaves_f[0].clone()],
		index,
		&DEFAULT_LEAF,
	)
	.unwrap();
	let root0 = in_path0.calculate_root(&leaves_f[0].clone(), &poseidon3).unwrap();
	// tree 1
	let (_tree1, in_path1) = setup_tree_and_create_path::<Bn254Fr, Poseidon<Bn254Fr>, TREE_HEIGHT>(
		&poseidon3,
		&vec![leaves_f[1].clone()],
		index,
		&DEFAULT_LEAF,
	)
	.unwrap();
	let root1 = in_path1.calculate_root(&leaves_f[1].clone(), &poseidon3).unwrap();

	let roots_f = [root0, root1];
	let roots_raw = roots_f.map(|x| x.into_repr().to_bytes_be());
	let roots_array: Array = roots_raw.iter().map(|i| Uint8Array::from(i.as_slice())).collect();

	let mut js_builder = JsProofInputBuilder::new(JsValue::from("vanchor").into()).unwrap();

	js_builder.set_pk(JsString::from(hex::encode(pk))).unwrap();
	js_builder.set_roots(Leaves::from(JsValue::from(roots_array))).unwrap();
	// leaves
	let mut leaves_map = LeavesMapInput::new();
	let leaves_ua: Array = vec![input_utxo1.commitment(), input_utxo2.commitment()]
		.iter()
		.collect();
	leaves_map
		.set_chain_leaves(chain_id, Leaves::from(JsValue::from(leaves_ua)))
		.unwrap();
	js_builder.set_leaves_map(leaves_map).unwrap();
	js_builder.public_amount(JsString::from("10")).unwrap();
	js_builder.chain_id(JsString::from(chain_id.to_string())).unwrap();
	let indices: Array = vec![JsValue::from("0"), JsValue::from("1")].iter().collect();
	js_builder.set_indices(Indices::from(JsValue::from(indices))).unwrap();
	let input_utxos: Array = vec![JsValue::from(input_utxo1.clone()), JsValue::from(input_utxo2.clone())]
		.iter()
		.collect();
	js_builder.set_input_utxos(input_utxos).unwrap();
	js_builder.set_output_utxos(output_1, output_2).unwrap();
	// Assert the utxo chain id
	let note_1_chain_id = input_utxo1.chain_id_raw();
	let note_2_chain_id = input_utxo2.chain_id_raw();
	assert_eq!(note_1_chain_id, chain_id);
	assert_eq!(note_2_chain_id, chain_id);

	VAnchorTestSetup {
		vk,
		leaf_index: index,
		notes: vec![input_utxo1, input_utxo2],
		proof_input_builder: js_builder,
		roots_raw: vec![],
	}
}

pub fn generate_vanchor_test_setup_2_inputs() -> VAnchorTestSetup {
	let curve = ArkCurve::Bn254;
	let index = 0;
	let mut rng = OsRng;
	let chain_id = 0;

	let params3 = setup_params::<Bn254Fr>(curve, 5, 3);
	let tree_hasher = Poseidon::new(params3);
	let public_amount = 10;
	let in_amount = 5;
	let in_chain_id = 0;
	let in_amount_fr = Bn254Fr::from(in_amount);

	let mut in_utxo1 = VAnchorR1CSProverBn254_30_2_2_2::new_utxo(
		curve,
		in_chain_id,
		in_amount_fr.clone(),
		Some(0),
		None,
		None,
		&mut rng,
	)
	.unwrap();
	in_utxo1.set_index(index);

	let mut in_utxo2 =
		VAnchorR1CSProverBn254_30_2_2_2::new_utxo(curve, in_chain_id, in_amount_fr, Some(1), None, None, &mut rng)
			.unwrap();
	in_utxo2.set_index(1);

	let output_1 = VAnchorR1CSProverBn254_30_2_2_2::create_random_utxo(curve, chain_id, 10, None, &mut rng).unwrap();
	let output_2 = VAnchorR1CSProverBn254_30_2_2_2::create_random_utxo(curve, chain_id, 10, None, &mut rng).unwrap();

	let mut proof_builder = ProofInputBuilder::VAnchor(Box::new(VAnchorProofInput::default()));

	let leaf0 = in_utxo1.commitment.clone();
	let leaf1 = in_utxo2.commitment.clone();
	let (tree, _) = setup_tree_and_create_path::<Bn254Fr, Poseidon<Bn254Fr>, TREE_HEIGHT>(
		&tree_hasher,
		&vec![leaf0, leaf1],
		0,
		&DEFAULT_LEAF,
	)
	.unwrap();
	let root = tree.root();
	let in_root_set = [root; 2].iter().map(|x| x.into_repr().to_bytes_be()).collect();

	let mut leave_map: BTreeMap<u64, Vec<Vec<u8>>> = BTreeMap::new();
	let leaves: Vec<_> = vec![leaf0, leaf1].iter().map(|x| x.into_repr().to_bytes_be()).collect();
	leave_map.insert(0, leaves.clone());
	proof_builder.public_amount(public_amount).unwrap();
	proof_builder.ext_data_hash([1u8; 32].to_vec()).unwrap();
	proof_builder.leaf_indices(vec![0, 1]).unwrap();
	proof_builder.leaves_map(leave_map).unwrap();
	proof_builder
		.set_input_utxos(vec![
			JsUtxo::new_from_bn254_utxo(in_utxo1),
			JsUtxo::new_from_bn254_utxo(in_utxo2),
		])
		.unwrap();

	let c = VAnchorR1CSProverBn254_30_2_2_2::setup_random_circuit(ArkCurve::Bn254, DEFAULT_LEAF, &mut OsRng).unwrap();
	let (pk, vk) = setup_keys_unchecked::<Bn254, _, _>(c, &mut OsRng).unwrap();
	proof_builder.exponentiation(5).unwrap();
	proof_builder.width(5).unwrap();
	proof_builder.chain_id(0).unwrap();

	proof_builder.backend(Backend::Arkworks).unwrap();
	proof_builder.curve(Curve::Bn254).unwrap();
	proof_builder.roots(in_root_set).unwrap();
	proof_builder
		.set_output_utxos([
			JsUtxo::new_from_bn254_utxo(output_1),
			JsUtxo::new_from_bn254_utxo(output_2),
		])
		.unwrap();
	proof_builder.pk(pk).unwrap();

	VAnchorTestSetup {
		proof_input_builder: JsProofInputBuilder { inner: proof_builder },
		notes: vec![],
		roots_raw: vec![],
		vk,
		leaf_index: 0,
	}
}

pub fn generate_vanchor_test_setup_16_non_default_inputs() -> VAnchorTestSetup {
	let curve = ArkCurve::Bn254;
	let mut rng = OsRng;
	let chain_id = 0;

	let params3 = setup_params::<Bn254Fr>(curve, 5, 3);
	let tree_hasher = Poseidon::new(params3);
	let public_amount = 10;
	let in_amount = 10u128;
	let in_chain_id = 0;
	let in_amount_fr = Bn254Fr::from(in_amount);

	let mut inputs = vec![];
	let mut next_utxo_index = 0;
	let mut indices = vec![];
	loop {
		if &inputs.len() == &16 {
			break;
		}
		let mut utxo = VAnchorR1CSProverBn254_30_2_16_2::new_utxo(
			curve,
			in_chain_id,
			in_amount_fr.clone(),
			Some(next_utxo_index),
			None,
			None,
			&mut rng,
		)
		.unwrap();
		utxo.set_index(next_utxo_index);

		inputs.push(utxo);
		indices.push(next_utxo_index);
		next_utxo_index += 1;
	}

	let output_1 = VAnchorR1CSProverBn254_30_2_2_2::create_random_utxo(curve, chain_id, 160, None, &mut rng).unwrap();
	let output_2 = VAnchorR1CSProverBn254_30_2_2_2::create_random_utxo(curve, chain_id, 10, None, &mut rng).unwrap();

	let mut proof_builder = ProofInputBuilder::VAnchor(Box::new(VAnchorProofInput::default()));

	let leaves = inputs.iter().map(|i| i.commitment).collect::<Vec<_>>();

	let (tree, _) =
		setup_tree_and_create_path::<Bn254Fr, Poseidon<Bn254Fr>, TREE_HEIGHT>(&tree_hasher, &leaves, 0, &DEFAULT_LEAF)
			.unwrap();
	let root = tree.root();
	let in_root_set = [root; 2].iter().map(|x| x.into_repr().to_bytes_be()).collect();

	let mut leave_map: BTreeMap<u64, Vec<Vec<u8>>> = BTreeMap::new();
	let leaves: Vec<_> = leaves.iter().map(|x| x.into_repr().to_bytes_be()).collect();
	leave_map.insert(0, leaves.clone());
	proof_builder.public_amount(public_amount).unwrap();
	proof_builder.ext_data_hash([1u8; 32].to_vec()).unwrap();
	proof_builder.leaf_indices(indices).unwrap();
	proof_builder.leaves_map(leave_map).unwrap();
	proof_builder
		.set_input_utxos(
			inputs
				.clone()
				.into_iter()
				.map(|u| JsUtxo::new_from_bn254_utxo(u))
				.collect(),
		)
		.unwrap();

	let c = VAnchorR1CSProverBn254_30_2_16_2::setup_random_circuit(ArkCurve::Bn254, DEFAULT_LEAF, &mut OsRng).unwrap();
	let (pk, vk) = setup_keys_unchecked::<Bn254, _, _>(c, &mut OsRng).unwrap();
	proof_builder.exponentiation(5).unwrap();
	proof_builder.width(5).unwrap();
	proof_builder.chain_id(0).unwrap();

	proof_builder.backend(Backend::Arkworks).unwrap();
	proof_builder.curve(Curve::Bn254).unwrap();
	proof_builder.roots(in_root_set).unwrap();
	proof_builder
		.set_output_utxos([
			JsUtxo::new_from_bn254_utxo(output_1),
			JsUtxo::new_from_bn254_utxo(output_2),
		])
		.unwrap();
	proof_builder.pk(pk).unwrap();

	VAnchorTestSetup {
		proof_input_builder: JsProofInputBuilder { inner: proof_builder },
		notes: vec![],
		roots_raw: vec![],
		vk,
		leaf_index: 0,
	}
}

pub fn generate_vanchor_test_setup_16_mixed_inputs() -> VAnchorTestSetup {
	let curve = ArkCurve::Bn254;
	let mut rng = OsRng;
	let chain_id = 0;

	let params3 = setup_params::<Bn254Fr>(curve, 5, 3);
	let tree_hasher = Poseidon::new(params3);
	let public_amount = 10;
	let in_amount = 10u128;
	let in_chain_id = 0;
	let in_amount_fr = Bn254Fr::from(in_amount);

	let mut inputs = vec![];
	let mut next_utxo_index = 0;
	let mut indices = vec![];
	loop {
		if inputs.len() == 16 {
			break;
		}
		let utxo = VAnchorR1CSProverBn254_30_2_16_2::new_utxo(
			curve,
			in_chain_id,
			in_amount_fr.clone(),
			Some(next_utxo_index),
			None,
			None,
			&mut rng,
		)
		.unwrap();
		let def_utxo = VAnchorR1CSProverBn254_30_2_16_2::new_utxo(
			curve,
			in_chain_id,
			Bn254Fr::from(0),
			Some(0),
			None,
			None,
			&mut rng,
		)
		.unwrap();

		inputs.push(utxo);
		inputs.push(def_utxo);

		indices.push(next_utxo_index);
		indices.push(0);
		next_utxo_index += 1;
	}

	let output_1 = VAnchorR1CSProverBn254_30_2_2_2::create_random_utxo(curve, chain_id, 80, None, &mut rng).unwrap();

	let output_2 = VAnchorR1CSProverBn254_30_2_2_2::create_random_utxo(curve, chain_id, 10, None, &mut rng).unwrap();

	let mut proof_builder = ProofInputBuilder::VAnchor(Box::new(VAnchorProofInput::default()));

	let leaves = inputs
		.iter()
		.filter(|i| i.amount != Bn254Fr::zero())
		.map(|i| i.commitment)
		.collect::<Vec<_>>();

	let (tree, _) =
		setup_tree_and_create_path::<Bn254Fr, Poseidon<Bn254Fr>, TREE_HEIGHT>(&tree_hasher, &leaves, 0, &DEFAULT_LEAF)
			.unwrap();
	let root = tree.root();
	let in_root_set = [root; 2].iter().map(|x| x.into_repr().to_bytes_be()).collect();

	let mut leave_map: BTreeMap<u64, Vec<Vec<u8>>> = BTreeMap::new();
	let leaves: Vec<_> = leaves.iter().map(|x| x.into_repr().to_bytes_be()).collect();
	leave_map.insert(0, leaves.clone());
	proof_builder.public_amount(public_amount).unwrap();
	proof_builder.ext_data_hash([1u8; 32].to_vec()).unwrap();
	proof_builder.leaf_indices(indices).unwrap();
	proof_builder.leaves_map(leave_map).unwrap();
	proof_builder
		.set_input_utxos(
			inputs
				.clone()
				.into_iter()
				.map(|u| JsUtxo::new_from_bn254_utxo(u))
				.collect(),
		)
		.unwrap();

	let c = VAnchorR1CSProverBn254_30_2_16_2::setup_random_circuit(ArkCurve::Bn254, DEFAULT_LEAF, &mut OsRng).unwrap();
	let (pk, vk) = setup_keys_unchecked::<Bn254, _, _>(c, &mut OsRng).unwrap();
	proof_builder.exponentiation(5).unwrap();
	proof_builder.width(5).unwrap();
	proof_builder.chain_id(0).unwrap();

	proof_builder.backend(Backend::Arkworks).unwrap();
	proof_builder.curve(Curve::Bn254).unwrap();
	proof_builder.roots(in_root_set).unwrap();
	proof_builder.pk(pk).unwrap();
	proof_builder
		.set_output_utxos([
			JsUtxo::new_from_bn254_utxo(output_1),
			JsUtxo::new_from_bn254_utxo(output_2),
		])
		.unwrap();

	VAnchorTestSetup {
		proof_input_builder: JsProofInputBuilder { inner: proof_builder },
		notes: vec![],
		roots_raw: vec![],
		vk,
		leaf_index: 0,
	}
}
