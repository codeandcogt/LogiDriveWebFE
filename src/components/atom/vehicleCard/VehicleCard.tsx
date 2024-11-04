import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Bus, Truck } from "lucide-react"
import { VehicleDetail } from "@/interface";

interface VehicleCardProps {
  data: VehicleDetail;
}

export default function VehicleCard({ data }: VehicleCardProps) {
  const getVehicleIcon = () => {
    switch (data.tyoe.toLowerCase()) {
      case 'Pick up':
        return <Truck className="h-12 w-12" />;
      case 'Bus':
        return <Bus className="h-12 w-12" />;
      default:
        return <Car className="h-12 w-12" />;
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{data.brand}</CardTitle>
            <p className="text-sm text-muted-foreground">{data.plate}</p>
          </div>
          <div className="text-muted-foreground">
            {getVehicleIcon()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Capacidad:</span>
            <span className="text-sm font-medium">{data.capacity} personas</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Kilometraje:</span>
            <span className="text-sm font-medium">{data.mileage} km</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Año:</span>
            <span className="text-sm font-medium">{data.year}</span>
          </div>
          <div className="pt-2">
            <Badge 
              variant="secondary" 
              className={`w-full justify-center ${getStatusColor(data.statusVehicle)}`}
            >
              {data.statusVehicle}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}