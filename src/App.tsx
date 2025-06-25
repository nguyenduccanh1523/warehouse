import { PropsWithChildren } from "react";
import { useTokenRefresher } from "./hooks/useTokenRefresher";

function App(props: PropsWithChildren) {
  useTokenRefresher();
  return (
    <>
    {props.children}
    </>
  );
}

export default App;
