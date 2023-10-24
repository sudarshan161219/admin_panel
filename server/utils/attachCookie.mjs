const attachCookie = ({ res, Access_Token }) => {
  const sevenDay = 7000 * 60 * 60 * 24;

  res.cookie("jwt", Access_Token, {
    httpOnly: true, //accessible only by web server
    // secure: process.env.NODE_ENV === "production", //https
    secure: true, //https
    sameSite: "None", //cross-site cookie
    expires: new Date(Date.now() + sevenDay),
  });
};

export default attachCookie
