import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Platform WPU Course",
    description: "Dokumentasi API Platform WPU Course",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local Server",
    },
    {
      url: "https://wcp-backend.vercel.app/api/v1",
      description: "Dev Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        email: "joni2024@yopmail.com",
        password: "123412341",
      },
      RegisterRequest: {
        fullName: "joni joni",
        username: "joni2024",
        email: "joni2024@yopmail.com",
        password: "123412341",
        confirmPassword: "123412341",
      },
      UpdateProfileRequest: {
        fullName: "joni joni",
        username: "joni2024",
        email: "joni2024@yopmail.com",
        password: "123412341",
        confirmPassword: "123412341",
      },
      ProductCreateRequest: {
        name: "Kemeja",
        description: "Deskripsi kemeja",
        images: ["image.png", "image2.png"],
        price: 1500,
        categoryId: "<<ObjectID MongoDB>>",
      },
      CategoryCreateRequest: {
        name: "category",
      },
    },
  },
};

// const doc = {};

const outputFile = "./output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
// swaggerAutogen()(outputFile, endpointsFiles, doc);
