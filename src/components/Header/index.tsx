import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  const { address, isConnecting, isConnected } = useAccount();

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />
        <ConnectButton />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton hidden={!isConnected}>
              Nova Transação
            </NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
