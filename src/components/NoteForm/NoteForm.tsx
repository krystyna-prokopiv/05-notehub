import css from "./NoteForm.module.css";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useId } from "react";
import type { Note } from "../../types/note";
import { createNote } from '../../services/noteService'
import { useQueryClient } from "@tanstack/react-query";

type NoteFormValues = Omit<Note, "id">;
const Values: NoteFormValues= {
  title: "",
  tag: "Todo",
  content: "",
  createdAt: "",
  updatedAt: "",
};
interface NoteFormProps {
  onClose: () => void;
}


export default function NoteForm({ onClose }: NoteFormProps) {
   const fieldId = useId();
  const queryClient = useQueryClient();
  
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Too long"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Tag is required"),
  });

    const mutation = useMutation({
        mutationFn: (values: NoteFormValues) => createNote(values)  ,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']})
        }
    })

  const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
      mutation.mutate(values, {
          onSuccess:()=> {
              actions.resetForm()
              onClose()
          }
      })
  };
  
  return (
    <Formik
      initialValues={Values}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
    >
      <Form className={css.form}>
        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} component="span" />
        </fieldset>

        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </fieldset>

        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </fieldset>

        <fieldset className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}
