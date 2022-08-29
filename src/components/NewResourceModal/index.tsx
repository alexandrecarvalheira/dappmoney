import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { Content, Overlay, CloseButton } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FactoryABI from "../../Contract/FactoryABI.json";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const newResourceFormSchema = z.object({
  name: z.string(),
});

type NewResourceFormInputs = z.infer<typeof newResourceFormSchema>;

export function NewResourceModal() {
  const { register, handleSubmit, reset } = useForm<NewResourceFormInputs>({
    resolver: zodResolver(newResourceFormSchema),
  });

  const { config } = usePrepareContractWrite({
    addressOrName: import.meta.env.VITE_FACTORY_ADDRESS,
    contractInterface: FactoryABI,
    functionName: "createNewResource",
    args: [""],
  });
  const { data, write, isError } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onSubmit = async (input: any) => {
    write?.({
      recklesslySetUnpreparedArgs: input.name,
    });
    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Resource</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            required
          />

          <button type="submit" disabled={!write || isLoading}>
            {isLoading ? "Creating..." : "Create New Resource"}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
