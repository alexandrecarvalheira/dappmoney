import styled from "styled-components";

export const FactoryContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const FactoryTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

interface PermissionHighLightProps {
  variant: "admin" | "user" | undefined;
}

export const PermissionHighLight = styled.span<PermissionHighLightProps>`
  border: 1.5px solid;
  border-color: ${(props) => (props.variant === "user" ? "green" : "red")};
  border-radius: 6px;
  padding: 5px;
`;
