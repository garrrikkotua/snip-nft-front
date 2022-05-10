import { useEthers } from "@usedapp/core";
import { networks_names, network_ids } from "../../types/networks";

export const NetworkPicker = () => {
  const { switchNetwork, chainId } = useEthers();

  const handleChange = async (newValue: string) => {
    if (newValue !== networks_names[network_ids.indexOf(chainId as number)]) {
      await switchNetwork(network_ids[networks_names.indexOf(newValue)]);
    }
  };

  return (
    <select
      className="select select-primary min-w-[50px]"
      onChange={async (e) => await handleChange(e.target.value)}
    >
      <option disabled selected>
        Networks
      </option>
      {networks_names.map((current_network_name, index) =>
        current_network_name ===
        networks_names[network_ids.indexOf(chainId as number)] ? (
          <option key={index} selected={true}>
            {current_network_name}
          </option>
        ) : (
          <option key={index}>{current_network_name}</option>
        )
      )}
    </select>
  );
};
