import {FieldError, useForm} from "react-hook-form";
import {ValidationError} from "./ValidationError";
import {NewPostData} from "./types";

type Props = {
  onSave: (newPost: NewPostData) => void;
};

export function NewPostForm({onSave}: Props) {
  const {
    register, handleSubmit, formState: {errors, isSubmitting, isSubmitSuccessful}
  } = useForm<NewPostData>();

  const fieldStyle = 'flex flex-col mb-2';

  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border-red-500' : '';
  }

  return (
    <form noValidate className="border-b py-4" onSubmit={handleSubmit(onSave)}>
      {/*<div className={fieldStyle}>
        <label htmlFor="title">Title</label>
        <input type="text"
               id="title"
               className={getEditorStyle(errors.title)}
               {...register('title', {
                 required: 'You must enter a title'
               })}
        />
        <ValidationError fieldError={errors.title}/>
      </div>*/}
      <div className={fieldStyle}>
        <label htmlFor="description">New Message</label>
        <textarea
          id="description"
          className={getEditorStyle(errors.message)}
          {...register('message', {
            required: 'You must enter the message'
          })}
        />
        <ValidationError fieldError={errors.message}/>
      </div>
      <div className={fieldStyle}>
        <button type="submit"
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

