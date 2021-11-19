import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { Grid } from "@material-ui/core";
import phantasia_logo from "./assets/phantasia.svg";
import solana_circle from "./assets/solana-circle.svg";

import Controls from "./Components/Controls";
import Gallery from "./Components/Gallery";
import HelpModal from "./Components/HelpModal";
import Timer from "./Components/Timer";
import Title from "./Components/Title";
import WhyMintModal from "./Components/WhyMintModal";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";
import Wallet from "./Components/Wallet";

const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintButton = styled(Button)`
font-size: 1.6vw;
font-weight: 700;
background-color: #9662ff;
border-radius: 8px;
box-shadow:  rgba(192, 161, 255, 0.2) 0px 20px 25px -5px,
    rgba(192, 161, 255, 0.08) 0px 10px 10px -5px;
    width: 100%;
    color: white;
    font-family: Poppins;
    text-align: center;
    display: flex;
    justify-content:center;
}`; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [howToOpen, setHowToOpen] = useState(false);
  const [whyMintOpen, setWhyMintOpen] = useState(false);

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  console.log(wallet);

  return (
    <div className="">
      {/* <HomePageComponent/> */}
      <div className="container-view relative blob-bg">
        <HelpModal open={howToOpen} onClose={() => setHowToOpen(false)} />
        <WhyMintModal
          open={whyMintOpen}
          onClose={() => setWhyMintOpen(false)}
        />

        <div className="bg-blurred-overlay"></div>
        <div className="stripe-svg stripe-pattern-container"></div>
        <Grid container className="h-full w-full">
          <Grid
            item
            xs={6}
            className="test-border min-h-full"
            style={{ paddingRight: "7%", paddingLeft: "7%" }}
          >
            <div className="h-full w-full relative flex-col">
              <Controls
                setHowToOpen={setHowToOpen}
                setWhyMintOpen={setWhyMintOpen}
              />
              {/* <Timer /> */}
              <Title />

              <div className="flex-grow"></div>
              <div style={{ marginBottom: "7vh" }}>{!wallet && <Wallet />}</div>
              {wallet && (
                <div style={{ marginBottom: "7vh" }}>
                  <div className="flex-col mb-md">
                    {wallet && (
                      <span
                        className="white weight-500"
                        style={{ fontSize: "1.2vw" }}
                      >
                        Connected to wallet{" "}
                        {shortenAddress(wallet.publicKey.toBase58() || "")}
                      </span>
                    )}
                  </div>

                  <div className="flex-row align-center mb-lg">
                    <img src={solana_circle} className="h-2 w-2" alt="sol" />
                    <span
                      className="white weight-400 px-md"
                      style={{ fontSize: "1.1vw" }}
                    >
                      Balance: {(balance || 0).toLocaleString()} SOL
                    </span>
                  </div>
                  <MintButton
                    disabled={isSoldOut || isMinting || !isActive}
                    onClick={onMint}
                    variant="contained"
                  >
                    {isSoldOut ? (
                      "SOLD OUT"
                    ) : isActive ? (
                      isMinting ? (
                        <CircularProgress />
                      ) : (
                        "MINT for 0.25 SOL"
                      )
                    ) : (
                      <Countdown
                        date={startDate}
                        onMount={({ completed }) =>
                          completed && setIsActive(true)
                        }
                        onComplete={() => setIsActive(true)}
                        renderer={renderCounter}
                      />
                    )}
                  </MintButton>
                  <br/>
                  <div className="flex-row w-full">
                    <div
                      className="w-33 flex flex-center gray"
                      style={{ fontSize: "1.0vw" }}
                    >
                      Collection Total
                    </div>
                    <div
                      className="w-33 flex flex-center gray"
                      style={{ fontSize: "1.0vw" }}
                    >
                      Phanatics Redeemed
                    </div>
                    <div
                      className="w-33 flex flex-center gray"
                      style={{ fontSize: "1.0vw" }}
                    >
                      Phanatics Remaining
                    </div>
                  </div>
                  <div className="flex-row w-full mb-lg">
                    <div
                      className="w-33 flex flex-center white weight-600"
                      style={{ fontSize: "2vw" }}
                    >
                      {itemsAvailable}
                    </div>
                    <div
                      className="w-33 flex flex-center white weight-600"
                      style={{ fontSize: "2vw" }}
                    >
                      {itemsRedeemed}
                    </div>
                    <div
                      className="w-33 flex flex-center white weight-600"
                      style={{ fontSize: "2vw" }}
                    >
                      {itemsRemaining}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Grid>

          <Grid item xs={6} className="test-border">
            <Gallery />
          </Grid>
          {/* *********************** END NFT CARD SECTION */}
        </Grid>

        <div className="social-links flex-row space-between-lg flex align-center">
          <span className="link white font-md weight-400 cursor-pointer">
            <a
              href="https://t.co/Vskz9PkBBC?amp=1"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </span>
          <span className="link white font-md weight-400 cursor-pointer">
            <a
              href="https://twitter.com/PhantasiaSports"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </span>
          <img className="w-1" src={phantasia_logo} alt="logo"></img>
        </div>
      </div>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
