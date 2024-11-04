import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon, FileTextIcon } from "lucide-react"

interface ReservationData {
  idLogReservation: number
  idCollaborator: number
  name: string
  lastName: string
  comment: string
  idTown: number
  numberPeople: number
  statusReservation: string
  justify: string
  addres: string
  status: boolean
  creationDate: string
}

export default function ReservationCard({ data }: { data: ReservationData }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{data.name} {data.lastName}</CardTitle>
            <CardDescription>ID: {data.idLogReservation}</CardDescription>
          </div>
          <Badge variant={data.statusReservation === 'active' ? 'default' : 'secondary'}>
            {data.statusReservation}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <span>{data.addres}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <span>{data.numberPeople} {data.numberPeople === 1 ? 'persona' : 'personas'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(data.creationDate)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
              <span className="truncate" title={data.comment}>{data.comment}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Justificación:</span> {data.justify}
        </p>
      </CardFooter>
    </Card>
  )
}