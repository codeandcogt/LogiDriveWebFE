import {
  CardForm,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/atom";
import { useFormVehicleParts } from "@/hooks";

export const FormVehicleParts = () => {
  const { formik, handleClose, isEdit , VEHICLE_PART_STATUSES, vehiclesData} = useFormVehicleParts();
  return (
    <CardForm
      title="Registro de Vehículo"
      description="Por favor, completa todos los campos del formulario."
      className="mt-10"
      handleSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitButtonText={isEdit ? "Edit Part" : "Guardar Part"}
      onClose={handleClose}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormInput
            label="Nombre"
            name="name"
            placeholder="Ingrese la marca del vehículo"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.name}
          />
        </div>
        <div className="space-y-2">
          <FormTextarea
            label="Descripcion"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.description}
          />
        </div>
        <div className="space-y-2">
          <FormSelect
            label="Estado de la parte"
            name="statusPart"
            placeholder="Seleccione el tipo de vehículo"
            value={formik.values.statusPart}
            options={VEHICLE_PART_STATUSES}
            onChange={formik.handleChange}
            helperText={formik.errors.statusPart}
          />
        </div>

        <div className="space-y-2">
        <FormSelect
            label="Estado de la parte"
            name="idVehicle"
            placeholder="Seleccione el tipo de vehículo"
            value={formik.values.idVehicle.toString()}
            options={vehiclesData || []}
            onChange={formik.handleChange}
            helperText={formik.errors.idVehicle}
          />
        </div>

      </div>
    </CardForm>
  );
};
