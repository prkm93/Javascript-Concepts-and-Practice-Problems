export const fileExplorer = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "public",
      isFolder: true,
      items: [
        {
          name: "index.html",
          isFolder: false,
        },
        {
          name: "script.js",
          isFolder: false,
        },
      ],
    },
    {
      name: "public 1",
      isFolder: false,
    },
    {
      name: "src",
      isFolder: true,
      items: [
        {
          name: "App.js",
          isFolder: false,
        },
        {
          name: "index.js",
          isFolder: false,
        },
      ],
    },
  ],
};
