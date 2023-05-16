const ABI = {
	POOL: JSON.parse('[{"inputs":[{"internalType":"address","name":"_master","type":"address"},{"internalType":"address","name":"_priceOracle","type":"address"},{"internalType":"address","name":"_swapOperator","type":"address"},{"internalType":"address","name":"DAIAddress","type":"address"},{"internalType":"address","name":"stETHAddress","type":"address"},{"internalType":"address","name":"enzymeVaultAddress","type":"address"},{"internalType":"address","name":"_nxmTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"member","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nxmOut","type":"uint256"}],"name":"NXMBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"member","type":"address"},{"indexed":false,"internalType":"uint256","name":"nxmIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethOut","type":"uint256"}],"name":"NXMSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"assetAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Payout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"fromAsset","type":"address"},{"indexed":true,"internalType":"address","name":"toAsset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swapped","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"ETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BUY_SELL_MCR_ETH_FRACTION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MCR_RATIO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MCR_RATIO_DECIMALS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"bool","name":"isCoverAsset","type":"bool"},{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"},{"internalType":"uint256","name":"_maxSlippageRatio","type":"uint256"}],"name":"addAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"assets","outputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"bool","name":"isCoverAsset","type":"bool"},{"internalType":"bool","name":"isAbandoned","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minTokensOut","type":"uint256"}],"name":"buyNXM","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nxmAmount","type":"uint256"},{"internalType":"uint256","name":"currentTotalAssetValue","type":"uint256"},{"internalType":"uint256","name":"mcrEth","type":"uint256"}],"name":"calculateEthForNXM","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalAssetValue","type":"uint256"},{"internalType":"uint256","name":"mcrEth","type":"uint256"}],"name":"calculateMCRRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"},{"internalType":"uint256","name":"currentTotalAssetValue","type":"uint256"},{"internalType":"uint256","name":"mcrEth","type":"uint256"}],"name":"calculateNXMForEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalAssetValue","type":"uint256"},{"internalType":"uint256","name":"mcrEth","type":"uint256"}],"name":"calculateTokenSpotPrice","outputs":[{"internalType":"uint256","name":"tokenPrice","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"changeDependentContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"masterAddress","type":"address"}],"name":"changeMasterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"assetId","type":"uint256"}],"name":"getAsset","outputs":[{"components":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"bool","name":"isCoverAsset","type":"bool"},{"internalType":"bool","name":"isAbandoned","type":"bool"}],"internalType":"struct Asset","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"}],"name":"getAssetSwapDetails","outputs":[{"components":[{"internalType":"uint104","name":"minAmount","type":"uint104"},{"internalType":"uint104","name":"maxAmount","type":"uint104"},{"internalType":"uint32","name":"lastSwapTime","type":"uint32"},{"internalType":"uint16","name":"maxSlippageRatio","type":"uint16"}],"internalType":"struct SwapDetails","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAssets","outputs":[{"components":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"bool","name":"isCoverAsset","type":"bool"},{"internalType":"bool","name":"isAbandoned","type":"bool"}],"internalType":"struct Asset[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nxmAmount","type":"uint256"}],"name":"getEthForNXM","outputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMCRRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"}],"name":"getNXMForEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolValueInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"tokenPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assetId","type":"uint256"}],"name":"getTokenPriceInAsset","outputs":[{"internalType":"uint256","name":"tokenPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"internalContracts","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"contract INXMMaster","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nxmToken","outputs":[{"internalType":"contract INXMToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeedOracle","outputs":[{"internalType":"contract IPriceFeedOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"minEthOut","type":"uint256"}],"name":"sellNXM","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sellNXMTokens","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"assetId","type":"uint256"},{"internalType":"address payable","name":"payoutAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"assetId","type":"uint256"},{"internalType":"bool","name":"isCoverAsset","type":"bool"},{"internalType":"bool","name":"isAbandoned","type":"bool"}],"name":"setAssetDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"},{"internalType":"uint256","name":"_maxSlippageRatio","type":"uint256"}],"name":"setSwapDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"uint32","name":"lastSwapTime","type":"uint32"}],"name":"setSwapDetailsLastSwapTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setSwapValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"swapDetails","outputs":[{"internalType":"uint104","name":"minAmount","type":"uint104"},{"internalType":"uint104","name":"maxAmount","type":"uint104"},{"internalType":"uint32","name":"lastSwapTime","type":"uint32"},{"internalType":"uint16","name":"maxSlippageRatio","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapOperator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapValue","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"address payable","name":"destination","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAssetToSwapOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes8","name":"code","type":"bytes8"},{"internalType":"address","name":"value","type":"address"}],"name":"updateAddressParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes8","name":"","type":"bytes8"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"updateUintParameters","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"newPoolAddress","type":"address"}],"name":"upgradeCapitalPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'),
	MEMBERROLES: 
JSON.parse('[{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newMember","type":"address"},{"indexed":true,"internalType":"uint256","name":"nonce","type":"uint256"}],"name":"MemberJoined","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roleId","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"roleName","type":"bytes32"},{"indexed":false,"internalType":"string","name":"roleDescription","type":"string"}],"name":"MemberRole","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousMember","type":"address"},{"indexed":true,"internalType":"address","name":"newMember","type":"address"},{"indexed":false,"internalType":"uint256","name":"timeStamp","type":"uint256"}],"name":"switchedMembership","type":"event"},{"inputs":[],"name":"MEMBERSHIP_APPROVAL","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_roleName","type":"bytes32"},{"internalType":"string","name":"_roleDescription","type":"string"},{"internalType":"address","name":"_authorized","type":"address"}],"name":"addRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_memberRoleId","type":"uint256"}],"name":"authorized","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roleId","type":"uint256"},{"internalType":"address","name":"_newAuthorized","type":"address"}],"name":"changeAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeDependentContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"masterAddress","type":"address"}],"name":"changeMasterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_val","type":"uint256"}],"name":"changeMaxABCount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_memberAddress","type":"address"},{"internalType":"uint256","name":"_roleId","type":"uint256"}],"name":"checkRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMemberLengthForAllRoles","outputs":[{"internalType":"uint256[]","name":"totalMembers","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"internalContracts","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_toCheck","type":"address"}],"name":"isAuthorizedToGovern","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"member","type":"address"}],"name":"isMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"join","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joiningFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kycAuthAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"launched","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"launchedOn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"contract INXMMaster","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxABCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_memberRoleId","type":"uint256"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"memberAtIndex","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_memberRoleId","type":"uint256"}],"name":"members","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address[]","name":"memberArray","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_memberRoleId","type":"uint256"}],"name":"membersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_memberRoleId","type":"uint256"}],"name":"numberOfMembers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_memberAddress","type":"address"}],"name":"roles","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"setKycAuthAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"payoutAddresses","type":"address[]"}],"name":"storageCleanup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newABAddress","type":"address"},{"internalType":"address","name":"_removeAB","type":"address"}],"name":"swapABMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"switchMembership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"},{"internalType":"uint256[]","name":"coverIds","type":"uint256[]"},{"internalType":"uint256[]","name":"stakingTokenIds","type":"uint256[]"}],"name":"switchMembershipAndAssets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"member","type":"address"},{"internalType":"address","name":"newAddress","type":"address"}],"name":"switchMembershipOf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract INXMToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRoles","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_memberAddress","type":"address"},{"internalType":"uint256","name":"_roleId","type":"uint256"},{"internalType":"bool","name":"_active","type":"bool"}],"name":"updateRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"usedMessageHashes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawMembership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'), 
ENZYMEVALUECALCULATOR: JSON.parse('[{"inputs":[{"internalType":"address","name":"_feeManager","type":"address"},{"internalType":"address","name":"_protocolFeeTracker","type":"address"},{"internalType":"address","name":"_valueInterpreter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"}],"name":"calcGav","outputs":[{"internalType":"address","name":"denominationAsset_","type":"address"},{"internalType":"uint256","name":"gav_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"},{"internalType":"address","name":"_quoteAsset","type":"address"}],"name":"calcGavInAsset","outputs":[{"internalType":"uint256","name":"gav_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"}],"name":"calcGrossShareValue","outputs":[{"internalType":"address","name":"denominationAsset_","type":"address"},{"internalType":"uint256","name":"grossShareValue_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"},{"internalType":"address","name":"_quoteAsset","type":"address"}],"name":"calcGrossShareValueInAsset","outputs":[{"internalType":"uint256","name":"grossShareValue_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"}],"name":"calcNav","outputs":[{"internalType":"address","name":"denominationAsset_","type":"address"},{"internalType":"uint256","name":"nav_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"},{"internalType":"address","name":"_quoteAsset","type":"address"}],"name":"calcNavInAsset","outputs":[{"internalType":"uint256","name":"nav_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"}],"name":"calcNetShareValue","outputs":[{"internalType":"address","name":"denominationAsset_","type":"address"},{"internalType":"uint256","name":"netShareValue_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"},{"internalType":"address","name":"_quoteAsset","type":"address"}],"name":"calcNetShareValueInAsset","outputs":[{"internalType":"uint256","name":"netShareValue_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"},{"internalType":"address","name":"_sharesHolder","type":"address"}],"name":"calcNetValueForSharesHolder","outputs":[{"internalType":"address","name":"denominationAsset_","type":"address"},{"internalType":"uint256","name":"netValue_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"},{"internalType":"address","name":"_sharesHolder","type":"address"},{"internalType":"address","name":"_quoteAsset","type":"address"}],"name":"calcNetValueForSharesHolderInAsset","outputs":[{"internalType":"uint256","name":"netValue_","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vaultProxy","type":"address"}],"name":"calcProtocolFeeDueForFund","outputs":[{"internalType":"uint256","name":"sharesDue_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFeeManager","outputs":[{"internalType":"address","name":"feeManager_","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProtocolFeeTracker","outputs":[{"internalType":"address","name":"protocolFeeTracker_","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getValueInterpreter","outputs":[{"internalType":"address","name":"valueInterpreter_","type":"address"}],"stateMutability":"view","type":"function"}]'),
COVERVIEWER: JSON.parse('[{"inputs":[{"internalType":"address","name":"masterAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"coverId","type":"uint256"}],"name":"getCoverSegments","outputs":[{"components":[{"internalType":"uint256","name":"segmentId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"remainingAmount","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"period","type":"uint256"},{"internalType":"uint256","name":"gracePeriod","type":"uint256"}],"internalType":"struct CoverViewer.Segment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"coverIds","type":"uint256[]"}],"name":"getCovers","outputs":[{"components":[{"internalType":"uint256","name":"coverId","type":"uint256"},{"internalType":"uint256","name":"productId","type":"uint256"},{"internalType":"uint256","name":"coverAsset","type":"uint256"},{"internalType":"uint256","name":"amountPaidOut","type":"uint256"},{"components":[{"internalType":"uint256","name":"segmentId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"remainingAmount","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"period","type":"uint256"},{"internalType":"uint256","name":"gracePeriod","type":"uint256"}],"internalType":"struct CoverViewer.Segment[]","name":"segments","type":"tuple[]"}],"internalType":"struct CoverViewer.Cover[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]')
}

module.exports = { ABI };
