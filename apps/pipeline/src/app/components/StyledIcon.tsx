import styled from "styled-components";

const StyledIcon = styled.div`
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transform: rotate(45deg);
  ::before,
  ::after {
    position: absolute;
    content: '';
    background-color: ${props => props.theme.color.primary};
  }
`;

export const StyledIconFailure = styled(StyledIcon)`
   {
    background: ${props => props.theme.color.failure};
  }
  ::before {
    width: 3px;
    height: 12px;
    top: 5px;
    left: 10px;
  }
  ::after {
    width: 12px;
    height: 3px;
    top: 10px;
    left: 5px;
  }
`;
export const StyledIconSuccess = styled(StyledIcon)`
   {
    background: ${props => props.theme.color.success};
  }
  :before {
    width: 3px;
    height: 9px;
    top: 6px;
    left: 11px;
  }
  :after {
    width: 3px;
    height: 3px;
    top: 12px;
    left: 8px;
  }
`;
