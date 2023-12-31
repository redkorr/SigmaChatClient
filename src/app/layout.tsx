"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { createSignalRContext } from "react-signalr";
import menu from "./shared/components/menu";
import { createContext, useEffect, useState } from "react";
import { UserModel } from "./models/user";
import UserLayer from "./userLayer";
import { UserContext } from "./shared/userContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang="en">
        <meta name="theme-color" content="#000000" />
        <head>
          <link
            rel="manifest"
            href="/manifest.json"
            crossOrigin="use-credentials"
          />
        </head>
        <UserLayer>{children}</UserLayer>
      </html>
    </UserProvider>
  );
}
