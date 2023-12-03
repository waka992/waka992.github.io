import TonConnect, {
  isWalletInfoCurrentlyEmbedded,
  WalletInfoCurrentlyEmbedded,
} from "@tonconnect/sdk";

export default function useTonConnect() {
  // init connector
  const connector = new TonConnect();

  const restore = () => {
    connector.restoreConnection();
  };

  const getWallets = async () => {
    const walletsList = await TonConnect.getWallets();
    return walletsList;
  };

  const connect = async () => {
    const walletsList = await connector.getWallets(); // or use `walletsList` fetched before

    const embeddedWallet = walletsList.find(
      isWalletInfoCurrentlyEmbedded
    ) as WalletInfoCurrentlyEmbedded;

    if (embeddedWallet) {
      connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey });
      return;
    }
  };
  return { connector, restore, getWallets, connect };
}
