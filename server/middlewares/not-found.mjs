const notFoundMiddleware = (req, res) => {
   return res.status(404).send({ err: "Route does not exist" });
}

export default notFoundMiddleware