const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    authMf: "http://localhost:5200/remoteEntry.js",
    graphsMf: "http://localhost:5400/remoteEntry.js",
    medicalRecordsMf: "http://localhost:5500/remoteEntry.js",
    patientManagementMf: "http://localhost:5600/remoteEntry.js",
    scheduleCallsMf: "http://localhost:5700/remoteEntry.js",
    vitalHistoryMf: "http://localhost:5900/remoteEntry.js",
    dashboardsMf: "http://localhost:5300/remoteEntry.js",
    supportTicketMf: "http://localhost:5800/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
