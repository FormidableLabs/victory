import styled from "styled-components";

export default styled.span`
  display: block;
  transition: all 0.1s;
  transform: ${(props) =>
    props['data-bouncing'] === "true" ? "translateY(-0.6rem)" : "translateY(0)"};
`;
