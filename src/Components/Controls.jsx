export default function Controls({setHowToOpen, setWhyMintOpen}) {
  return (
    <div className="modal-buttons">
      <div
        onClick={() => {
          setHowToOpen(true);
        }}
      >
        How does this work?
      </div>
      <div
        onClick={() => {
          setWhyMintOpen(true);
        }}
      >
        Why Should I Mint?
      </div>
    </div>
  );
}
