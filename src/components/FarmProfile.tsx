import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Crop, Calendar } from "lucide-react";

export const FarmProfile = () => {
  const [farmData, setFarmData] = useState({
    farmSize: "",
    location: "",
    crops: [],
    plantingDate: ""
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crop className="w-5 h-5" />
          Farm Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Farm size (acres)" />
          <Input placeholder="Location" />
        </div>
        <Button className="w-full">Save Profile</Button>
      </CardContent>
    </Card>
  );
};