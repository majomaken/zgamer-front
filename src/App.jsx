import { useState } from "react";
import "./App.css";
import { GamerButton } from "./ui/components/GamerButton";
import { GamerCard } from "./ui/components/GamerCard";
import { LoginForm } from "./auth/components/LoginForm";
import { RegisterForm } from "./auth/components/RegisterForm";

const authOptions = [
  { key: "login", label: "Iniciar Sesión" },
  { key: "register", label: "Crear Cuenta" },
];

function App() {
  const [activeView, setActiveView] = useState("login");

  let viewContent;

  if (activeView === "login") {
    viewContent = <LoginForm />;
  } else {
    viewContent = <RegisterForm />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f1147,#05060f)] px-4 py-12">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <GamerCard
          title="Zona Gamer"
          subtitle="Accede a la arena o crea tu clan personal"
        >
          <div className="mt-6 mb-6 flex items-center justify-center gap-2">
            {authOptions.map((option) => (
              <GamerButton
                key={option.key}
                variant={activeView === option.key ? "primary" : "secondary"}
                type="button"
                onClick={() => setActiveView(option.key)}
              >
                {option.label}
              </GamerButton>
            ))}
          </div>

          {viewContent}
        </GamerCard>
      </div>
    </main>
  );
}

export default App;
