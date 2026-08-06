module.exports = {
  options: {
    tsConfig: {
      fileName: './tsconfig.base.json',
    },
    doNotFollow: {
      path: 'node_modules',
    },
    exclude: {
      path: 'node_modules|dist|coverage|\\.turbo',
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
    },
  },
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: {
        circular: true,
      },
    },
  ],
};
