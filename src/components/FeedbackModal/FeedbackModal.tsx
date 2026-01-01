import { ErrorMessage, Field, Form, Formik } from "formik";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
import css from "./FeedbackModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFeedback } from "../../services/fetch-feedbacks";

export interface FeedBackProps {
  name: string;
  rating: number;
  descr: string;
}

const initialValues: FeedBackProps = {
  name: "",
  rating: 0,
  descr: "",
};

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  rating: Yup.number()
    .min(0.1, "Please rate")
    .max(5, "Max rating is 5")
    .required("Required"),
  descr: Yup.string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Content is too long")
    .required("Required"),
});

interface Props {
  onClose: () => void;
}

export default function FeedbackModal({ onClose }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: FeedBackProps) => postFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      onClose();
    },
  });

  return (
    <>
      <h2 className={css["title"]}>Submit feedback</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          mutate(values);
        }}
        validationSchema={Schema}
      >
        {({ setFieldValue, values }) => (
          <Form className={css["form"]}>
            <div className={css["rating-wrapper"]}>
              <label htmlFor="name">
                Name
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Emily"
                  className={css["userName"]}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css["error"]}
                />
              </label>

              <label htmlFor="descr">
                Message
                <Field
                  as="textarea"
                  id="descr"
                  rows={8}
                  name="descr"
                  placeholder="Type your message..."
                  className={css["content"]}
                />
                <ErrorMessage
                  name="descr"
                  component="span"
                  className={css["error"]}
                />
              </label>

              <Rating
                initialValue={values.rating}
                readonly={false}
                allowFraction={true}
                size={32}
                fillColor="#764191"
                emptyColor="#fff"
                onClick={(rate: number) => setFieldValue("rating", rate)}
              />
              <ErrorMessage
                name="rating"
                component="span"
                className={css["error"]}
              />
            </div>
            <div className={css["btn-container"]}>
              <button type="submit" className={css["btn"]}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
