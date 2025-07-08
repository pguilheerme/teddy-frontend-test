import "./createCustomerModal.style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { lazy } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  CreateCustomerSchema,
  type CreateCustomerSchemaType,
} from "../../../schemas/customerSchema";
import { moneyMask } from "../../../utils/moneyMask";

const TextInput = lazy(() => import("designSystem/TextInput"));
const Button = lazy(() => import("designSystem/Button"));
const BaseModal = lazy(() => import("designSystem/BaseModal"));
const Loading = lazy(() => import("designSystem/Loading"));

export interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateCustomerSchemaType) => void;
}

export default function CreateCustomerModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCustomerModalProps) {
  const form = useForm<CreateCustomerSchemaType>({
    resolver: zodResolver(CreateCustomerSchema),
  });

  const onSubmit: SubmitHandler<CreateCustomerSchemaType> = (data) => {
    onCreate(data);
    form.reset();
    onClose();
  };

  return (
    <BaseModal
      title="Criar cliente:"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        form.reset();
      }}
    >
      <div className="create-customer-modal">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="create-customer-form"
        >
          <TextInput
            name="name"
            placeholder="Digite o nome:"
            register={form.register("name")}
            error={form.formState.errors.name?.message}
            fullWidth
          />
          <Controller
            name="salary"
            control={form.control}
            render={({ field }) => (
              <TextInput
                name="salary"
                placeholder="Digite o salário:"
                value={
                  field.value === undefined || field.value === 0
                    ? ""
                    : moneyMask(field.value.toString())
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const raw = e.target.value;
                  const numeric = parseFloat(
                    raw.replace("R$", "").replace(/\./g, "").replace(",", ".")
                  );
                  field.onChange(isNaN(numeric) ? undefined : numeric);
                }}
                error={form.formState.errors.salary?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="companyValuation"
            control={form.control}
            render={({ field }) => (
              <TextInput
                name="companyValuation"
                placeholder="Digite o valor da empresa:"
                value={
                  field.value === undefined || field.value === 0
                    ? ""
                    : moneyMask(field.value.toString())
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const raw = e.target.value;
                  const numeric = parseFloat(
                    raw.replace("R$", "").replace(/\./g, "").replace(",", ".")
                  );
                  field.onChange(isNaN(numeric) ? undefined : numeric);
                }}
                error={form.formState.errors.companyValuation?.message}
                fullWidth
              />
            )}
          />

          <Button
            id="create-customer-button"
            text={
              form.formState.isSubmitting ? (
                <Loading size={15} />
              ) : (
                "Criar cliente"
              )
            }
            fullWidth
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          />
        </form>
      </div>
    </BaseModal>
  );
}
