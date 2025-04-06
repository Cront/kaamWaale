import Link from "next/link";
import Layout from "../components/layout";
import React from "react";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Look for Employees</h1>
      </div>
    </Layout>
  );
}
