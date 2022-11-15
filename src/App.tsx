import React from "react";
import styled from "styled-components/macro";
import Form from "./components/Form";

function App() {
  return (
    <FormWrapper>
      <Form />
    </FormWrapper>
  );
}

export default App;

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
