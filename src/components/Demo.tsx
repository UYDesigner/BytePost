import { useForm } from "react-hook-form";
import RTE from './RTE'

export default function CreatePost () {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Blog data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RTE name="content" control={control} label="Post Content" />
      <button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};
