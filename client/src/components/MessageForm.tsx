import {FieldError, useForm} from 'react-hook-form';
import {ValidationError} from './ValidationError';
import {MessageBody} from '../api/types';
import {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../store/store";
import {updatePromptAction} from "../store/promptSlice";
import AutoResizeTextarea from "../samples/AutoResizeTextarea";

type Props = {
  onSave: (sendMsgBody: MessageBody) => void;
};

export function MessageForm({onSave}: Props) {
  const prompt = useSelector((state: RootState) => state.prompt.prompt);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset, // 获取 reset 方法
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<MessageBody>();

  const [textAreaValue, setTextAreaValue] = useState(prompt);

  useEffect(() => {
    setTextAreaValue(prompt);
  }, [prompt]);

  const {onChange: onRegisterChange, ...registerProps} = register('content', {
    required: 'You must enter the message',
  });

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onRegisterChange(e);
    setTextAreaValue(e.target.value);
  };

  const onSubmit = async (data: MessageBody) => {
    await onSave(data);
    dispatch(updatePromptAction(""));
    setTextAreaValue("");
    reset(); // 提交表单后重置表单
  };

  return (
    <form noValidate className="border-b py-0 my-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row mb-2 mt-2 justify-evenly space-x-2 mr-1 w-full items-center px-1">
        <label className="swap">
          <input type="checkbox" className="hidden"/>
          <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48"
               viewBox="0 0 24 24">
            <path
              d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
          </svg>
          <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48"
               viewBox="0 0 24 24">
            <path
              d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/>
          </svg>
        </label>
        <textarea
          id="content"
          value={textAreaValue}
          onChange={handleTextareaChange}
          {...registerProps}
          className="flex-grow h-12"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary h-12 mr-2"
        >
          Send
        </button>
      </div>
    </form>
  );

}
