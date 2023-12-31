import {
  fromNano,
  internal,
  TonClient,
  Address,
  WalletContractV4,
  WalletContractV3R2,
  TonClient4,
  toNano,
} from "@ton/ton";
import { KeyPair, mnemonicToPrivateKey } from "@ton/crypto";
import { getHttpEndpoint, getHttpV4Endpoint } from "@orbs-network/ton-access";

export default function useTransaction() {
  return async function (address) {
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    const mnemonics = (import.meta.env.VITE_MNEMONICS || "").toString(); // 🔴 Change to your own, by creating .env file!
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const workchain = 0;

    // my wallet
    const wallet_create = WalletContractV3R2.create({
      workchain,
      publicKey: keyPair.publicKey,
    });
    const wallet = client.open(wallet_create);

    console.log("Wallet address: ", wallet.address);
    // const target_wallet = WalletContractV3R2.create({
    //   workchain: workchain,
    //   publicKey: keyPair.publicKey,
    //   walletId: 1,
    // });

    const seqno: number = await wallet.getSeqno();
    const balance: bigint = await wallet.getBalance();
    await wallet.sendTransfer({
      seqno,
      secretKey: keyPair.secretKey,
      messages: [
        internal({
          to: address, // target
          // to: "0QBTBIv702p5mocP2a7fb_ubIMTRxOcPDNojulE2LILctxkm",
          // to: target_wallet.address,
          value: toNano("0.01"),
          bounce: true,
          // init: target_wallet.init,
        }),
      ],
    });
    console.log(
      "Current deployment wallet balance: ",
      fromNano(balance).toString(),
      "💎TON"
    );
    // console.log("Deploying contract: " + target_wallet.address.toString());
    console.log("=====================================");
    console.log(wallet.init.code.toBoc().toString("hex"));
  };
}