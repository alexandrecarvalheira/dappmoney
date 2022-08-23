import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

export function HeaderLogin() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />
        <ConnectButton />
      </HeaderContent>
    </HeaderContainer>
  );
}
