import { HeaderFactory } from "../../components/HeaderFactory/index";
import { PermissionHighLight, FactoryContainer, FactoryTable } from "./styles";
import {
  useAccount,
  useContractReads,
  useContractRead,
  useSigner,
  useContract,
} from "wagmi";
import FactoryABI from "../../Contract/FactoryABI.json";
import ResourceABI from "../../Contract/ResourceABI.json";
import { ethers, utils } from "ethers";
import { useEffect, useState } from "react";

interface Resource {
  Name: string;
  Id: string;
  resourceAddress: string;
  Role?: "admin" | "user";
}

export function Factory() {
  const { isConnected, address } = useAccount();
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchResources();
  }, [isConnected]);

  const fetchResources = async () => {
    if (isConnected) {
      const factoryProvider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${
          import.meta.env.VITE_ALCHEMY_ID
        }`
      );
      const signer = factoryProvider.getSigner(address);

      const factoryContract = new ethers.Contract(
        import.meta.env.VITE_FACTORY_ADDRESS,
        FactoryABI,
        signer
      );

      let resourceLength = await factoryContract.getCurrentResourceId();
      resourceLength = resourceLength.toNumber();

      const resourcearray = [];

      for (let i = 0; i < resourceLength; i++) {
        const resource = await factoryContract.getResourceStruct(i);
        const newResource = {
          Name: resource.Name,
          Id: resource.Id.toNumber(),
          resourceAddress: resource.resourceAddress,
          Role: resource.role,
        };

        const resourceContract = new ethers.Contract(
          resource.resourceAddress,
          ResourceABI,
          signer
        );

        const userCount = await resourceContract.getRoleMemberCount(
          "0x14823911f2da1b49f045a0929a60b8c1f2a7fc8c06c7284ca3e8ab4e193a08c8"
        );
        for (let i = 0; i < userCount; ++i) {
          const member = await resourceContract.getRoleMember(
            "0x14823911f2da1b49f045a0929a60b8c1f2a7fc8c06c7284ca3e8ab4e193a08c85",
            i
          );
          if (member === address) {
            newResource.Role = "user";
          }
        }
        const adminCount = await resourceContract.getRoleMemberCount(
          "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775"
        );
        for (let i = 0; i < adminCount; ++i) {
          const member = await resourceContract.getRoleMember(
            "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775",
            i
          );
          if (member === address) {
            newResource.Role = "admin";
          }
        }
        resourcearray.push(newResource);
      }
      setResources(resourcearray);
    }
  };

  return isConnected ? (
    <div>
      <HeaderFactory />
      <FactoryContainer>
        <FactoryTable>
          <tbody>
            {resources.map((resource) => {
              return (
                <tr key={resource.Id}>
                  <td>
                    <PermissionHighLight variant={resource.Role}>
                      {resource.Role}
                    </PermissionHighLight>
                  </td>
                  <td width="50%">{resource.Name}</td>
                  <td>{resource.resourceAddress}</td>
                  <td>{resource.Id}</td>
                </tr>
              );
            })}
          </tbody>
        </FactoryTable>
      </FactoryContainer>
    </div>
  ) : (
    <HeaderFactory />
  );
}
