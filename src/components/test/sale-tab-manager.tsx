import React, { ReactNode, useState, useEffect } from "react";

interface TabProps {
  title: string;
  children: ReactNode;
  canContinue: boolean;
  onReturn?: () => void;
  onCancel?: () => void;
  onNext?: () => void;
}

const Tab: React.FC<TabProps> = ({
  children,
  canContinue,
  onReturn,
  onCancel,
  onNext,
}) => {
  return (
    <>
      {children}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex">
          {onReturn && (
            <div
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2 cursor-pointer"
              onClick={onReturn} // Llama a la función onReturn al hacer clic en Regresar
            >
              Regresar
            </div>
          )}
          {onCancel && (
            <div className="px-4 py-2 bg-red-500 text-white rounded cursor-not-allowed">
              Cancelar
            </div>
          )}
        </div>
        <button
          className={`px-4 py-2 ${
            canContinue ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"
          } rounded`}
          disabled={!canContinue}
          onClick={onNext}
        >
          Continuar
        </button>
      </div>
    </>
  );
};

interface SaleTabManagerProps {
  children: ReactNode;
}

const SaleTabManager: React.FC<SaleTabManagerProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [canContinue, setCanContinue] = useState<boolean>(false);
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  useEffect(() => {
    setCanContinue(tabs[activeTab].props.canContinue);
  }, [activeTab, tabs]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleCancelAndPayClick = () => {
    console.log("Cancelar y Pagar");
  };

  const handleNext = () => {
    setActiveTab((prevActiveTab) => prevActiveTab + 1);
  };

  const handleReturn = () => {
    setActiveTab((prevActiveTab) => prevActiveTab - 1); // Cambia a la pestaña anterior al hacer clic en Regresar
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4 font-semibold">
        <p>
          Paso {activeTab + 1} de {tabs.length}
        </p>
      </div>
      <div className="flex mb-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`mr-2 px-4 py-1 rounded border ${
              activeTab === index ? "bg-gray-200 font-semibold" : "bg-gray-100"
            } cursor-pointer`}
            onClick={() => handleTabClick(index)}
          >
            {tab.props.title}
          </div>
        ))}
      </div>
      <div className="mb-4">
        {React.cloneElement(tabs[activeTab], {
          onReturn: activeTab > 0 ? handleReturn : undefined, // Pasamos la función handleReturn como onReturn solo si no estamos en la primera pestaña
          onCancel: activeTab === 0 ? handleCancelAndPayClick : undefined,
          onNext: activeTab < tabs.length - 1 ? handleNext : undefined,
        })}
      </div>
    </div>
  );
};

export { SaleTabManager, Tab };
