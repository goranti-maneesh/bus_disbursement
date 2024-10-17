import Cookies from "js-cookie";

export const isLoggedIn = (studentData) => {
  const JWTtoken = Cookies.get("Bus_disbursement_JWT_token");
  console.log(!(JWTtoken && studentData.name), JWTtoken, studentData.name);
  return !(JWTtoken && studentData.name);
};
