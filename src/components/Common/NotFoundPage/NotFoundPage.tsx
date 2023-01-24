import React from "react";

type Props = {};

export default function NotFoundPage({}: Props) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-color-white-secondary">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-[90%]">404</h1>
        <h1 className="text-[50%]">Sayfa bulunamadı.</h1>
      </div>
    </div>
  );
}
