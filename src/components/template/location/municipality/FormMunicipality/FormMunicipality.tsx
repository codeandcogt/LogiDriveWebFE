import { CardForm, FormInput, FormSelect } from "@/components/atom";
import { useFormMunicipality } from "@/hooks/Location/Municipality";

export const FormMunicipality = () => {
  const { formik, isEdit, handleClick,departmentsData } = useFormMunicipality();

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
          <FormSelect
            label="Nombre del Departamento"
            name="idDepartment"
            placeholder="Ingrese el nombre del municipio"
            value={formik.values.idDepartment.toString()}
            onChange={formik.handleChange}
            helperText={formik.errors.idDepartment} 
            options={ departmentsData||[]}          
          />
        </div>
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
      </div>
    </CardForm>
  );
};