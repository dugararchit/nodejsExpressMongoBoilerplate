console.log(process.env);
module.exports = {
  env: process.env.NODE_ENV,
  mongoose: {
    url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  port: process.env.PORT,
};
