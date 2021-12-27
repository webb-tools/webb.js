use ark_bn254::Fr;
use ark_crypto_primitives::CRH as CRHTrait;
use ark_ff::{to_bytes, FromBytes};
use ark_serialize::CanonicalSerialize;
use arkworks_gadgets::leaf::mixer::{MixerLeaf, Private};
use arkworks_gadgets::prelude::*;

const SEED: &[u8; 32] = b"WebbToolsPedersenHasherSeedBytes";
use ark_std::rand::rngs::OsRng;

use crate::note::{LeafHasher, NoteGenerator};
use crate::types::OpStatusCode;
use arkworks_circuits::setup::common::{
	PoseidonCRH_x17_3, PoseidonCRH_x17_5, PoseidonCRH_x3_3, PoseidonCRH_x3_5, PoseidonCRH_x5_3, PoseidonCRH_x5_5,
};
use arkworks_utils::poseidon::PoseidonParameters;
use arkworks_utils::utils::common::{
	setup_params_x17_3, setup_params_x17_5, setup_params_x3_3, setup_params_x3_5, setup_params_x5_5, Curve,
};

pub struct ArkworksPoseidonBn254NoteGenerator {
	exponentiation: usize,
	width: usize,
}
type Leaf5_3 = MixerLeaf<Fr, PoseidonCRH_x5_3<Fr>>;
type Leaf5_5 = MixerLeaf<Fr, PoseidonCRH_x5_5<Fr>>;
type Leaf3_3 = MixerLeaf<Fr, PoseidonCRH_x3_3<Fr>>;
type Leaf3_5 = MixerLeaf<Fr, PoseidonCRH_x3_5<Fr>>;
type Leaf17_5 = MixerLeaf<Fr, PoseidonCRH_x17_5<Fr>>;
type Leaf17_3 = MixerLeaf<Fr, PoseidonCRH_x17_3<Fr>>;

impl NoteGenerator for ArkworksPoseidonBn254NoteGenerator {
	type Rng = OsRng;

	fn get_rng(&self) -> Self::Rng {
		OsRng
	}

	fn generate_secrets(&self, r: &mut Self::Rng) -> Result<Vec<u8>, OpStatusCode> {
		let private = Private::<Fr>::generate(r);
		let leaf_inputs = to_bytes![private.secret(), private.nullifier()].unwrap();
		dbg!(leaf_inputs.len());
		Ok(leaf_inputs)
	}
}

impl LeafHasher for ArkworksPoseidonBn254NoteGenerator {
	type HasherOptions = PoseidonParameters<Fr>;

	const SECRET_LENGTH: usize = 0;

	fn hash(&self, secrets: &[u8], params: Self::HasherOptions) -> Result<Vec<u8>, OpStatusCode> {
		// todo validate the note secrets
		/*		dbg!(secrets.len());
		if secrets.len() != 96 {
			return Err(OpStatusCode::InvalidNoteLength);
		}*/
		let sec = &secrets[..32];
		let nul = &secrets[32..];
		let private = Private::<Fr>::new(Fr::read(sec).unwrap(), Fr::read(nul).unwrap());
		let leaf = match (self.exponentiation, self.width) {
			(5, 3) => Leaf5_5::create_leaf(&private, &params).map_err(|_| OpStatusCode::SecretGenFailed)?,
			(5, 5) => Leaf5_5::create_leaf(&private, &params).map_err(|_| OpStatusCode::SecretGenFailed)?,
			(3, 3) => PoseidonCRH_x3_3::<Fr>::evaluate(&params, secrets).map_err(|_| OpStatusCode::SecretGenFailed)?,
			(3, 5) => PoseidonCRH_x3_5::<Fr>::evaluate(&params, secrets).map_err(|_| OpStatusCode::SecretGenFailed)?,
			(17, 3) => {
				PoseidonCRH_x17_3::<Fr>::evaluate(&params, secrets).map_err(|_| OpStatusCode::SecretGenFailed)?
			}
			(17, 5) => {
				PoseidonCRH_x17_3::<Fr>::evaluate(&params, secrets).map_err(|_| OpStatusCode::SecretGenFailed)?
			}
			_ => {
				unimplemented!()
			}
		};
		let mut leaf_bytes = Vec::new();
		CanonicalSerialize::serialize(&leaf, &mut leaf_bytes).unwrap();
		Ok(leaf_bytes)
	}
}

impl ArkworksPoseidonBn254NoteGenerator {
	pub fn get_params(&self) -> PoseidonParameters<Fr> {
		match (self.exponentiation, self.width) {
			(5, 3) => setup_params_x5_5::<Fr>(Curve::Bn254),
			(5, 5) => setup_params_x5_5::<Fr>(Curve::Bn254),
			(3, 3) => setup_params_x3_3::<Fr>(Curve::Bn254),
			(3, 5) => setup_params_x3_5::<Fr>(Curve::Bn254),
			(17, 3) => setup_params_x17_3::<Fr>(Curve::Bn254),
			(17, 5) => setup_params_x17_5::<Fr>(Curve::Bn254),
			_ => {
				unreachable!()
			}
		}
	}

	pub fn new(exponentiation: usize, width: usize) -> Self {
		Self { exponentiation, width }
	}
}

#[cfg(test)]
mod test {
	const SEED: &[u8; 32] = b"WebbToolsPedersenHasherSeedBytes";

	use super::*;
	use crate::note::NoteInput;
	use ark_serialize::CanonicalSerializeHashExt;
	use ark_std::rand::rngs::OsRng;

	#[test]
	fn arkworks_poseidon_bn254note_generator_5x_3_leaf() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(5, 3);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
		let has = note_generator.hash(&note.secret, note_generator.get_params()).unwrap();
		dbg!(hex::encode(has));
	}

	#[test]
	fn arkworks_poseidon_bn254note_generator_5x_3() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(5, 3);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
		let has = note_generator.hash(&note.secret, note_generator.get_params()).unwrap();
		dbg!(hex::encode(has));
	}
	#[test]
	fn arkworks_poseidon_bn254note_generator_5x_5() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(5, 3);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
		let has = note_generator.hash(&note.secret, note_generator.get_params()).unwrap();
		dbg!(hex::encode(has));
	}
	#[test]
	fn arkworks_poseidon_bn254note_generator_3x_3() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(3, 3);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
	}
	#[test]
	fn arkworks_poseidon_bn254note_generator_3x_5() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(3, 5);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
	}
	#[test]
	fn arkworks_poseidon_bn254note_generator_17x_3() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(17, 3);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
	}

	#[test]
	fn arkworks_poseidon_bn254note_generator_17x_5() {
		let mut r = OsRng;
		let note_generator = ArkworksPoseidonBn254NoteGenerator::new(17, 5);
		let secrets = note_generator.generate_secrets(&mut r).unwrap();
		let leaf = note_generator.hash(&secrets, note_generator.get_params()).unwrap();
		let note = note_generator.generate(&NoteInput::default(), &mut r).unwrap();
		dbg!(note.to_string());
	}
}
