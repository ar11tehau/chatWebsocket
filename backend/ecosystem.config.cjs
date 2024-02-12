module.exports = {
   apps: [
      {
         name: "chat",
         script: "app.js",
         watch: true,
         //ignore_watch: ['',],
         env: {
            PORT: 3800,
            "DATABASE_URL": "postgresql://arii:arii@localhost:5432/chatdb?schema=public",
         },
      },
   ],
};
