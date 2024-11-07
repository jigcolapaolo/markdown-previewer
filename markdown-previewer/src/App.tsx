import { useState } from "react";
import "./styles/_app.scss";
import { marked } from "marked";
import { Editor } from "./components/Editor";
import { Previewer } from "./components/Previewer";

marked.setOptions({
  breaks: true,
});

const defaultInput: string = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

export const App = () => {
  const [input, setInput] = useState(defaultInput);
  const [editorExp, setEditorExp] = useState(false);
  const [previewExp, setPreviewExp] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setInput(value);
  };

  const handleToggleExp = (fromEditor: boolean) => {
    if (fromEditor) {
      setEditorExp(prevState => !prevState);
    } else {
      setPreviewExp(prevState => !prevState);
    }
  };

  return (
    <div className="app-div">
      {!previewExp ? (
        <Editor
          input={input}
          handleInput={handleInput}
          handleToggleExp={() => handleToggleExp(true)}
          editorExp={editorExp}
        />
      ) : null}
      {!editorExp ? (
        <Previewer
          input={input}
          handleToggleExp={() => handleToggleExp(false)}
          previewExp={previewExp}
        />
      ) : null}
    </div>
  );
};
