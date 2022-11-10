import { CopyBlock, dracula } from "react-code-blocks";
import styled from "styled-components";

export default function SqlForm({ title, text1, text2, text3 }) {
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
          language={"sql"}
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
            language={"sql"}
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
            language={"sql"}
            text={text3}
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
