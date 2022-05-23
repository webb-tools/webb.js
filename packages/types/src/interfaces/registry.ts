// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type {
  DkgRuntimePrimitivesAggregatedMisbehaviourReports,
  DkgRuntimePrimitivesAggregatedPublicKeys,
  DkgRuntimePrimitivesCryptoPublic,
  DkgRuntimePrimitivesMisbehaviourType,
  DkgRuntimePrimitivesProposal,
  DkgRuntimePrimitivesProposalDkgPayloadKey,
  DkgRuntimePrimitivesProposalProposalKind,
  DkgRuntimePrimitivesProposalRefreshProposalSigned,
  EggStandaloneRuntimeNposSolution16,
  EggStandaloneRuntimeOpaqueSessionKeys,
  EggStandaloneRuntimeOriginCaller,
  EggStandaloneRuntimeProtocolSubstrateConfigElement,
  EggStandaloneRuntimeRuntime,
  FinalityGrandpaEquivocationPrecommit,
  FinalityGrandpaEquivocationPrevote,
  FinalityGrandpaPrecommit,
  FinalityGrandpaPrevote,
  FrameSupportDispatchRawOrigin,
  FrameSupportPalletId,
  FrameSupportScheduleLookupError,
  FrameSupportScheduleMaybeHashed,
  FrameSupportTokensMiscBalanceStatus,
  FrameSupportWeightsDispatchClass,
  FrameSupportWeightsDispatchInfo,
  FrameSupportWeightsPays,
  FrameSupportWeightsPerDispatchClassU32,
  FrameSupportWeightsPerDispatchClassU64,
  FrameSupportWeightsPerDispatchClassWeightsPerClass,
  FrameSupportWeightsRuntimeDbWeight,
  FrameSupportWeightsWeightToFeeCoefficient,
  FrameSystemAccountInfo,
  FrameSystemCall,
  FrameSystemError,
  FrameSystemEvent,
  FrameSystemEventRecord,
  FrameSystemExtensionsCheckGenesis,
  FrameSystemExtensionsCheckNonce,
  FrameSystemExtensionsCheckSpecVersion,
  FrameSystemExtensionsCheckTxVersion,
  FrameSystemExtensionsCheckWeight,
  FrameSystemLastRuntimeUpgradeInfo,
  FrameSystemLimitsBlockLength,
  FrameSystemLimitsBlockWeights,
  FrameSystemLimitsWeightsPerClass,
  FrameSystemPhase,
  OrmlCurrenciesModuleCall,
  OrmlCurrenciesModuleError,
  OrmlCurrenciesModuleEvent,
  OrmlTokensAccountData,
  OrmlTokensBalanceLock,
  OrmlTokensModuleCall,
  OrmlTokensModuleError,
  OrmlTokensModuleEvent,
  PalletAnchorAnchorMetadata,
  PalletAnchorCall,
  PalletAnchorError,
  PalletAnchorEvent,
  PalletAnchorHandlerCall,
  PalletAnchorHandlerError,
  PalletAnchorHandlerEvent,
  PalletAnchorHandlerUpdateRecord,
  PalletAssetRegistryAssetDetails,
  PalletAssetRegistryAssetMetadata,
  PalletAssetRegistryAssetType,
  PalletAssetRegistryCall,
  PalletAssetRegistryError,
  PalletAssetRegistryEvent,
  PalletAuthorshipCall,
  PalletAuthorshipError,
  PalletAuthorshipUncleEntryItem,
  PalletBagsListCall,
  PalletBagsListError,
  PalletBagsListEvent,
  PalletBagsListListBag,
  PalletBagsListListNode,
  PalletBalancesAccountData,
  PalletBalancesBalanceLock,
  PalletBalancesCall,
  PalletBalancesError,
  PalletBalancesEvent,
  PalletBalancesReasons,
  PalletBalancesReleases,
  PalletBalancesReserveData,
  PalletBountiesBounty,
  PalletBountiesBountyStatus,
  PalletBountiesCall,
  PalletBountiesError,
  PalletBountiesEvent,
  PalletChildBountiesCall,
  PalletChildBountiesChildBounty,
  PalletChildBountiesChildBountyStatus,
  PalletChildBountiesError,
  PalletChildBountiesEvent,
  PalletCollectiveCall,
  PalletCollectiveError,
  PalletCollectiveEvent,
  PalletCollectiveRawOrigin,
  PalletCollectiveVotes,
  PalletDemocracyCall,
  PalletDemocracyConviction,
  PalletDemocracyDelegations,
  PalletDemocracyError,
  PalletDemocracyEvent,
  PalletDemocracyPreimageStatus,
  PalletDemocracyReferendumInfo,
  PalletDemocracyReferendumStatus,
  PalletDemocracyReleases,
  PalletDemocracyTally,
  PalletDemocracyVoteAccountVote,
  PalletDemocracyVotePriorLock,
  PalletDemocracyVoteThreshold,
  PalletDemocracyVoteVoting,
  PalletDkgMetadataCall,
  PalletDkgMetadataError,
  PalletDkgMetadataEvent,
  PalletDkgMetadataRoundMetadata,
  PalletDkgProposalHandlerCall,
  PalletDkgProposalHandlerError,
  PalletDkgProposalHandlerEvent,
  PalletDkgProposalsCall,
  PalletDkgProposalsError,
  PalletDkgProposalsEvent,
  PalletDkgProposalsProposalStatus,
  PalletDkgProposalsProposalVotes,
  PalletElectionProviderMultiPhaseCall,
  PalletElectionProviderMultiPhaseElectionCompute,
  PalletElectionProviderMultiPhaseError,
  PalletElectionProviderMultiPhaseEvent,
  PalletElectionProviderMultiPhasePhase,
  PalletElectionProviderMultiPhaseRawSolution,
  PalletElectionProviderMultiPhaseReadySolution,
  PalletElectionProviderMultiPhaseRoundSnapshot,
  PalletElectionProviderMultiPhaseSignedSignedSubmission,
  PalletElectionProviderMultiPhaseSolutionOrSnapshotSize,
  PalletElectionsPhragmenCall,
  PalletElectionsPhragmenError,
  PalletElectionsPhragmenEvent,
  PalletElectionsPhragmenRenouncing,
  PalletElectionsPhragmenSeatHolder,
  PalletElectionsPhragmenVoter,
  PalletGrandpaCall,
  PalletGrandpaError,
  PalletGrandpaEvent,
  PalletGrandpaStoredPendingChange,
  PalletGrandpaStoredState,
  PalletHasherCall,
  PalletHasherError,
  PalletHasherEvent,
  PalletLinkableTreeCall,
  PalletLinkableTreeEdgeMetadata,
  PalletLinkableTreeError,
  PalletLinkableTreeEvent,
  PalletMixerCall,
  PalletMixerError,
  PalletMixerEvent,
  PalletMixerMixerMetadata,
  PalletMtCall,
  PalletMtError,
  PalletMtEvent,
  PalletMtTreeMetadata,
  PalletOffencesEvent,
  PalletPreimageCall,
  PalletPreimageError,
  PalletPreimageEvent,
  PalletPreimageRequestStatus,
  PalletSchedulerCall,
  PalletSchedulerError,
  PalletSchedulerEvent,
  PalletSchedulerScheduledV3,
  PalletSessionCall,
  PalletSessionError,
  PalletSessionEvent,
  PalletSignatureBridgeCall,
  PalletSignatureBridgeError,
  PalletSignatureBridgeEvent,
  PalletStakingActiveEraInfo,
  PalletStakingEraRewardPoints,
  PalletStakingExposure,
  PalletStakingForcing,
  PalletStakingIndividualExposure,
  PalletStakingNominations,
  PalletStakingPalletCall,
  PalletStakingPalletError,
  PalletStakingPalletEvent,
  PalletStakingReleases,
  PalletStakingRewardDestination,
  PalletStakingSlashingSlashingSpans,
  PalletStakingSlashingSpanRecord,
  PalletStakingStakingLedger,
  PalletStakingUnappliedSlash,
  PalletStakingUnlockChunk,
  PalletStakingValidatorPrefs,
  PalletSudoCall,
  PalletSudoError,
  PalletSudoEvent,
  PalletTimestampCall,
  PalletTokenWrapperCall,
  PalletTokenWrapperError,
  PalletTokenWrapperEvent,
  PalletTransactionPaymentChargeTransactionPayment,
  PalletTransactionPaymentReleases,
  PalletTreasuryCall,
  PalletTreasuryError,
  PalletTreasuryEvent,
  PalletTreasuryProposal,
  PalletVerifierCall,
  PalletVerifierError,
  PalletVerifierEvent,
  SpConsensusAuraSr25519AppSr25519Public,
  SpCoreCryptoKeyTypeId,
  SpCoreEcdsaPublic,
  SpCoreEcdsaSignature,
  SpCoreEd25519Public,
  SpCoreEd25519Signature,
  SpCoreSr25519Public,
  SpCoreSr25519Signature,
  SpCoreVoid,
  SpFinalityGrandpaAppPublic,
  SpFinalityGrandpaAppSignature,
  SpFinalityGrandpaEquivocation,
  SpFinalityGrandpaEquivocationProof,
  SpNposElectionsSupport,
  SpRuntimeArithmeticError,
  SpRuntimeBlakeTwo256,
  SpRuntimeDigest,
  SpRuntimeDigestDigestItem,
  SpRuntimeDispatchError,
  SpRuntimeHeader,
  SpRuntimeModuleError,
  SpRuntimeMultiSignature,
  SpRuntimeTokenError,
  SpSessionMembershipProof,
  SpStakingOffenceOffenceDetails,
  SpVersionRuntimeVersion,
  WebbPrimitivesDepositDetails,
  WebbProposalsHeaderResourceId,
  WebbProposalsHeaderTypedChainId,
} from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  export interface InterfaceTypes {
    DkgRuntimePrimitivesAggregatedMisbehaviourReports: DkgRuntimePrimitivesAggregatedMisbehaviourReports;
    DkgRuntimePrimitivesAggregatedPublicKeys: DkgRuntimePrimitivesAggregatedPublicKeys;
    DkgRuntimePrimitivesCryptoPublic: DkgRuntimePrimitivesCryptoPublic;
    DkgRuntimePrimitivesMisbehaviourType: DkgRuntimePrimitivesMisbehaviourType;
    DkgRuntimePrimitivesProposal: DkgRuntimePrimitivesProposal;
    DkgRuntimePrimitivesProposalDkgPayloadKey: DkgRuntimePrimitivesProposalDkgPayloadKey;
    DkgRuntimePrimitivesProposalProposalKind: DkgRuntimePrimitivesProposalProposalKind;
    DkgRuntimePrimitivesProposalRefreshProposalSigned: DkgRuntimePrimitivesProposalRefreshProposalSigned;
    EggStandaloneRuntimeNposSolution16: EggStandaloneRuntimeNposSolution16;
    EggStandaloneRuntimeOpaqueSessionKeys: EggStandaloneRuntimeOpaqueSessionKeys;
    EggStandaloneRuntimeOriginCaller: EggStandaloneRuntimeOriginCaller;
    EggStandaloneRuntimeProtocolSubstrateConfigElement: EggStandaloneRuntimeProtocolSubstrateConfigElement;
    EggStandaloneRuntimeRuntime: EggStandaloneRuntimeRuntime;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportScheduleLookupError: FrameSupportScheduleLookupError;
    FrameSupportScheduleMaybeHashed: FrameSupportScheduleMaybeHashed;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSupportWeightsDispatchClass: FrameSupportWeightsDispatchClass;
    FrameSupportWeightsDispatchInfo: FrameSupportWeightsDispatchInfo;
    FrameSupportWeightsPays: FrameSupportWeightsPays;
    FrameSupportWeightsPerDispatchClassU32: FrameSupportWeightsPerDispatchClassU32;
    FrameSupportWeightsPerDispatchClassU64: FrameSupportWeightsPerDispatchClassU64;
    FrameSupportWeightsPerDispatchClassWeightsPerClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
    FrameSupportWeightsRuntimeDbWeight: FrameSupportWeightsRuntimeDbWeight;
    FrameSupportWeightsWeightToFeeCoefficient: FrameSupportWeightsWeightToFeeCoefficient;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    OrmlCurrenciesModuleCall: OrmlCurrenciesModuleCall;
    OrmlCurrenciesModuleError: OrmlCurrenciesModuleError;
    OrmlCurrenciesModuleEvent: OrmlCurrenciesModuleEvent;
    OrmlTokensAccountData: OrmlTokensAccountData;
    OrmlTokensBalanceLock: OrmlTokensBalanceLock;
    OrmlTokensModuleCall: OrmlTokensModuleCall;
    OrmlTokensModuleError: OrmlTokensModuleError;
    OrmlTokensModuleEvent: OrmlTokensModuleEvent;
    PalletAnchorAnchorMetadata: PalletAnchorAnchorMetadata;
    PalletAnchorCall: PalletAnchorCall;
    PalletAnchorError: PalletAnchorError;
    PalletAnchorEvent: PalletAnchorEvent;
    PalletAnchorHandlerCall: PalletAnchorHandlerCall;
    PalletAnchorHandlerError: PalletAnchorHandlerError;
    PalletAnchorHandlerEvent: PalletAnchorHandlerEvent;
    PalletAnchorHandlerUpdateRecord: PalletAnchorHandlerUpdateRecord;
    PalletAssetRegistryAssetDetails: PalletAssetRegistryAssetDetails;
    PalletAssetRegistryAssetMetadata: PalletAssetRegistryAssetMetadata;
    PalletAssetRegistryAssetType: PalletAssetRegistryAssetType;
    PalletAssetRegistryCall: PalletAssetRegistryCall;
    PalletAssetRegistryError: PalletAssetRegistryError;
    PalletAssetRegistryEvent: PalletAssetRegistryEvent;
    PalletAuthorshipCall: PalletAuthorshipCall;
    PalletAuthorshipError: PalletAuthorshipError;
    PalletAuthorshipUncleEntryItem: PalletAuthorshipUncleEntryItem;
    PalletBagsListCall: PalletBagsListCall;
    PalletBagsListError: PalletBagsListError;
    PalletBagsListEvent: PalletBagsListEvent;
    PalletBagsListListBag: PalletBagsListListBag;
    PalletBagsListListNode: PalletBagsListListNode;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReleases: PalletBalancesReleases;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletBountiesBounty: PalletBountiesBounty;
    PalletBountiesBountyStatus: PalletBountiesBountyStatus;
    PalletBountiesCall: PalletBountiesCall;
    PalletBountiesError: PalletBountiesError;
    PalletBountiesEvent: PalletBountiesEvent;
    PalletChildBountiesCall: PalletChildBountiesCall;
    PalletChildBountiesChildBounty: PalletChildBountiesChildBounty;
    PalletChildBountiesChildBountyStatus: PalletChildBountiesChildBountyStatus;
    PalletChildBountiesError: PalletChildBountiesError;
    PalletChildBountiesEvent: PalletChildBountiesEvent;
    PalletCollectiveCall: PalletCollectiveCall;
    PalletCollectiveError: PalletCollectiveError;
    PalletCollectiveEvent: PalletCollectiveEvent;
    PalletCollectiveRawOrigin: PalletCollectiveRawOrigin;
    PalletCollectiveVotes: PalletCollectiveVotes;
    PalletDemocracyCall: PalletDemocracyCall;
    PalletDemocracyConviction: PalletDemocracyConviction;
    PalletDemocracyDelegations: PalletDemocracyDelegations;
    PalletDemocracyError: PalletDemocracyError;
    PalletDemocracyEvent: PalletDemocracyEvent;
    PalletDemocracyPreimageStatus: PalletDemocracyPreimageStatus;
    PalletDemocracyReferendumInfo: PalletDemocracyReferendumInfo;
    PalletDemocracyReferendumStatus: PalletDemocracyReferendumStatus;
    PalletDemocracyReleases: PalletDemocracyReleases;
    PalletDemocracyTally: PalletDemocracyTally;
    PalletDemocracyVoteAccountVote: PalletDemocracyVoteAccountVote;
    PalletDemocracyVotePriorLock: PalletDemocracyVotePriorLock;
    PalletDemocracyVoteThreshold: PalletDemocracyVoteThreshold;
    PalletDemocracyVoteVoting: PalletDemocracyVoteVoting;
    PalletDkgMetadataCall: PalletDkgMetadataCall;
    PalletDkgMetadataError: PalletDkgMetadataError;
    PalletDkgMetadataEvent: PalletDkgMetadataEvent;
    PalletDkgMetadataRoundMetadata: PalletDkgMetadataRoundMetadata;
    PalletDkgProposalHandlerCall: PalletDkgProposalHandlerCall;
    PalletDkgProposalHandlerError: PalletDkgProposalHandlerError;
    PalletDkgProposalHandlerEvent: PalletDkgProposalHandlerEvent;
    PalletDkgProposalsCall: PalletDkgProposalsCall;
    PalletDkgProposalsError: PalletDkgProposalsError;
    PalletDkgProposalsEvent: PalletDkgProposalsEvent;
    PalletDkgProposalsProposalStatus: PalletDkgProposalsProposalStatus;
    PalletDkgProposalsProposalVotes: PalletDkgProposalsProposalVotes;
    PalletElectionProviderMultiPhaseCall: PalletElectionProviderMultiPhaseCall;
    PalletElectionProviderMultiPhaseElectionCompute: PalletElectionProviderMultiPhaseElectionCompute;
    PalletElectionProviderMultiPhaseError: PalletElectionProviderMultiPhaseError;
    PalletElectionProviderMultiPhaseEvent: PalletElectionProviderMultiPhaseEvent;
    PalletElectionProviderMultiPhasePhase: PalletElectionProviderMultiPhasePhase;
    PalletElectionProviderMultiPhaseRawSolution: PalletElectionProviderMultiPhaseRawSolution;
    PalletElectionProviderMultiPhaseReadySolution: PalletElectionProviderMultiPhaseReadySolution;
    PalletElectionProviderMultiPhaseRoundSnapshot: PalletElectionProviderMultiPhaseRoundSnapshot;
    PalletElectionProviderMultiPhaseSignedSignedSubmission: PalletElectionProviderMultiPhaseSignedSignedSubmission;
    PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: PalletElectionProviderMultiPhaseSolutionOrSnapshotSize;
    PalletElectionsPhragmenCall: PalletElectionsPhragmenCall;
    PalletElectionsPhragmenError: PalletElectionsPhragmenError;
    PalletElectionsPhragmenEvent: PalletElectionsPhragmenEvent;
    PalletElectionsPhragmenRenouncing: PalletElectionsPhragmenRenouncing;
    PalletElectionsPhragmenSeatHolder: PalletElectionsPhragmenSeatHolder;
    PalletElectionsPhragmenVoter: PalletElectionsPhragmenVoter;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletHasherCall: PalletHasherCall;
    PalletHasherError: PalletHasherError;
    PalletHasherEvent: PalletHasherEvent;
    PalletLinkableTreeCall: PalletLinkableTreeCall;
    PalletLinkableTreeEdgeMetadata: PalletLinkableTreeEdgeMetadata;
    PalletLinkableTreeError: PalletLinkableTreeError;
    PalletLinkableTreeEvent: PalletLinkableTreeEvent;
    PalletMixerCall: PalletMixerCall;
    PalletMixerError: PalletMixerError;
    PalletMixerEvent: PalletMixerEvent;
    PalletMixerMixerMetadata: PalletMixerMixerMetadata;
    PalletMtCall: PalletMtCall;
    PalletMtError: PalletMtError;
    PalletMtEvent: PalletMtEvent;
    PalletMtTreeMetadata: PalletMtTreeMetadata;
    PalletOffencesEvent: PalletOffencesEvent;
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduledV3: PalletSchedulerScheduledV3;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletSignatureBridgeCall: PalletSignatureBridgeCall;
    PalletSignatureBridgeError: PalletSignatureBridgeError;
    PalletSignatureBridgeEvent: PalletSignatureBridgeEvent;
    PalletStakingActiveEraInfo: PalletStakingActiveEraInfo;
    PalletStakingEraRewardPoints: PalletStakingEraRewardPoints;
    PalletStakingExposure: PalletStakingExposure;
    PalletStakingForcing: PalletStakingForcing;
    PalletStakingIndividualExposure: PalletStakingIndividualExposure;
    PalletStakingNominations: PalletStakingNominations;
    PalletStakingPalletCall: PalletStakingPalletCall;
    PalletStakingPalletError: PalletStakingPalletError;
    PalletStakingPalletEvent: PalletStakingPalletEvent;
    PalletStakingReleases: PalletStakingReleases;
    PalletStakingRewardDestination: PalletStakingRewardDestination;
    PalletStakingSlashingSlashingSpans: PalletStakingSlashingSlashingSpans;
    PalletStakingSlashingSpanRecord: PalletStakingSlashingSpanRecord;
    PalletStakingStakingLedger: PalletStakingStakingLedger;
    PalletStakingUnappliedSlash: PalletStakingUnappliedSlash;
    PalletStakingUnlockChunk: PalletStakingUnlockChunk;
    PalletStakingValidatorPrefs: PalletStakingValidatorPrefs;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTokenWrapperCall: PalletTokenWrapperCall;
    PalletTokenWrapperError: PalletTokenWrapperError;
    PalletTokenWrapperEvent: PalletTokenWrapperEvent;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletTreasuryCall: PalletTreasuryCall;
    PalletTreasuryError: PalletTreasuryError;
    PalletTreasuryEvent: PalletTreasuryEvent;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletVerifierCall: PalletVerifierCall;
    PalletVerifierError: PalletVerifierError;
    PalletVerifierEvent: PalletVerifierEvent;
    SpConsensusAuraSr25519AppSr25519Public: SpConsensusAuraSr25519AppSr25519Public;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreEcdsaPublic: SpCoreEcdsaPublic;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpFinalityGrandpaAppPublic: SpFinalityGrandpaAppPublic;
    SpFinalityGrandpaAppSignature: SpFinalityGrandpaAppSignature;
    SpFinalityGrandpaEquivocation: SpFinalityGrandpaEquivocation;
    SpFinalityGrandpaEquivocationProof: SpFinalityGrandpaEquivocationProof;
    SpNposElectionsSupport: SpNposElectionsSupport;
    SpRuntimeArithmeticError: SpRuntimeArithmeticError;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeHeader: SpRuntimeHeader;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpSessionMembershipProof: SpSessionMembershipProof;
    SpStakingOffenceOffenceDetails: SpStakingOffenceOffenceDetails;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    WebbPrimitivesDepositDetails: WebbPrimitivesDepositDetails;
    WebbProposalsHeaderResourceId: WebbProposalsHeaderResourceId;
    WebbProposalsHeaderTypedChainId: WebbProposalsHeaderTypedChainId;
  } // InterfaceTypes
} // declare module
