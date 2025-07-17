
import { useNavigate } from "react-router-dom";

import AppBridgeReactProvider  from "@shopify/app-bridge-react";
import { useMemo } from "react";
import { getHost } from "../../utils/getHost";

export function AppBridgeProvider({ children }) {
  const navigate = useNavigate();

  const history = useMemo(
    () => ({
      replace: (path) => navigate(path, { replace: true }),
    }),
    [navigate]
  );

  const config = useMemo(() => {
    const host = getHost();
    return {
      host,
      apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
      forceRedirect: true,
    };
  }, []);

  return (
    <AppBridgeReactProvider config={config} history={history}>
      {children}
    </AppBridgeReactProvider>
  );
}
