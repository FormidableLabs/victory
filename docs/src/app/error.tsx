"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import StyledLayout from "@/layouts/styled-page";

import Page from "@/partials/page";
import NotFoundImage from "@/static/not-found.png";

const ErrorPage = () => {
  return (
    <StyledLayout>
      <Page>
        <h1>Uh oh.</h1>
        <p>
          Something went wrong while serving this page. We're looking into it!
        </p>
        <Link href="/" className="block my-12">
          Take me back to the good stuff.
        </Link>
        <Image alt="Error" src={NotFoundImage} />
      </Page>
    </StyledLayout>
  );
};

export default ErrorPage;
