// https://api.nexusmutual.io/sdk/

const ADDRESS = {
  ENZYMEVAULT: "0x27f23c710dd3d878fe9393d93465fed1302f2ebd",
  ENZYMEVALUECALCULATOR: "0x490e64e0690b4aa481fb02255aed3d052bad7bf1",
  POOL: "0xcafea112Db32436c2390F5EC988f3aDB96870627",
  // MEMBERROLES: "0xcafea22Faff6aEc1d1bfc146b2e2EABC73Fa7Acc",
  //proxy
  COVERVIEWER: "0xcafea84e199C85E44F34CD75374188D33FB94B4b",
  MEMBERROLES: "0x055CC48f7968FD8640EF140610dd4038e1b03926",
  POOLTOKENS: [
    {
      // weth
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "ETH",
      decimals: 18,
      isEth: true,
    },
    {
      //steth
      address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
      symbol: "stETH",
      decimals: 18,
    },
    {
      // dai
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      decimals: 18,
    },
    {
      //nxmty
      address: "0x27F23c710dD3d878FE9393d93465FeD1302f2EbD",
      symbol: "NXMTY",
      decimals: 18,
    },
  ],
};

module.exports = { ADDRESS };
