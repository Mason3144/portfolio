import { CopyBlock, dracula } from "react-code-blocks";
import styled from "styled-components";

export default function SqlForm({
  title,
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
}) {
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
      {text4 ? (
        <div>
          <br />
          <CopyBlock
            language={"sql"}
            text={text4}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : null}
      {text5 ? (
        <div>
          <br />
          <CopyBlock
            language={"sql"}
            text={text5}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : null}
      {text6 ? (
        <div>
          <br />
          <CopyBlock
            language={"sql"}
            text={text6}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : null}
      {text7 ? (
        <div>
          <br />
          <CopyBlock
            language={"sql"}
            text={text7}
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
