import { CardForm, FormInput, FormTextarea } from "@/components/atom";
import { useFormMunicipality } from "@/hooks/Location/Municipality";

export const FormMunicipality = () => {
  const { formik, isEdit, handleClick } = useFormMunicipality();

  return (
    <CardForm
      title={isEdit ? "Edición de Municipio" : "Creación de Municipio"}
      description="Por favor, completa todos los campos del formulario."
      handleSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitButtonText={isEdit ? "Editar Municipio" : "Guardar Municipio"}
      onClose={handleClick}
      className="mt-10"
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <FormInput
            label="Nombre del Municipio"
            name="name"
            placeholder="Ingrese el nombre del municipio"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.name}
          />
        </div>
        <div className="space-y-2">
          <FormTextarea
            label="Descripción del Municipio"
            name="description"
            placeholder="Ingrese la descripción del municipio"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.description}
          />
        </div>
      </div>
    </CardForm>
  );
};