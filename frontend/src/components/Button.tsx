type ButtonProps = {
  clickEvent: () => void;
  hoverEvent: () => void;
};

export default function Button({ clickEvent, hoverEvent }: ButtonProps) {
  return (
    <div>
      <button className="bg-cyan-400" onClick={clickEvent} onMouseOver={hoverEvent}>
        Click here
      </button>
    </div>
  );
}
