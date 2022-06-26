const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = 8080;

const swaggerOptions = {
    definition: {
    info: {
      title: "My Rest Api",
      description: "This is my first swagger api",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:8080"],
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.listen(PORT, () =>
  console.log(`App is Alive on: http://localhost:${PORT}/`)
);

app.get("/tshirt", (req, res) => {
  res.status(200).send({
    tshirt: "👕",
    size: "large",
  });
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "We need logo!" });
  }

  res.send({
    tshirt: `👕 with your ${logo} and ID of ${id}`,
  });
});
