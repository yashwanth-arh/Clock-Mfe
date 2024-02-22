const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "../../tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "supportTicketMf",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "supportTicketMf",
      // filename: "remoteEntry.js",
      exposes: {
        "./Component": "./projects/support-ticket-mf/src/app/app.component.ts",
      },

      // For hosts (please adjust)
      // remotes: {
      //     "hostApp": "http://localhost:4200/remoteEntry.js",
      //     "authMf": "http://localhost:5200/remoteEntry.js",
      //     "graphsMf": "http://localhost:5400/remoteEntry.js",
      //     "medicalRecordsMf": "http://localhost:5500/remoteEntry.js",
      //     "patientManagementMf": "http://localhost:5600/remoteEntry.js",
      //     "scheduleCallsMf": "http://localhost:5700/remoteEntry.js",
      //     "vitalHistoryMf": "http://localhost:4200/remoteEntry.js",
      //     "dashboardsMf": "http://localhost:5300/remoteEntry.js",

      // },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
