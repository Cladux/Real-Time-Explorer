import { Card, CardBody, CardHeader } from "@nextui-org/react";
import type { ReactNode } from "react";
type WeatherDetailsProps = { icon: ReactNode; description: ReactNode };
const WeatherDetails = ({ icon, description }: WeatherDetailsProps) => {
  return (
    <Card>
      <CardBody className="items-center">{icon}{description}</CardBody>
    </Card>
  );
};

export default WeatherDetails;
