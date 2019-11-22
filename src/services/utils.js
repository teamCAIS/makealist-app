export const validate = (
  email,
  password = null,
  passwordConfirmation = null,
) => {
  const EmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailIsValid = EmailValidation.test(email);

  let result = {
    email: emailIsValid,
  };

  if (password !== null) {
    const passwordIsValid = password.length >= 8 ? true : false;
    result = {
      ...result,
      password: passwordIsValid,
    };
  }

  if (passwordConfirmation !== null) {
    const passwordsAreEqual = password === passwordConfirmation ? true : false;
    result = {
      ...result,
      passwordConfirmation: passwordsAreEqual,
    };
  }

  return result;
};
