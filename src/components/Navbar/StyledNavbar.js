import styled from "styled-components";

export const StyledNavbar = styled.section``;

export const Search = styled.section`
  position: "relative";
  border-radius: 4px;
  background: transparent;
  :hover {
    background: ${({ theme }) => theme.COLORS.DARK_BACKGROUND};
  }
  margin-right: 1rem;
  margin-left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
`;

export const SearchIconWrapper = styled.section`
  padding: 0 1rem;
  height: "100%";
  position: "absolute";
  pointer-events: "none";
  display: "flex";
  align-items: "center";
  justify-content: "center";
`;

// export const StyledInputBase = styled.section`
//   color: "inherit";
//   .MuiInputBase-input {
//     padding: 1rem;
//     // vertical padding + font size from searchIcon
//     padding-left: calc(1em + 2rem);
//     /* transition: theme.transitions.create("width"); */
//     width: "100%";
//     /* [theme.breakpoints.up("md")]: {
//       width: "20ch";
//     }; */
//   }
// `;
