import { OptimismKovan, Mumbai } from "@usedapp/core";

export const networks = [OptimismKovan, Mumbai];
export const network_ids = networks.map((net) => net.chainId);
export const networks_names = networks.map((net) => net.chainName);
export const DEFAULT_SELECTED_NETWORK = OptimismKovan;
