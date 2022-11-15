import React, { useState } from "react";
import styled from "styled-components/macro";
import ExtraFields from "../ExtraFields";
import axios from "axios";

interface State {
  name: string;
  preparationTime: string;
  type: string;
  slices: string;
  diameter: string;
  spiciness: string;
  breadSlices: string;
}

const Form: React.FC = () => {
  const [state, setState] = useState<State>({
    name: "",
    preparationTime: "",
    type: "",
    slices: "",
    diameter: "",
    spiciness: "",
    breadSlices: "",
  });

  const {
    name,
    preparationTime,
    type,
    slices,
    diameter,
    spiciness,
    breadSlices,
  } = state;

  // const disabledButton = name === '' || preparationTime === ''... ?

  const handleTimeChange = (inputValue: string) => {
    const filtered = inputValue.replace(/\D/g, "");
    let newPreparationTime: string[] = [];
    for (let i = 0; i < filtered.length; i++) {
      if (i === 2) {
        newPreparationTime.push(":");
      }
      if (i === 4) {
        newPreparationTime.push(":");
      }
      newPreparationTime.push(filtered[i]);
    }

    setState({
      ...state,
      preparationTime: newPreparationTime.join("").substring(0, 8),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try catch block?
    if (type === "pizza") {
      const response = await axios.post(
        "https://frosty-wood-6558.getsandbox.com:443/dishes",
        {
          name,
          preparation_time: preparationTime,
          type,
          no_of_slices: Number(slices),
          diameter: Number(diameter),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(JSON.stringify(response.data));
    } else if (type === "soup") {
      const response = await axios.post(
        "https://frosty-wood-6558.getsandbox.com:443/dishes",
        {
          name,
          preparation_time: preparationTime,
          type,
          spiciness_scale: Number(spiciness),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(JSON.stringify(response.data));
    } else {
      const response = await axios.post(
        "https://frosty-wood-6558.getsandbox.com:443/dishes",
        {
          name,
          preparation_time: preparationTime,
          type,
          slices_of_bread: Number(breadSlices),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(JSON.stringify(response.data));
    }
  };

  return (
    <DishForm onSubmit={handleSubmit}>
      <InputWrapper>
        <Label htmlFor="dish-name">Dish name:</Label>
        <Input
          value={name}
          type="text"
          id="dish-name"
          placeholder="dish name"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="preparation-time">Preparation time:</Label>
        <Input
          value={preparationTime}
          type="text"
          id="preparation-time"
          placeholder="00:00:00"
          minLength={8}
          onChange={(e) => handleTimeChange(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="dish-type">Dish type:</Label>
        <Select
          value={type}
          name="dishes"
          id="dish-type"
          onChange={(e) => setState({ ...state, type: e.target.value })}
          required
        >
          <Option value="" disabled hidden>
            Pleace choose dish type...
          </Option>
          <Option value="pizza">Pizza</Option>
          <Option value="soup">Soup</Option>
          <Option value="sandwich">Sandwich</Option>
        </Select>
      </InputWrapper>
      <ExtraFields state={state} setState={setState} />
      <SubmitButton type="submit">Submit order</SubmitButton>
    </DishForm>
  );
};

export default Form;

const DishForm = styled.form`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.125rem;
  white-space: nowrap;
`;

const Input = styled.input`
  height: 32px;
  width: 100%;
  margin-left: auto;
`;

const Select = styled.select`
  height: 32px;
  width: 100%;
`;

const Option = styled.option`
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background: none;
  border: 1px dotted;
  cursor: pointer;
  padding: 8px 0px;
`;
