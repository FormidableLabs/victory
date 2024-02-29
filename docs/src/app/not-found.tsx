"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import StyledLayout from "@/layouts/styled-page";

import Page from "@/partials/page";
import NotFoundImage from "@/static/not-found.png";

const NotFound = () => {
  return (
    <StyledLayout>
      <Page>
        <h1>Uh oh.</h1>
        <p>Looks like that page does not exist. What a bummer.</p>
        <Link href="/" className="block my-12">
          Take me back to the good stuff.
        </Link>
        <Image alt="Not Found" src={NotFoundImage} />
      </Page>
    </StyledLayout>
  );
};

export default NotFound;
