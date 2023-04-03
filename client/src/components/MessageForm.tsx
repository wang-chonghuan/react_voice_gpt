import { FieldError, useForm } from 'react-hook-form';
import { ValidationError } from './ValidationError';
import { NewPostData } from '../api/types';

type Props = {
  onSave: (newPost: NewPostData) => void;
};
export function MessageForm({ onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewPostData>();
  const fieldStyle = 'flex flex-col mb-2';
  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border-red-500' : '';
  }
  return (
    <form noValidate className="border-b py-4" onSubmit={handleSubmit(onSave)}>
      {/*<div className={fieldStyle}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'You must enter a title',
          })}
          className={getEditorStyle(errors.name)}
        />
        <ValidationError fieldError={errors.name} />
      </div>*/}
      <div className={fieldStyle}>
        <label htmlFor="message">New Message</label>
        <textarea
          id="message"
          {...register('message', {
            required: 'You must enter the message',
          })}
          className={getEditorStyle(errors.message)}
        />
        <ValidationError fieldError={errors.message} />
      </div>
      <div className={fieldStyle}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-10 px-6 font-semibold bg-black text-white"
        >
          Send
        </button>
        {isSubmitSuccessful && (
          <div role="alert" className="text-green-500 text-xs mt-1">
            The post was successfully saved
          </div>
        )}
      </div>
    </form>
  );
}
