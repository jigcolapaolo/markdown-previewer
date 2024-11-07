interface Props {
  input: string;
  handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleToggleExp: () => void;
  editorExp: boolean;
}

export const Editor: React.FC<Props> = ({
  input,
  handleInput,
  handleToggleExp,
  editorExp,
}) => {
  const expandIcon = (
    <i className="fa-solid fa-up-down" onClick={handleToggleExp}></i>
  );
  const collapseIcon = (
    <i
      className="fa-solid fa-down-left-and-up-right-to-center"
      onClick={handleToggleExp}
    ></i>
  );

  return (
    <div className="editor-div">
      <h3>
        Markdown Editor
        {editorExp ? collapseIcon : expandIcon}
      </h3>
      <textarea
        style={{ minHeight: editorExp ? "90vh" : "150px" }}
        id="editor"
        value={input}
        onChange={handleInput}
      />
    </div>
  );
};
