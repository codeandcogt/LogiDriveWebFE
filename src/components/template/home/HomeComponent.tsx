import { useHome } from "@/hooks"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReservationCard from "@/components/atom/CardReservation/CardReservation"
import VehicleCard from "@/components/atom/vehicleCard/VehicleCard"

export const HomeComponent = () => {
    const { data, vehicle } = useHome()
    
    return (
        <div className="flex h-[calc(100vh-4rem)] gap-6 p-6">
            {/* Panel izquierdo - Vehículos */}
            <div className="flex-1">
                <Card className="h-full p-6">
                    <h2 className="text-2xl font-semibold mb-4">Flota de Vehículos</h2>
                    <ScrollArea className="h-[calc(100vh-10rem)]">
                        <div className="space-y-4 pr-4">
                            {vehicle?.map((vehicleItem) => (
                                <VehicleCard
                                    key={vehicleItem.idVehicle} 
                                    data={vehicleItem}
                                />
                            ))}
                            {!vehicle?.length && (
                                <Card className="p-4 text-center text-muted-foreground">
                                    No hay vehículos disponibles
                                </Card>
                            )}
                        </div>
                    </ScrollArea>
                </Card>
            </div>

            {/* Panel derecho - Reservaciones */}
            <div className="w-[600px]">
                <div className="sticky top-6">
                    <h2 className="text-2xl font-semibold mb-4">Reservaciones Activas</h2>
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                        <div className="space-y-4 pr-4">
                            {data?.map((reservation) => (
                                <ReservationCard
                                    key={reservation.idLogReservation} 
                                    data={reservation}
                                />
                            ))}
                            {!data?.length && (
                                <Card className="p-4 text-center text-muted-foreground">
                                    No hay reservaciones disponibles
                                </Card>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}