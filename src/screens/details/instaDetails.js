import { Layout } from "../components";
import { CopyBlock, dracula } from "react-code-blocks";
import styled from "styled-components";
import createAccount from "./instaDetails/createAccount";
import logIn from "./instaDetails/logIn";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailsLayout = styled(Layout)`
  width: 1000px;
`;
const H3 = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
`;
const TitleDiv = styled.div`
  display: flex;
  align-items: center;
`;
const H5 = styled.h5`
  font-size: 20px;
`;
const GitSpan = styled.span``;
const GitLink = styled.div`
  display: flex;
  align-items: center;
`;
const Contents = styled.div`
  margin-bottom: 50px;
  margin-top: 50px;
`;

export default function InstaDetails() {
  return (
    <DetailsLayout>
      <div>
        <TitleDiv>
          <H3>Details</H3>
          <span>
            (글자수를 최소화하기위해 음씀체를 사용하였습니다. 양해부탁드려요😊)
          </span>
        </TitleDiv>
        <Contents>
          <H5>유저 생성</H5>
          <a
            href={
              "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/createAccount/createAccount.resolvers.ts"
            }
          >
            <GitLink>
              <FontAwesomeIcon
                icon={faSquareGithub}
                color="black"
                style={{ fontSize: 25, margin: 10 }}
              />
              <GitSpan>
                https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/createAccount/createAccount.resolvers.ts
              </GitSpan>
            </GitLink>
          </a>
          <CopyBlock
            language={"typescript"}
            text={createAccount}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </Contents>
        <Contents>
          <H5>로그인</H5>
          <a
            href={
              "https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/createAccount/createAccount.resolvers.ts"
            }
          >
            <GitLink>
              <FontAwesomeIcon
                icon={faSquareGithub}
                color="black"
                style={{ fontSize: 25, margin: 10 }}
              />
              <GitSpan>
                https://github.com/Mason3144/insta-clone-backend/blob/master/src/users/createAccount/createAccount.resolvers.ts
              </GitSpan>
            </GitLink>
          </a>
          <CopyBlock
            language={"typescript"}
            text={logIn}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </Contents>
      </div>
    </DetailsLayout>
  );
}
