export default async function token(req, res) {
  const header = req.headers.cookie.split(";");
  const splittedHeader = header.map((e) => {
    return e.split("=");
  });

  let authToken = splittedHeader.filter((word) => word[0] === " authToken");

  if (authToken.length === 0) {
    authToken = splittedHeader.filter((word) => word[0] === "authToken");
  }

  res.status(200).json({ token: authToken[0][1] });
}
