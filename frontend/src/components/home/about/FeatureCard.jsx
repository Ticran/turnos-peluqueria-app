import React from "react";
import Badge from "@/components/ui/Badge";

export default function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <Badge icon={Icon} title={title} desc={desc} />
  );
}