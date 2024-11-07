import { marked } from "marked";

interface Props {
  input: string;
  handleToggleExp: () => void;
  previewExp: boolean;
}

export const Previewer: React.FC<Props> = ({
  input,
  handleToggleExp,
  previewExp,
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
    <div className="preview-div">
      <h3>
        HTML Preview
        {previewExp ? collapseIcon : expandIcon}
      </h3>

      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(input) }}
      ></div>
    </div>
  );
};
