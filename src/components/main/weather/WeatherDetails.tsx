import { Card, CardBody, CardHeader } from "@nextui-org/react";
import type { ReactNode } from "react";
type WeatherDetailsProps = { icon: ReactNode; description: ReactNode };
const WeatherDetails = ({ icon, description }: WeatherDetailsProps) => {
  return (
    <Card className="bg-opacity-90">
      <CardHeader className="flex justify-center pb-0">{icon}</CardHeader>
      <CardBody className="items-center">{description}</CardBody>
    </Card>
  );
};

export default WeatherDetails;
