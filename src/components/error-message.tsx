import React, { useEffect, useState } from "react";

interface ErrorComponentProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorMessage,
  onClose,
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Establecer un temporizador para actualizar la cuenta regresiva cada segundo
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    // Limpiar el temporizador al desmontar el componente o cuando el mensaje cambie
    return () => {
      clearInterval(timer);
    };
  }, [errorMessage, onClose]);

  useEffect(() => {
    // Restaurar la cuenta regresiva cuando el mensaje cambie
    setCountdown(5);
  }, [errorMessage]);

  useEffect(() => {
    // Cerrar el mensaje cuando la cuenta regresiva llegue a cero
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  return (
    errorMessage && (
      <div className="p-2 border rounded-lg bg-red-600 border-red-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <div className="font-medium text-white mb-1">Atención</div>
              <div className="text-sm text-white">{errorMessage}</div>
            </div>
          </div>
          <div className="text-xs text-white">{countdown}s</div>
        </div>
      </div>
    )
  );
};

export default ErrorComponent;
