import { useRouteError } from "react-router-dom";

type Error = {
  statusText: any;
  message: any;
};

export default function ErrorPage() {
  const error: Error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page">
      <h1 className={"text-white"}>Oops!</h1>
      <p className={"text-white"}>Sorry, an unexpected error has occurred.</p>
      <p className={"text-white"}>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
