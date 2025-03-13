import SettingsNavigation from "@/src/components/modules/Accounts/SettingsNavigation";
import React, { ReactNode } from "react";

const AccountsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-3">
        <SettingsNavigation />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default AccountsLayout;
