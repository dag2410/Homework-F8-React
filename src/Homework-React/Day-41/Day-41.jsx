import { useState } from "react";

const genders = [
  {
    title: "Male",
    value: "male",
  },
  {
    title: "Female",
    value: "female",
  },
];

const courses = [
  {
    title: "HTML",
    value: "html",
  },
  {
    title: "CSS",
    value: "css",
  },
  {
    title: "JavaScript",
    value: "javascript",
  },
];

function Day41() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    courses: [],
  });

  const setFieldValue = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formValues);

    // fetch('URL', {method: 'POST', body: JSON.stringify(formValues) })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {genders.map((gender) => (
          <label key={gender.value}>
            <input
              type="radio"
              name="gender"
              value={gender.value}
              checked={gender.value === formValues.gender}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  gender: gender.value,
                });
              }}
            />
            {gender.title}
          </label>
        ))}
      </div>
      <div>
        {courses.map((course) => {
          const isChecked = formValues.courses.includes(course.value);
          return (
            <label key={course.value}>
              <input
                type="checkbox"
                name="courses"
                value={course.value}
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    setFormValues({
                      ...formValues,
                      courses: formValues.courses.filter((c) => c !== course.value),
                    });
                  } else {
                    setFormValues({
                      ...formValues,
                      courses: [...formValues.courses, course.value],
                    });
                  }
                }}
              />
              {course.title}
            </label>
          );
        })}
      </div>
      <div>
        <input type="text" value={formValues.firstName} placeholder="Enter first name..." name="firstName" onChange={setFieldValue} />
      </div>
      <div>
        <input type="text" value={formValues.lastName} placeholder="Enter last name..." name="lastName" onChange={setFieldValue} />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default Day41;
