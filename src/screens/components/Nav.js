import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBox = styled.div`
  /* padding: 20px; */
  position: fixed;
  top: 20%;
  left: 15%;
  background-color: rgb(34, 34, 34);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  /* width: 60px; */
`;
const Layer = styled.div`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 5px 0 5px 0;
`;
const H3 = styled.h3`
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: 800;
  text-decoration: none;
`;

const Span = styled.span`
  color: white;
  font-size: 13px;
  text-decoration: none;
  text-align: center;
`;
const Div = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default function Nav() {
  return (
    <NavBox>
      <Link to={"/"}>
        <FontAwesomeIcon
          icon={faHomeAlt}
          color="white"
          style={{ fontSize: 35, margin: 10 }}
        />
      </Link>
      <Layer />
      <Link
        to={"/portfolios"}
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Div>
          <H3>Port</H3>
          <Span style={{ fontWeight: "bold" }}>folios</Span>
          {/* <Span style={{ fontWeight: "bold" }}>Portfolios</Span> */}
        </Div>
      </Link>
    </NavBox>
  );
}
