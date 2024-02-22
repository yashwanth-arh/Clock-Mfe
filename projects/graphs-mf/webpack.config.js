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
    uniqueName: "graphsMf",
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
      name: "graphsMf",
      // filename: "remoteEntry.js",
      exposes: {
        "./Component": "./projects/graphs-mf/src/app/app.component.ts",
      },

      // For hosts (please adjust)
      // remotes: {
      //     "hostApp": "http://localhost:4200/remoteEntry.js",
      //     "authMf": "http://localhost:5200/remoteEntry.js",
      //     "medicalRecordsMf": "http://localhost:4200/remoteEntry.js",
      //     "patientManagementMf": "http://localhost:4200/remoteEntry.js",
      //     "scheduleCallsMf": "http://localhost:4200/remoteEntry.js",
      //     "vitalHistoryMf": "http://localhost:4200/remoteEntry.js",
      //     "dashboardsMf": "http://localhost:5300/remoteEntry.js",
      //     "supportTicketMf": "http://localhost:4200/remoteEntry.js",

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
