import React from "react";
import styled from "styled-components/macro";

interface State {
  name: string;
  preparationTime: string;
  type: string;
  slices: string;
  diameter: string;
  spiciness: string;
  breadSlices: string;
}

interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

const ExtraFields: React.FC<Props> = ({ state, setState }) => {
  const { slices, diameter, spiciness, breadSlices } = state;
  return (
    <>
      {state.type === "pizza" ? (
        <>
          <InputWrapper>
            <Label htmlFor="number-of-slices">Number of slices (4-16):</Label>
            <Input
              type="number"
              id="number-of-slices"
              min={4}
              max={16}
              value={slices}
              onChange={(e) => setState({ ...state, slices: e.target.value })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="diameter">Diameter (24-70):</Label>
            <Input
              type="number"
              id="diameter"
              min={24}
              max={70}
              value={diameter}
              onChange={(e) => setState({ ...state, diameter: e.target.value })}
            />
          </InputWrapper>
        </>
      ) : null}
      {state.type === "soup" ? (
        <InputWrapper>
          <Label htmlFor="spiciness-scale">Spiciness scale (1-10):</Label>
          <Input
            type="number"
            id="spiciness_scale"
            min={1}
            max={10}
            value={spiciness}
            onChange={(e) => setState({ ...state, spiciness: e.target.value })}
          />
        </InputWrapper>
      ) : null}
      {state.type === "sandwich" ? (
        <InputWrapper>
          <Label htmlFor="slices-of-bread">Slices of bread (1-15):</Label>
          <Input
            type="number"
            id="slices-of-bread"
            min={1}
            max={15}
            value={breadSlices}
            onChange={(e) =>
              setState({ ...state, breadSlices: e.target.value })
            }
          />
        </InputWrapper>
      ) : null}
    </>
  );
};

export default ExtraFields;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Label = styled.label`
  white-space: nowrap;
  font-size: 1.125rem;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
`;
