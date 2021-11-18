import React from "react";
import { Modal } from "@material-ui/core";
import "../styles/styles.css";
import "../styles/base.css";

export default function HelpModal({ open, onClose }) {
  return (
    <>
      <Modal
        open={Boolean(open)}
        onClose={onClose}
        className="flex flex-col flex-center modal"
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div
          className="flex-col animation-from-bottom w-12 outline-none rounded-lg overflow-hide p-lg"
          style={{ maxHeight: "80vh", backgroundColor: "#131416" }}
        >
          <div className="flex-col">
            <h2 className="mb-lg">What is happening here?</h2>
            <span
              className="weight-500 mb-lg"
              style={{ color: "#00d9a2", fontSize: "1.2vw" }}
            >
              Welcome to the very first Phantasia NFT Drop - Season 1: The
              Phanatics.
            </span>
            <span
              className="font-md dark weight-300 mb-lg"
              style={{ lineHeight: "1.5rem", fontSize: "1.2vw" }}
            >
              In case you are new, Phantasia is the world's first play-to-earn
              daily fantasy sports platform powered by the Mainnet Solana
              Blockchain. With Phantasia, you can enter free daily NBA and NFL
              fantasy sports contests to win real prizes!
            </span>
            <span
              className="font-md dark weight-300 mb-lg"
              style={{ lineHeight: "1.5rem", fontSize: "1.2vw" }}
            >
              Although a Phanatic NFT is <b>NOT</b> required to play, it does
              unlock some helpful, exclusive features that could bring your
              fantasy sports skill to the next level. In addition, Phantasia
              only allows personal profile customization if you own a Phanatic
              or other Phantasia vanity NFTs. If you want to stand out on
              leaderboards with your badass profile, make sure you mint a
              Phanatic - <b>they're only .25 SOL!</b>
            </span>
            <span
              className="font-md dark weight-300"
              style={{ lineHeight: "1.5rem", fontSize: "1.2vw" }}
            >
              Minting is easy - simply connect a Solana wallet with at least
              0.25 SOL, click the mint button on the main screen and you'll
              receive a Phanatic in your wallet in exchange for 0.25 SOL (~
              $50). If all Pahantics are sold out, SOL will not be taken from
              your wallet.
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
