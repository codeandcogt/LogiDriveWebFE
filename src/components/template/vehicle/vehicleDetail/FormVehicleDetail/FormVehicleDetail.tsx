import { CardForm, FormInput, FormSelect } from "@/components/atom";
import { useFormVehicleDetail } from "@/hooks";

export const FormVehicleDetails = () => {
  const { formik, handleClose, VEHICLE_STATUS, VEHICLE_TYPES, isEdit } = useFormVehicleDetail();

  return (
    <CardForm
      title="Registro de Vehículo"
      description="Por favor, completa todos los campos del formulario."
      className="mt-10"
      handleSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitButtonText={ isEdit ? "Edit Área" :"Guardar Área"}
      onClose={handleClose}
      
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormInput
            label="Marca"
            name="brand"
            placeholder="Ingrese la marca del vehículo"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.brand}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Placa"
            name="plate"
            placeholder="Ingrese la placa del vehículo"
            value={formik.values.plate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.plate}
          />
        </div>
        <div className="space-y-2">
          <FormSelect
            label="Tipo de Vehículo"
            name="tyoe"
            options={VEHICLE_TYPES}
            value={formik.values.tyoe}
            onChange={formik.handleChange}
            helperText={formik.errors.tyoe}
            placeholder="Seleccione el tipo de vehículo"
          />
        </div>

        <div className="space-y-2">
        <FormInput
            label="Anio"
            name="year"
            type="number"
            placeholder="Ingrese el kilometraje"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.year}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Kilometraje"
            name="mileage"
            type="number"
            placeholder="Ingrese el kilometraje"
            value={formik.values.mileage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.mileage}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Capacidad"
            name="capacity"
            type="number"
            placeholder="Ingrese la capacidad de pasajeros"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.capacity}
          />
        </div>
        <div className="space-y-2">
          <FormSelect
            label="Estado del vehículo"
            name="statusVehicle"
            options={VEHICLE_STATUS}
            value={formik.values.statusVehicle}
            onChange={formik.handleChange}
            helperText={formik.errors.statusVehicle}
          />
        </div>
      </div>
    </CardForm>
  );
};
