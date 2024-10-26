import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssigmentInterface } from '@/interface';

interface AssignmentStatusCardProps {
  assignment: AssigmentInterface;
  onStatusChange: () => void;
  onEdit: () => void;  // Nuevo prop para el botón de editar
  className?: string;
}

export const DetailCard: React.FC<AssignmentStatusCardProps> = ({
  assignment,
  onStatusChange,
  onEdit,
  className = ""
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className={`w-full max-w-5xl mx-auto ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-xl font-bold">
          {assignment.name} {assignment.lastName}
        </CardTitle>
        <div className="flex space-x-3">
          <Button
            onClick={onEdit}
            variant="outline"
          >
            Asignar Vehiculo
          </Button>
          <Button
            onClick={onStatusChange}
            variant={assignment.status ? "destructive" : "default"}
          >
            {assignment.status ? "Rechazar" : ""}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Información Principal</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado de Reserva</p>
                  <p className="mt-1 font-medium">{assignment.statusReservation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Número de Personas</p>
                  <p className="mt-1 font-medium">{assignment.numberPeople}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Dirección</p>
                  <p className="mt-1 font-medium">{assignment.addres}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de Creación</p>
                  <p className="mt-1 font-medium">{formatDate(assignment.creationDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Detalles Adicionales</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Comentario</p>
                  <p className="mt-1 font-medium">{assignment.comment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Justificación</p>
                  <p className="mt-1 font-medium">{assignment.justify}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      assignment.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {assignment.status ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">ID Reserva</p>
                  <p className="mt-1 font-medium">{assignment.idLogReservation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};