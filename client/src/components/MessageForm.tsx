import { FieldError, useForm } from 'react-hook-form';
import { ValidationError } from './ValidationError';
import {MessageBody} from '../api/types';
import Button from "@mui/material/Button";
import {useAppContext} from "../auth/AppContext";
import {ChangeEvent, useEffect, useState} from "react";

type Props = {
  onSave: (sendMsgBody: MessageBody) => void;
};
export function MessageForm({ onSave }: Props) {
  const {prompt} = useAppContext();
  const {
    register,
    handleSubmit,
    reset, // 获取 reset 方法
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MessageBody>();

  const [textAreaValue, setTextAreaValue] = useState(prompt);

  useEffect(() => {
    setTextAreaValue(prompt);
  }, [prompt]);

  const { onChange: onRegisterChange, ...registerProps } = register('content', {
    required: 'You must enter the message',
  });

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onRegisterChange(e);
    setTextAreaValue(e.target.value);
  };

  const fieldStyle = 'flex flex-col mb-2';

  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border-red-500' : '';
  }

  const onSubmit = async (data: MessageBody) => {
    await onSave(data);
    reset(); // 提交表单后重置表单
  };

  return (
    <form noValidate className="border-b py-0 my-0" onSubmit={handleSubmit(onSubmit)}>
      <div className={fieldStyle}>
        <textarea
          id="content"
          value={textAreaValue}
          onChange={handleTextareaChange}
          {...registerProps}
          className={getEditorStyle(errors.content)}
        />
        <ValidationError fieldError={errors.content} />
      </div>
      <div className={fieldStyle}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          Send
        </button>
        {/*isSubmitSuccessful && (
          <div role="alert" className="text-green-500 text-xs mt-1">
            The message was successfully sent
          </div>
        )*/}
      </div>
    </form>
  );
}
