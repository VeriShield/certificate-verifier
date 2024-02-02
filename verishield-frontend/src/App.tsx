// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import { FC } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "./GraphQL";
import { Notices } from "./Notices";
import { Input } from "./Input";
import { Inspect } from "./Inspect";
import { Network } from "./Network";
import { Vouchers } from "./Vouchers";
import { Reports } from "./Reports";
import configFile from "./config.json";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Verify from "./Verify";
import Home from "./Main";
import Visit from "./page";
import { ConnectedAddressProvider } from "./ConnectedAddressContext";
import { Dashboard } from "./components/Dashboard";

const config: any = configFile;

const injected: any = injectedModule();
init({
  wallets: [injected],
  chains: Object.entries(config).map(([k, v]: [string, any], i) => ({
    id: k,
    token: v.token,
    label: v.label,
    rpcUrl: v.rpcUrl,
  })),
  appMetadata: {
    name: "Cartesi Rollups Test DApp",
    icon: "<svg><svg/>",
    description: "Demo app for Cartesi Rollups",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/visit" element={<Visit />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

const App: FC = () => {
  const [dappAddress, setDappAddress] = useState<string>(
    "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"
  );

  return (
    <div>
      {/* <Network />
      <GraphQLProvider>
        <div>
          Dapp Address:{" "}
          <input
            type="text"
            value={dappAddress}
            onChange={(e) => setDappAddress(e.target.value)}
          />
          <br />
          <br />
        </div>
        <h2>Input</h2>
        <Input dappAddress={dappAddress} />
        <h2>Reports</h2>
        <Reports />
        <h2>Notices</h2>
        <Notices />
        <h2>Vouchers</h2>
        <Vouchers dappAddress={dappAddress} />
      </GraphQLProvider> */}
      <ConnectedAddressProvider>
        <RouterProvider router={router} />
      </ConnectedAddressProvider>
    </div>
  );
};

export default App;
