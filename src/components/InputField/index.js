import { Input } from "@mui/material";

import StyledInputField from "./StyledInputField";

function InputField({
  placeholder,
  required = false,
  type = "text",
  value,
  onChange,
  error,
  name,
}) {
  return (
    <StyledInputField>
      <Input
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        name={name}
      />
    </StyledInputField>
  );
}

export default InputField;
