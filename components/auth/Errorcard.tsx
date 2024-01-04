import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Cardwrapper } from "@/components/auth";

export const ErrorCard = () => {
  return (
    <Cardwrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
      <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </Cardwrapper>
  );
};
