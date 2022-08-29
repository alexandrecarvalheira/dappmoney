import { HeaderContainer, HeaderContent, NewResourceButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/logo.svg";
import { NewResourceModal } from "../NewResourceModal";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function HeaderFactory() {
  const { isConnected } = useAccount();

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />
        <ConnectButton
          accountStatus="address"
          chainStatus="icon"
          showBalance={false}
        />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewResourceButton hidden={!isConnected}>
              Create new Resource
            </NewResourceButton>
          </Dialog.Trigger>
          <NewResourceModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
