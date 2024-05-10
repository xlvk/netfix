import Cookies from "js-cookie";

export const SetCookies = (data) => {
  Cookies.set("cookie-token", data.cookie_token);
  // set user data
  Cookies.set("user-name", data.user.username);
  Cookies.set("email", data.user.email);
  Cookies.set("user-type", data.user.user_type);
  Cookies.set("u-id", data.user.id);
  if (data.user.field_of_work !== undefined) {
    Cookies.set("FOW", data.user.field_of_work);
  } else if (data.user.date_of_birth !== undefined) {
    Cookies.set("DOB", data.user.date_of_birth);
  }
  // finally, set the logged-in variable to true
  Cookies.set("logged-in", "true");
};

export const ClearCookies = () => {
  Cookies.remove("cookie-token");
  Cookies.remove("user-name");
  Cookies.remove("email");
  Cookies.remove("user-type");
  Cookies.remove("u-id");
  Cookies.remove("FOW");
  Cookies.remove("DOB");
  Cookies.remove("logged-in");
};
