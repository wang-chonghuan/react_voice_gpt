import { FieldError, useForm } from 'react-hook-form';
import { ValidationError } from './ValidationError';
import {MessageBody} from '../api/types';
import Button from "@mui/material/Button";

type Props = {
  onSave: (sendMsgBody: MessageBody) => void;
};
export function MessageForm({ onSave }: Props) {

  const {
    register,
    handleSubmit,
    reset, // 获取 reset 方法
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MessageBody>();

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
          {...register('content', {
            required: 'You must enter the message',
          })}
          className={getEditorStyle(errors.content)}
        />
        <ValidationError fieldError={errors.content} />
      </div>
      <div className={fieldStyle}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-10 px-6 font-semibold bg-black text-white w-full"
        >
          Send
        </Button>
        {/*isSubmitSuccessful && (
          <div role="alert" className="text-green-500 text-xs mt-1">
            The message was successfully sent
          </div>
        )*/}
      </div>
    </form>
  );
}
