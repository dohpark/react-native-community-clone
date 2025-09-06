import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordConfirmInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}
