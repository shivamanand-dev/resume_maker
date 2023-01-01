export default async function token(req, res) {
  //   console.log(req.headers.cookie.split("=")[1]);

  res.status(200).json({ token: req.headers.cookie.split("=")[1] });
}
