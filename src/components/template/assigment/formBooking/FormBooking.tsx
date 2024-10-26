import { CardForm, FormInput, FormSelect } from "@/components/atom";
import FormDate from "@/components/atom/Form/formDate/FormDate";
import { useFormBooking } from "@/hooks";

export const FormBookings = () => {
  const {formik, handleClose, Type_Trip, vehiclesData}= useFormBooking()
  return (
      <CardForm
        title="Registro de Reserva de Vehículo"
        description="Complete los detalles de la reserva del vehículo."
        className="mt-10"
        handleSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting}
        submitButtonText="Guardar Reserva"
        onClose={handleClose}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormInput
              label="Comentario"
              name="comment"
              placeholder="Ingrese el motivo o detalles de la reserva"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.errors.comment}
            />
          </div>
          <div className="space-y-2">
            <FormDate
              label="Fecha de Inicio"
              name="startDate"
              value={formik.values.startDate}
              onChange={(date) => formik.setFieldValue('startDate', date)}
              helperText={formik.errors.startDate} 
              type="date"
              placeholder="Seleccione la fecha de inicio"              
            />
          </div>
          <div className="space-y-2">
            <FormDate
              label="Fecha de Finalización"
              name="endDate"
              value={formik.values.endDate}
              onChange={(date) => formik.setFieldValue('endDate', date)}
              helperText={formik.errors.endDate} 
              type="date"
              placeholder="Seleccione la fecha de finalización"              
            />
          </div>
          <div className="space-y-2">
            <FormSelect
              label="Tipo de Viaje"
              name="tripType"
              placeholder="Seleccione el tipo de viaje"
              value={formik.values.tripType}
              options={Type_Trip}
              onChange={formik.handleChange}
              helperText={formik.errors.tripType}
            />
          </div>
  
          <div className="space-y-2">
            <FormSelect
              label="Vehículo"
              name="idVehicle"
              placeholder="Seleccione el vehículo"
              value={formik.values.idVehicle.toString()}
              options={vehiclesData || []}
              onChange={formik.handleChange}
              helperText={formik.errors.idVehicle}
            />
          </div>
  
        </div>
      </CardForm>
    );
}