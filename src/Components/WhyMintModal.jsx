import React from "react";
import { Modal } from "@material-ui/core";
import phanatics from "../assets/phanatics.png";

export default function WhyMintModal({ open, onClose }) {
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
          className="flex-col animation-from-bottom w-50 outline-none rounded-lg overflow-hide"
          style={{ maxHeight: "80vh", }}
        >
          <div className="w-full overflow-hide flex flex-center" style={{height: "20rem"}}>
            <img
              className="w-full cover "
              alt="phanatics"
              src={phanatics}
              style={{height: "20rem"}}
            ></img>
          </div>
          <div
            className=" rounded-lg p-lg flex-col scroll-y"
            style={{
              marginTop: "-24px",
              boxShadow: "0 -48px 40px rgba(0,0,0,.4)",
              backgroundColor: "#131416"
            }}
          >
            <h2 className="m-0 mb-md dark" style={{fontSize: "1.5vw"}}>
              Why Mint a Phanatic?
            </h2>
            <span className=" weight-400 mb-lg" style={{fontSize: "1.1vw", color: "#00d9a2" }}>
              {" "}
              Mint a Phanatic via Candy Machine for 0.25 SOL
            </span>

            {/* <span
              className="dark  weight-300 mb-lg"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              We're finally here - Phantasia is dropping its first NFT
              collection - Season 1: the Phanatics - on November 23rd 2021 via
              Candy Machine Mint. A Phanatic will cost only 0.25 SOL, allowing
              easy accessiblility for the whole community. Minting through candy
              machine is easy! Simply follow the url the team will provide on
              twitter and discord the morning of the 23rd, and click the mint
              button to own a badass Phanatic NFT!
            </span> */}
            <h4 className="dark"> Why Mint?</h4>
            <span
              className="dark  weight-300 mb-md"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              There are two important reasons why you should be excited to mint
              a Phanatic.
            </span>
            <span
              className="dark  weight-300 mb-md"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              (1) - Badass Art
            </span>
            <span
              className="dark  weight-300 mb-lg"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              (2) - Unlock tons of in-game utility and improve your skills!
            </span>
            <span
              className="dark  weight-600 mb-md"
              style={{fontSize: "1.1vw", lineHeight: "1.5rem" }}
            >
              Badass Art
            </span>
            <span
              className="dark  weight-300 mb-lg"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              The Phantasia team believes the season 1 art is dope! With exactly
              136 unique traits, there are millions of possible, beautifully
              designed combinations that could be yours.
            </span>
            <span
              className="dark  weight-600 mb-md"
              style={{fontSize: "1.1vw", lineHeight: "1.5rem" }}
            >
              In-Game Utility
            </span>
            <span
              className="dark  weight-300 mb-md"
              style={{fontSize: "1.1vw", lineHeight: "1.5rem" }}
            >
              Want to improve your skill and show off to other fantasy players?
              Mint a Phanatic and unlock the following:
            </span>
            <div className="flex-row space-between-md align-center mb-md">
              <i className="bx bxs-circle success"></i>
              <span className="dark  weight-300">
                AI-backed analytics tools to assist in roster building based on
                expert opinion.
              </span>
            </div>
            <div className="flex-row space-between-md align-center mb-md">
              <i className="bx bxs-circle success"></i>
              <span
                className="dark  weight-300"
                style={{fontSize: "1.1vw", lineHeight: "1.5rem" }}
              >
                Access to exclusive, weekly fantasy content from expert fantasy
                sports analysts. This also includes private discord access to
                ask questions directly to sports analysts.
              </span>
            </div>
            <div className="flex-row space-between-md align-center mb-md">
              <i className="bx bxs-circle success"></i>
              <span className="dark  weight-300">
                Ability to customize your in-game profile with Phantasia NFTs to
                flex your Phanatic
              </span>
            </div>

            <span
              className="dark  weight-300 mb-lg"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              As an added bonus, by minting a Phanatic you will also
              automatically be whitelisted for future Phantasia NFT drops.
            </span>

            <span
              className="dark  weight-300 mb-lg"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              Make sure to mint on November 23rd!{" "}
            </span>

            <span
              className="dark  weight-300 mb-lg"
              style={{ fontSize: "1.1vw",lineHeight: "1.5rem" }}
            >
              ~ Phantasia Team 
            </span>

          </div>
        </div>
      </Modal>
    </>
  );
}
