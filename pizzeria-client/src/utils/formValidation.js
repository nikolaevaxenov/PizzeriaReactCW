export const emailValidation = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const nameValidation = (name) => {
  const nameRegex = /^([A-ZА-Я][a-zа-я]*)$/;
  return nameRegex.test(name);
};

export const passwordValidation = (pass) => {
  const passRegex = /(?=^.{8,33}$)(?=.*\d)(?![.\n])(?=.*[a-z]).*$/;
  return passRegex.test(pass);
};
