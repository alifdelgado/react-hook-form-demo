import { useForm } from "react-hook-form";

const App = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        className="flex flex-col w-5/12 border p-5 rounded shadow space-y-3"
        onSubmit={onSubmit}
      >
        <div className="w-full">
          <label>Name</label>
          <input
            type="text"
            className="w-full p-2 rounded text-gray-800"
            {...register("name", {
              required: { value: true, message: "Name is required" },
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 10,
                message: "Name must be at most 10 characters",
              },
            })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="w-full">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
            className="w-full p-2 rounded text-gray-800"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 rounded text-gray-800"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>Confirm password</label>
          <input
            type="password"
            {...register("password_confirm", {
              required: {
                value: true,
                message: "Please confirm your password",
              },
              validate: (value) => {
                return value === watch("password") || "Passwords do not match";
              },
            })}
            className="w-full p-2 rounded text-gray-800"
          />
          {errors.password_confirm && (
            <p className="text-red-600">{errors.password_confirm.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>Birth date</label>
          <input
            type="date"
            {...register("birth_date", {
              required: { value: true, message: "Birth date is required" },
              validate: (value) => {
                const birthDate = new Date(value);
                const currentYear = new Date();
                const age = currentYear.getFullYear() - birthDate.getFullYear();
                return age >= 18 ? true : "Must be at least 18 years old";
              },
            })}
            className="w-full p-2 rounded text-gray-800"
          />
          {errors.birth_date && (
            <p className="text-red-600">{errors.birth_date.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>Country</label>
          <select
            className="w-full p-2 rounded text-gray-800"
            {...register("country", { required: true })}
          >
            <option value="1">México</option>
            <option value="2">Colombia</option>
            <option value="3">Argentina</option>
          </select>
          {watch("country") === "3" && (
            <>
              <input
                type="text"
                className="w-full p-2 rounded text-gray-800 my-2"
                placeholder="Province"
                {...register("province", {
                  required: { value: true, message: "Province is required" },
                })}
              />
              {errors.province && (
                <p className="text-red-600">{errors.province.message}</p>
              )}
            </>
          )}
          {errors.country && (
            <p className="text-red-600">{errors.country.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>Profile photo</label>
          <input
            type="file"
            onChange={(e) => setValue("photo", e.target.files[0])}
            {...register("photo", { required: true })}
            className="w-full p-2 rounded text-gray-800"
          />
          {errors.file && <p className="text-red-600">{errors.file.message}</p>}
        </div>
        <div className="w-full space-x-3">
          <label>Accept terms and conditions</label>
          <input type="checkbox" {...register("terms", { required: true })} />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full p-2 rounded bg-indigo-600 text-white hover:bg-indigo-800"
          >
            Save
          </button>
        </div>
        {JSON.stringify(watch(), null, 2)}
      </form>
    </div>
  );
};

export default App;
