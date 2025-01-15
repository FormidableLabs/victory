import React from "react";
import { createContext, useContext, useState } from "react";
import Alert, { AlertProps } from "../_components/alert";

type AlertContextType = {
  addAlert: (args: Omit<AlertProps, "id">) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = (alertProps: Omit<AlertProps, "id">) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { ...alertProps, id }]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-4 z-50">
        {alerts.map(({ id, type, title, message, duration }) => (
          <Alert
            key={id}
            type={type}
            title={title}
            message={message}
            duration={duration}
            onClose={() => removeAlert(id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
