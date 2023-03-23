import { FormInputLabel, Input, Group } from "./form-input.styles";
import { InputHTMLAttributes, FC } from "react";

type FormInputProps = {
  label: string; 

} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(otherProps.value) && typeof otherProps.value === 'string' && otherProps.value.length > 0}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;