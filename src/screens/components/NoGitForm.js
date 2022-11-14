import { CopyBlock, dracula } from "react-code-blocks";
import styled from "styled-components";

export default function NoGitForm({ title, text1, text2, text3, text4 }) {
  const H5 = styled.h5`
    font-size: 30px;
  `;

  const Contents = styled.div`
    margin-bottom: 50px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  `;

  return (
    <Contents>
      <a name={title} href>
        {" "}
      </a>
      <H5>{title}</H5>
      <div>
        <br />
        <CopyBlock
          language={"typescript"}
          text={text1}
          showLineNumbers={false}
          theme={dracula}
          wrapLines={true}
          codeBlock
        />
      </div>
      {text2 ? (
        <div>
          <br />
          <CopyBlock
            language={"typescript"}
            text={text2}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : null}
      {text3 ? (
        <div>
          <br />
          <CopyBlock
            language={"typescript"}
            text={text3}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : null}
      {text4 ? (
        <div>
          <br />
          <CopyBlock
            language={"typescript"}
            text={text4}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : null}
    </Contents>
  );
}
