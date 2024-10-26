import { CardForm, FormInput } from "@/components/atom";
import { useFormDepartament } from "@/hooks/Location/Departament";

export const FormDepartament = () => {
  const { formik, isEdit, handleClick } = useFormDepartament();

  return (
    <CardForm
      title={isEdit ? "Edición de Departamento" : "Creación de Departamento"}
      description="Por favor, completa todos los campos del formulario."
      handleSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitButtonText={isEdit ? "Editar Departamento" : "Guardar Departamento"}
      onClose={handleClick}
      className="mt-10"
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <FormInput
            label="Nombre del Departamento"
            name="name"
            placeholder="Ingrese el nombre del departamento"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.name}
          />
        </div>
      </div>
    </CardForm>
  );
};