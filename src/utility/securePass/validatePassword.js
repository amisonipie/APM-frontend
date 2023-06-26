import passwordValidator from "password-validator";

export const validatePassword = ({
  value,
  min,
  max,
  uppercase,
  lowercase,
  digits,
  includes,
  notIncludes,
  not,
  isEmail,
}) => {
  const schema = new passwordValidator();

  //   / Add properties to it
  if (min) {
    schema.is().min(min);
  }

  if (max) {
    schema.is().max(max);
  }

  if (uppercase) {
    schema.has().uppercase(uppercase);
  }

  if (lowercase) {
    schema.has().lowercase(lowercase);
  }

  if (digits) {
    schema.has().digits(digits);
  }

  if (notIncludes) {
    schema.is().not().oneOf(notIncludes); // Blacklist these values
  }
  if (isEmail && value !== "") {
    schema.has(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address!",
    );
  }
  if (includes) {
    schema.is().oneOf(includes?.value, includes?.message); // Blacklist these values
  }
  if (not) {
    schema
      .is()
      .not()
      .oneOf(["undefined", "null", null, ""], "This field is required!");
  }

  return schema.validate(value, { details: true });
};
export const VF = {
  validateFields: validatePassword,
};

export const validatePassword1 = (password) => {
  // Do not show anything when the length of password is zero.
  const validPasswordLength = password.length > 7 && password.length <= 10;
  let isValid = false;

  // Create an array and push all possible values that you want in password
  const matchedCase = new Array();
  matchedCase.push("[$@$!%*#?&]"); // Special Charector
  matchedCase.push("[A-Z]"); // Uppercase Alpabates
  matchedCase.push("[a-z]"); // Lowercase Alphabates
  matchedCase.push("[0-9]"); // Numbers

  // Check the conditions
  let ctr = 0;
  for (let i = 0; i < matchedCase.length; i++) {
    if (new RegExp(matchedCase[i]).test(password)) {
      ctr++;
    }
  }
  // getting stats it
  let { color, strength } = getColor(ctr);

  if (!validPasswordLength) {
    strength = "Password length should be between 8 to 10 characters";
    color = "red";
  }

  if (ctr === 4 && validPasswordLength) {
    isValid = true;
  }
  return { color, strength, isValid };
};

export const getColor = (value) => {
  switch (value) {
  case 0:
  case 1:
  case 2:
    return {
      strength:
          "Very Weak - Password should contain lowercase, uppercase, number and a special character!",
      color: "red",
    };
  case 3:
    return {
      strength:
          "Medium - Password should contain lowercase, uppercase, number and a special character!",
      color: "orange",
    };
  case 4:
    return { strength: "Strong password!", color: "green" };
  default:
    return { strength: "This field is required!", color: "" };
  }
};

export const validatePassword2 = (password) => {
  // JavaScript declaration
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
  );
  // use for JavaScript
  return strongRegex.test(password);
};
