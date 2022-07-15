import { useRouter } from "next/router";
import React from "react";
import BuildPizza from "./BuildPizza";
import ChoosePizza from "./ChoosePizza";

type Props = {};

const INTENT = {
  CHOOSE: "choose",
  BUILD: "build",
};

export default function ChooseOrBuild({}: Props) {
  const router = useRouter();

  const chooseIntent = router.query.choose !== undefined;
  const buildIntent = router.query.build !== undefined;

  const actions = [
    {
      label: "Build a Pizza",
      action: INTENT.BUILD,
      intent: buildIntent,
    },
    {
      label: "Choose a Pizza",
      action: INTENT.CHOOSE,
      intent: chooseIntent,
    },
  ];

  return (
    <div>
      <div className="tabs tabs-boxed mb-4">
        {actions.map((action) => (
          <button
            onClick={() => {
              router.replace(`/dashboard?${action.action}=`, undefined, {
                shallow: true,
              });
            }}
            key={action.action}
            className={`tab ${action.intent ? "tab-active" : ""}`}
          >
            {action.label}
          </button>
        ))}
      </div>
      {buildIntent && <BuildPizza />}
      {chooseIntent && <ChoosePizza />}
    </div>
  );
}
