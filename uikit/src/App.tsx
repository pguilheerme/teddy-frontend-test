import { useState } from "react";
import { BaseModal, Button } from "./components";
import TextInput from "./components/TextInput/TextInput";
import Header from "./components/Header/Header";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "var(--color-background)",
        width: "100%",
      }}
    >
      <Header />
      {/* <Sidebar /> */}
      <h1 style={{ color: "white" }}>Renderizando o app</h1>
      <TextInput name="Name" fullWidth placeholder="Digite o nome:" />
      <Button text="Criar cliente" fullWidth onClick={() => setIsOpen(true)} />
      <BaseModal
        isOpen={isOpen}
        title="Criar cliente"
        onClose={() => setIsOpen(false)}
      >
        <TextInput name="Nome" fullWidth placeholder="Digite o nome:" />
        <TextInput name="Nome" fullWidth placeholder="Digite o salário:" />
        <TextInput
          name="Nome"
          fullWidth
          placeholder="Digite o valor da empresa:"
        />
        <Button
          text="Criar cliente"
          fullWidth
          onClick={() => console.log("Criar cliente")}
        />
      </BaseModal>
    </div>
  );
}

export default App;
