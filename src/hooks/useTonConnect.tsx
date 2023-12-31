import {
  SendTransactionRequest,
  TonConnect,
  UserRejectsError,
  WalletInfo,
} from "@tonconnect/sdk";
import { isMobile, openLink } from "@/utils/utils";
import toast from 'react-hot-toast';

const dappMetadata = {
  manifestUrl:
    "https://raw.githubusercontent.com/waka992/waka992.github.io/master/docs/tonconnect-manifest.json",
};
export const connector = new TonConnect(dappMetadata);

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

  const sendTransaction = async (
    tx: SendTransactionRequest,
    wallet?: any
  ): Promise<{ boc: string }> => {
    try {
      // if ('universalLink' in wallet && !wallet.embedded && isMobile()) {
      //   openLink(addReturnStrategy(wallet.universalLink, 'none'), '_blank');
      // }

      const result = await connector.sendTransaction(tx);
      toast.success("Successful transaction");
      console.log(`Send tx result: ${JSON.stringify(result)}`);
      return result;
    } catch (e) {
      let message = "Send transaction error";
      let description = "";

      if (typeof e === "object" && e instanceof UserRejectsError) {
        message = "You rejected the transaction";
        description =
          "Please try again and confirm transaction in your wallet.";
      }

      toast.error(message);
      console.log(e);
      throw e;
    }
  };

  const addReturnStrategy = (
    url: string,
    returnStrategy: "back" | "none"
  ): string => {
    const link = new URL(url);
    link.searchParams.append("ret", returnStrategy);
    return link.toString();
  };
  return { connector, restore, getWallets, sendTransaction };
}
