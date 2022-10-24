import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyBlock, dracula } from "react-code-blocks";
import styled from "styled-components";

export default function ContentsForm({
  title,
  url1,
  url2,
  url3,
  text1,
  text2,
  text3,
  capture1,
}) {
  const H5 = styled.h5`
    font-size: 30px;
  `;
  const GitSpan = styled.span``;
  const GitLink = styled.div`
    display: flex;
    align-items: center;
  `;
  const Contents = styled.div`
    margin-bottom: 50px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  `;
  const Img = styled.img`
    margin: 0 auto;
    padding: 10px;
  `;
  return (
    <Contents>
      <a name={title} href>
        {" "}
      </a>
      <H5>{title}</H5>
      <a href={url1}>
        <GitLink>
          <FontAwesomeIcon
            icon={faSquareGithub}
            color="black"
            style={{ fontSize: 25, margin: 10 }}
          />
          <GitSpan>{url1}</GitSpan>
        </GitLink>
      </a>
      <CopyBlock
        language={"typescript"}
        text={text1}
        showLineNumbers={false}
        theme={dracula}
        wrapLines={true}
        codeBlock
      />
      {capture1 ? <Img src={capture1} /> : null}
      {text2 && url2 ? (
        <div>
          <br />
          <a href={url2}>
            <GitLink>
              <FontAwesomeIcon
                icon={faSquareGithub}
                color="black"
                style={{ fontSize: 25, margin: 10 }}
              />
              <GitSpan>{url2}</GitSpan>
            </GitLink>
          </a>
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
      {text3 && url3 ? (
        <div>
          <br />
          <a href={url3}>
            <GitLink>
              <FontAwesomeIcon
                icon={faSquareGithub}
                color="black"
                style={{ fontSize: 25, margin: 10 }}
              />
              <GitSpan>{url3}</GitSpan>
            </GitLink>
          </a>
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
    </Contents>
  );
}
